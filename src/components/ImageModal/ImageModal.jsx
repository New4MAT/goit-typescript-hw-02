import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  description,
  author,
  likes,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.content}>
        <img src={imageUrl} alt={description} className={styles.image} />
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
