import { NavLink } from 'react-router-dom';
import styles from './Welcome.module.scss';

export const Welcome = () => {
  return (
    <div className={styles.welc}>
      <div>Welcome</div>
      <NavLink to='/auth'>Auth</NavLink>
      <div></div>
      <NavLink to='/graphiQL'>Graphi</NavLink>
    </div>
  );
};
