import { Button } from '../../Button/Button';
import styles from './Settings.module.scss';

type SettingsProps = {
  docHandler: () => void;
};

export const Settings = ({ docHandler }: SettingsProps) => {
  return (
    <aside className={styles.settings}>
      <Button icon='description' />
      <Button icon='refresh' />
    </aside>
  );
};
