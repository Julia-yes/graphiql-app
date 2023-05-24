import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase/firebase';

import styles from './Welcome.module.scss';

import { Titles } from '../enums/Titles';
import { Paths } from '../enums/Paths';
import { UINames } from '../enums/UINames';
import { useTranslation } from 'react-i18next';
import { Localization } from '../enums/localization';

const Welcome = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  document.title = t(Titles.WELCOME);

  return (
    <div className={styles.welc}>
      <h1 className={styles.h1}>{t(Localization.H1)}</h1>
      <p className={styles.mainDesc}>{t(Localization.APP_DESC)}</p>
      {user ? (
        <>
          <NavLink className={styles.linkBottom} to={Paths.GRAPH}>
            {t(Localization.GRAPH_APP)}
          </NavLink>
        </>
      ) : (
        <>
          <div className={styles.bottomBtns}>
            <NavLink className={styles.linkBottom} to={Paths.LOGIN}>
              {t(UINames.SIGN_IN)}
            </NavLink>
            <NavLink className={styles.linkBottom} to={Paths.REGISTER}>
              {t(UINames.SIGN_UP)}
            </NavLink>
          </div>
        </>
      )}
      <div className={styles.devs}>
        <div>
          <h3>{t(Localization.DEV1)}</h3>
          <p>{t(Localization.DEV1_DESC)}</p>
        </div>
        <div>
          <h3>{t(Localization.DEV2)}</h3>
          <p>{t(Localization.DEV2_DESC)}</p>
        </div>
        <div>
          <h3>{t(Localization.DEV3)}</h3>
          <p>{t(Localization.DEV3_DESC)}</p>
        </div>
      </div>
      <p>{t(Localization.SCHOOL_DESC)}</p>
    </div>
  );
};

export default Welcome;
