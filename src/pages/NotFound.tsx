import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.scss';
import { Localization } from '../enums/Localization';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <h1 className={styles.notFound}>
      404 <br></br>
      {t(Localization.NOT_FOUND)}
    </h1>
  );
};

export default NotFound;
