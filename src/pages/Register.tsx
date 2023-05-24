import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { auth, registerWithEmailAndPassword } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

import { Titles } from '../enums/Titles';
import { Paths } from '../enums/Paths';
import { UINames } from '../enums/UINames';
import { Inputs } from '../enums/Inputs';
import { useTranslation } from 'react-i18next';
import { Localization } from '../enums/localization';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toastError = (err: Error) => toast.error(err.message);

  document.title = t(Titles.REGISTER);

  useEffect(() => {
    if (user) {
      navigate(Paths.GRAPH);
    }
  }, [user, navigate]);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerWithEmailAndPassword(email, password);
    } catch (err) {
      toastError(err as Error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>{t(UINames.SIGN_UP)}</h2>
        <NavLink className={`${styles.headLink} ${styles.link}`} to={Paths.LOGIN}>
          {t(UINames.SIGN_IN)}
        </NavLink>
      </div>
      <form onSubmit={(e) => register(e)}>
        <InputAuth type={Inputs.EMAIL} value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputAuth
          type={Inputs.PASS}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.hint}>{t(Localization.PASS_HINT)}</p>
        <button
          className={styles.button}
          onClick={() => registerWithEmailAndPassword(email, password)}
        >
          {t(UINames.REGISTER)}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
