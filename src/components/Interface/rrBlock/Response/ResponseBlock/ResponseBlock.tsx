import { FinalViewOFResponse } from '../../../../../utils/ParseData';
import styles from './ResponseBlock.module.scss';

type IProps = {
  data: object;
};

export const ResponseBlock = ({ data }: IProps) => {
  const response = FinalViewOFResponse(JSON.stringify(data));
  return (
    <textarea className={styles.textarea} value={response} onInput={(e) => alert(e)}></textarea>
  );
};
