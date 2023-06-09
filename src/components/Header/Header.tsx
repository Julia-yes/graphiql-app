import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth, logout } from '../../firebase/firebase';
import styles from './Header.module.scss';
import { Paths } from '../../enums/Paths';
import { UINames } from '../../enums/UINames';
import { Inputs } from '../../enums/Inputs';
import { Localization } from '../../enums/Localization';
import { Languages } from '../../enums/Languages';

export const Header = () => {
  const RLX = 'rlx';
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);

  const handleChangeLng = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lng = 'en';
    if (e.target.checked) {
      lng = 'ru';
    }
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink className={styles.logoLink} to={Paths.ROOT}>
          <h2>{RLX}</h2>
        </NavLink>
        <div className={styles.menu}>
          {user ? (
            <div className={styles.buttons}>
              <NavLink className={styles.link} to={Paths.GRAPH}>
                {t(Localization.TO_MAIN)}
              </NavLink>
              <button className={styles.logout} onClick={logout}>
                {t(UINames.LOGUOT)}
              </button>
            </div>
          ) : (
            <div className={styles.buttons}>
              <NavLink className={styles.link} to={Paths.LOGIN}>
                {t(UINames.SIGN_IN)}
              </NavLink>
              <NavLink className={styles.link} to={Paths.REGISTER}>
                {t(UINames.SIGN_UP)}
              </NavLink>
            </div>
          )}
          <div className={styles.langToggle}>
            {Languages.EN}
            <label className={styles.switch}>
              <input
                checked={localStorage.getItem('lng') === 'ru'}
                type={Inputs.CHECKBOX}
                onChange={(e) => handleChangeLng(e)}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            {Languages.RU}
          </div>
        </div>
      </div>
    </header>
  );
};
