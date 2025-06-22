import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
