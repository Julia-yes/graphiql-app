import { FinalViewOFRequest } from '../../../../../utils/ParseData';
import styles from './ResponseBlock.module.scss';

type IProps = {
  data: object;
};

export const ResponseBlock = ({ data }: IProps) => {
  const response = FinalViewOFRequest(JSON.stringify(data));
  return (
    <textarea
      className={styles.textarea}
      value={response}
      onInput={(e) => console.log(e)}
    ></textarea>
  );
};
