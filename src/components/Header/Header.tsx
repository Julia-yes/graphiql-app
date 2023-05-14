import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { auth, logout } from '../../firebase/firebase';

import styles from './Header.module.scss';

import { Paths } from '../../enums/Paths';
import { UINames } from '../../enums/UINames';
import { Inputs } from '../../enums/Inputs';

export const Header = () => {
  const TO_MAIN = 'Go to Main Page';
  const RLX = 'rlx';
  const RU = 'RU';
  const EN = 'EN';

  const [user] = useAuthState(auth);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink className={styles.logoLink} to={Paths.ROOT}>
          <h2>{RLX}</h2>
        </NavLink>
        <div className={styles.menu}>
          {user ? (
            <>
              <NavLink className={styles.link} to={Paths.GRAPH}>
                {TO_MAIN}
              </NavLink>
              <button className={styles.logout} onClick={logout}>
                {UINames.LOGUOT}
              </button>
            </>
          ) : (
            <>
              <NavLink className={styles.link} to={Paths.LOGIN}>
                {UINames.SIGN_IN}
              </NavLink>
              <NavLink className={styles.link} to={Paths.REGISTER}>
                {UINames.SIGN_UP}
              </NavLink>
            </>
          )}

          <div className={styles.langToggle}>
            {EN}
            <label className={styles.switch}>
              <input type={Inputs.CHECKBOX} />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            {RU}
          </div>
        </div>
      </div>
    </header>
  );
};
