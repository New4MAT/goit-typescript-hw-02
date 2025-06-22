import { useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import styles from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const searchImages = async (searchQuery, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
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
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    const data = await searchImages(searchQuery);
    if (data) {
      setImages(data.results);
      setTotalPages(data.total_pages);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const data = await searchImages(query, nextPage);
    if (data) {
      setImages([...images, ...data.results]);
      setPage(nextPage);
    }
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
