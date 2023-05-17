import { useState } from 'react';
import { Documentation } from '../components/Interface/Documentation/Documentation';
import { Settings } from '../components/Interface/Settings/Settings';
import { Request } from '../components/Interface/rrBlock/Request/Request';
import { Response } from '../components/Interface/rrBlock/Response/Response';
import styles from './Graphi.module.scss';

export const Graphi = () => {
  const [isDocShowed, setIsDocShowed] = useState(false);

  function showDoc() {
    setIsDocShowed(!isDocShowed);
  }

  return (
    <div className={styles.wrapper}>
      <Settings docHandler={() => showDoc()} />
      <section className={styles.interface}>
        <Documentation isDocShowed={isDocShowed} />
        <div className={styles.rrBlock}>
          <Request />
          <Response />
        </div>
      </section>
    </div>
  );
};
