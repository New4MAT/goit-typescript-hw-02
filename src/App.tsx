import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import styles from './App.module.css';
import { Image, ApiResponse } from './components/types';

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const searchImages = async (
    searchQuery: string,
    pageNum: number = 1,
  ): Promise<ApiResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ApiResponse>(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            query: searchQuery,
            page: pageNum,
            per_page: 12,
            client_id: 'L4J6KsdtOZ3O9HFeqJUluzQz-Dxj9auJGDi_NEV7h8E',
          },
        },
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery);
    setPage(1);
    const data = await searchImages(searchQuery);
    if (data) {
      setImages(data.results);
      setTotalPages(data.total_pages);
    }
  };

  const handleLoadMore = async (): Promise<void> => {
    const nextPage = page + 1;
    const data = await searchImages(query, nextPage);
    if (data) {
      setImages(prevImages => [...prevImages, ...data.results]);
      setPage(nextPage);
    }
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {loading && <Loader />}

      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage.urls.regular}
          description={selectedImage.alt_description}
          author={selectedImage.user.name}
          likes={selectedImage.likes}
        />
      )}
    </div>
  );
}

export default App;
