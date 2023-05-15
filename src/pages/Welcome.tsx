import { NavLink } from 'react-router-dom';
import styles from './Welcome.module.scss';

export const Welcome = () => {
  return (
    <div className={styles.welc}>
      <NavLink to='/auth'>Auth</NavLink>
      <NavLink to='/graphiQL'>Graphi</NavLink>
    </div>
  );
};
