import ReactLoading, { LoadingType } from 'react-loading';
import styles from './Loading.module.scss';

type IProps = {
  type: LoadingType;
  color: string;
};

export const Loading = ({ type, color }: IProps) => (
  <div className={styles.loading}>
    <ReactLoading type={type} color={color} height={50} width={50} />
  </div>
);
