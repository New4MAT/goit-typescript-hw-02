import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  description?: string;
  author: string;
  likes: number;
}

const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  description,
  author,
  likes,
}: ImageModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.content}>
        <img
          src={imageUrl}
          alt={description || 'Image'}
          className={styles.image}
        />
        <div className={styles.info}>
          <p>Author: {author}</p>
          <p>Likes: {likes}</p>
          {description && <p>Description: {description}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
