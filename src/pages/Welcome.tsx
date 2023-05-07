import { NavLink } from 'react-router-dom';

import { logout } from '../firebase/firebase';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  return (
    <div className={styles.welc}>
      <div>Welcome</div>
      <NavLink to='/login'>Sign In</NavLink>
      <div></div>
      <NavLink to='/graphiQL'>Graphi</NavLink>
      <button style={{ display: 'block' }} onClick={logout}>
        logout
      </button>
    </div>
  );
};
