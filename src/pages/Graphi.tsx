import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { Documentation } from '../components/Interface/Documentation/Documentation';
import { Settings } from '../components/Interface/Settings/Settings';
import { Request } from '../components/Interface/rrBlock/Request/Request';
import { Response } from '../components/Interface/rrBlock/Response/Response';
import { auth } from '../firebase/firebase';
import { DataProvider } from '../context/Context';
import styles from './Graphi.module.scss';

import { Paths } from '../enums/Paths';
import { Titles } from '../enums/Titles';

const Graphi = () => {
  document.title = Titles.GRAPH;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isDocShowed, setIsDocShowed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate(Paths.ROOT);
    }
  }, [user, navigate]);

  function showDoc() {
    setIsDocShowed(!isDocShowed);
  }

  return (
    <div className={styles.wrapper}>
      <Settings docHandler={() => showDoc()} />
      <DataProvider>
        <section className={styles.interface}>
          <Documentation isDocShowed={isDocShowed} />
          <div className={styles.rrBlock}>
            <Request />
            <Response />
          </div>
        </section>
      </DataProvider>
    </div>
  );
};

export default Graphi;
