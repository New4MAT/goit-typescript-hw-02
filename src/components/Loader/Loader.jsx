import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ClipLoader color="#3f51b5" size={50} />
    </div>
  );
};

export default Loader;
