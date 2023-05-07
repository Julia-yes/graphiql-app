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
      <div>Welcome</div>
      {user ? (
        <>
          <NavLink to='/graphiQL'>Graphi</NavLink>
          <button style={{ display: 'block' }} onClick={logout}>
            logout
          </button>
        </>
      ) : (
        <>
          <NavLink to='/login'>Sign In</NavLink>
          <br />
          <NavLink to='/register'>Sign Up</NavLink>
        </>
      )}
    </div>
  );
};
