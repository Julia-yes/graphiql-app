import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase/firebase';

import styles from './Welcome.module.scss';

import { Titles } from '../enums/Titles';
import { Paths } from '../enums/Paths';
import { UINames } from '../enums/UINames';

const Welcome = () => {
  const H1 = 'Welcome, GraphQL enjoyers';
  const APP_DESC =
    'Whether you want a simple GraphiQL IDE instance for your server, or a more advanced web or desktop GraphQL IDE experience for your framework or plugin, or you want to build an IDE extension or plugin, you&apos;ve come to the right place!';
  const GRAPH_APP = 'GraphQL App';
  const DEV1 = 'Developer 1';
  const DEV2 = 'Developer 2';
  const DEV3 = 'Developer 3';
  const DEV1_DESC = 'Really tough';
  const DEV2_DESC = 'Really robust';
  const DEV3_DESC = 'Really solid';
  const SCHOOL_DESC = 'RS-School-React is a really nice place to studying';

  document.title = Titles.WELCOM;
  const [user] = useAuthState(auth);

  return (
    <div className={styles.welc}>
      <h1 className={styles.h1}>{H1}</h1>
      <p className={styles.mainDesc}>{APP_DESC}</p>
      {user ? (
        <>
          <NavLink className={styles.linkBottom} to={Paths.GRAPH}>
            {GRAPH_APP}
          </NavLink>
        </>
      ) : (
        <>
          <div className={styles.bottomBtns}>
            <NavLink className={styles.linkBottom} to={Paths.LOGIN}>
              {UINames.SIGN_IN}
            </NavLink>
            <NavLink className={styles.linkBottom} to={Paths.REGISTER}>
              {UINames.SIGN_UP}
            </NavLink>
          </div>
        </>
      )}
      <div className={styles.devs}>
        <div>
          <h3>{DEV1}</h3>
          <p>{DEV1_DESC}</p>
        </div>
        <div>
          <h3>{DEV2}</h3>
          <p>{DEV2_DESC}</p>
        </div>
        <div>
          <h3>{DEV3}</h3>
          <p>{DEV3_DESC}</p>
        </div>
      </div>
      <p>{SCHOOL_DESC}</p>
    </div>
  );
};

export default Welcome;
