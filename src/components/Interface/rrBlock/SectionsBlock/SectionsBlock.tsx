import { useContext } from 'react';
import styles from './SectionsBlock.module.scss';
import { DataContext } from '../../../../context/Context';
import { EditorBlock } from '../../EditorBlock/EditorBlock';
import { Sections } from '../../../../enums/Sections';
import { Button } from '../../../Button/Button';
import { checkRows } from '../../../../utils/CheckRows';
import { HeadersBlock } from '../../HeadersBlock/HeadersBlock';
import { useTranslation } from 'react-i18next';

export const SectionsBlock = () => {
  const { section, changeSection, sectionState, changeSectionState, variables } =
    useContext(DataContext);

  const SetSection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.innerHTML === 'Variables' || e.currentTarget.innerHTML === 'Переменные') {
      changeSection(Sections.VARIABLES);
    } else {
      changeSection(Sections.HEADERS);
    }
  };

  const ChangeSectionView = () => {
    changeSectionState(!sectionState);
  };

  const { t } = useTranslation();

  return (
    <section className={styles.wrapper}>
      <div className={styles.buttonsArea}>
        <div className={styles.buttons}>
          <button
            className={section === Sections.VARIABLES ? styles.button_active : styles.button}
            onClick={(e) => SetSection(e)}
          >
            {t(Sections.VARIABLES)}
          </button>
          <button
            className={section !== Sections.VARIABLES ? styles.button_active : styles.button}
            onClick={(e) => SetSection(e)}
          >
            {t(Sections.HEADERS)}
          </button>
        </div>
        <Button icon={sectionState ? 'expand_less' : 'expand_more'} callback={ChangeSectionView} />
      </div>
      {sectionState && (
        <div className={styles.editorWrapper}>
          {section === Sections.VARIABLES ? (
            <EditorBlock type={Sections.VARIABLES} rows={checkRows(variables)} />
          ) : (
            <HeadersBlock />
          )}
        </div>
      )}
    </section>
  );
};
