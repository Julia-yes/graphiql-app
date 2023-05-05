import { Documentation } from '../components/Interface/Documentation/Documentation';
import { Settings } from '../components/Interface/Settings/Settings';
import { Request } from '../components/Interface/rrBlock/Request/Request';
import { Response } from '../components/Interface/rrBlock/Response/Response';
import { DataProvider } from '../context/Context';
import styles from './Graphi.module.scss';

export const Graphi = () => {
  return (
    <div className={styles.wrapper}>
      <Settings />
      <DataProvider>
        <section className={styles.interface}>
          <Documentation />
          <div className={styles.rrBlock}>
            <Request />
            <Response />
          </div>
        </section>
      </DataProvider>
    </div>
  );
};
