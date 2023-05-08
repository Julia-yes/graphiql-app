import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase/firebase';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);
  document.title = 'Welcome';

  return (
    <div className={styles.welc}>
      <h1 className={styles.h1}>Welcome, GraphQL enjoyers</h1>
      <p className={styles.mainDesc}>
        Whether you want a simple GraphiQL IDE instance for your server, or a more advanced web or
        desktop GraphQL IDE experience for your framework or plugin, or you want to build an IDE
        extension or plugin, you&apos;ve come to the right place!
      </p>
      <div className={styles.devs}>
        <div>
          <h3>Developer 1</h3>
          <p>Really strong</p>
        </div>
        <div>
          <h3>Developer 2</h3>
          <p>Really smart</p>
        </div>
        <div>
          <h3>Developer 3</h3>
          <p>Really tricky</p>
        </div>
      </div>
      <p>RS-School-React is a really nice place to be</p>
      {user ? (
        <>
          <NavLink className={styles.linkBottom} to='/graphiQL'>
            GraphQL App
          </NavLink>
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
