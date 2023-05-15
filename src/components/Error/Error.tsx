import styles from './Error.module.scss';

type IProps = {
  error: string;
};
export const ErrorBlock = ({ error }: IProps) => {
  return <div className={styles.error}> {error}</div>;
};
