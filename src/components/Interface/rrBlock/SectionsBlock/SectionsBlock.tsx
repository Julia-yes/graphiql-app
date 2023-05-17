import { useContext } from 'react';
import styles from './SectionsBlock.module.scss';
import { DataContext } from '../../../../context/Context';
import { EditorBlock } from '../../EditorBlock/EditorBlock';
import { Sections } from '../../../../enums/Sections';
import { Button } from '../../../Button/Button';
import { checkRows } from '../../../../utils/CheckRows';

export const SectionsBlock = () => {
  const { section, changeSection, sectionState, changeSectionState, variables, headers } =
    useContext(DataContext);

  const SetSection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    changeSection(e.currentTarget.innerHTML);
  };

  const ChangeSectionView = () => {
    changeSectionState(!sectionState);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.buttonsArea}>
        <div className={styles.buttons}>
          <button
            className={section === Sections.VARIABLES ? styles.button_active : styles.button}
            onClick={(e) => {
              SetSection(e);
            }}
          >
            {Sections.VARIABLES}
          </button>
          <button
            className={section !== Sections.VARIABLES ? styles.button_active : styles.button}
            onClick={(e) => {
              SetSection(e);
            }}
          >
            {Sections.HEADERS}
          </button>
        </div>
        <Button icon={sectionState ? 'expand_less' : 'expand_more'} callback={ChangeSectionView} />
      </div>
      {sectionState && (
        <div className={styles.editorWrapper}>
          <EditorBlock
            type={section === Sections.HEADERS ? Sections.HEADERS : Sections.VARIABLES}
            rows={section === Sections.VARIABLES ? checkRows(variables) : checkRows(headers)}
          />
        </div>
      )}
    </section>
  );
};
