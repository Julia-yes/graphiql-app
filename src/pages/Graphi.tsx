import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { Documentation } from '../components/Interface/Documentation/Documentation';
import { Settings } from '../components/Interface/Settings/Settings';
import { Request } from '../components/Interface/rrBlock/Request/Request';
import { Response } from '../components/Interface/rrBlock/Response/Response';
import { auth } from '../firebase/firebase';

import styles from './Graphi.module.scss';

import { Paths } from '../enums/Paths';
import { Titles } from '../enums/Titles';

export const Graphi = () => {
  document.title = Titles.GRAPH;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Paths.ROOT);
    }
  }, [user, navigate]);

  return (
    <div className={styles.wrapper}>
      <Settings />
      <section className={styles.interface}>
        <Documentation />
        <div className={styles.rrBlock}>
          <Request />
          <Response />
        </div>
      </section>
    </div>
  );
};
