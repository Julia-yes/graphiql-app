import styles from './Settings.module.scss';

type SettingsProps = {
  docHandler: () => void;
};

export const Settings = ({ docHandler }: SettingsProps) => {
  return (
    <aside className={styles.settings}>
      <button className={styles.button_aside} onClick={() => docHandler()}>
        <span className='material-icons'>description</span>
      </button>
      <button className={styles.button_aside}>
        <span className='material-icons'>refresh</span>
      </button>
    </aside>
  );
};
