import { Image } from '../../components/types';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Unsplash image'}
        className={styles.image}
      />
    </div>
  );
};

export default ImageCard;
