import styles from './Button.module.scss';

type IProps = {
  icon: string;
  callback?: () => void;
};

export const Button = ({ icon, callback }: IProps) => {
  return (
    <button className={styles.button} onClick={callback}>
      <span className='material-icons'>{icon}</span>
    </button>
  );
};
