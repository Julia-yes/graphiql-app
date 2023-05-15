import styles from './Settings.module.scss';

export const Settings = () => {
  return (
    <aside className={styles.settings}>
      <button className={styles.button_aside}>
        <span className='material-icons'>description</span>
      </button>
      <button className={styles.button_aside}>
        <span className='material-icons'>refresh</span>
      </button>
    </aside>
  );
};
