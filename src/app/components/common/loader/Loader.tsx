import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
