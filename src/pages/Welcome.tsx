import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { auth, logout } from '../firebase/firebase';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={styles.welc}>
      <h1 className={styles.h1}>Welcome, GraphQL enjoyers</h1>
      <p>This site will help you to expolre this tool</p>
      <div className={styles.devs}>
        <div>
          <h3>Developer 1</h3>
          <p>Realy strong</p>
        </div>
        <div>
          <h3>Developer 2</h3>
          <p>Realy smart</p>
        </div>
        <div>
          <h3>Developer 3</h3>
          <p>Realy tricky</p>
        </div>
      </div>
      <p>RS-School-React is a really nice place to be</p>
      {user ? (
        <>
          <NavLink className={styles.linkBottom} to='/graphiQL'>
            GraphQL App
          </NavLink>
          {/* <button style={{ display: 'block' }} onClick={logout}>
            logout
          </button> */}
        </>
      ) : (
        <>
          <div className={styles.bottomBtns}>
            <NavLink className={styles.linkBottom} to='/login'>
              Sign In
            </NavLink>
            <NavLink className={styles.linkBottom} to='/register'>
              Sign Up
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};
