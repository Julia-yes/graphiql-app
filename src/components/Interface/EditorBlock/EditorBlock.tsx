import styles from './EditorBlock.module.scss';
import { Sections } from '../../../enums/Sections';
import { Editor } from '../Editor/Editor';

type IProps = {
  type: Sections;
  rows: number;
};

export const EditorBlock = ({ type, rows }: IProps) => {
  const BuildRows = () => {
    let arr = [];
    for (let i = 1; i <= rows; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.editorArea}>
        <div className={styles.rows}>
          {BuildRows().map((item) => (
            <div key={item} className={styles.row}>
              {item}
            </div>
          ))}
        </div>
        <Editor type={type} />
      </div>
    </div>
  );
};
