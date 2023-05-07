import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { auth, logout } from '../../firebase/firebase';

import styles from './Header.module.scss';

export const Header = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink className={styles.logoLink} to='/'>
          <h2>rlx</h2>
        </NavLink>
        <div className={styles.menu}>
          {user ? (
            <>
              <NavLink className={styles.link} to='/graphiQL'>
                GraphQL App
              </NavLink>
              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className={styles.link} to='/login'>
                Sign In
              </NavLink>
              <NavLink className={styles.link} to='/register'>
                Sign Up
              </NavLink>
            </>
          )}

          <div className={styles.langToggle}>
            EN
            <label className={styles.switch}>
              <input type='checkbox' />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            RU
          </div>
        </div>
      </div>
    </header>
  );
};
