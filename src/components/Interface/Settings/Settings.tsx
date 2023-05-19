import { Button } from '../../Button/Button';
import styles from './Settings.module.scss';

export const Settings = () => {
  return (
    <aside className={styles.settings}>
      <Button icon='description' />
      <Button icon='refresh' />
    </aside>
  );
};
