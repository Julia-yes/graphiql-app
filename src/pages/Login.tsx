import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

import { Paths } from '../enums/Paths';
import { Titles } from '../enums/Titles';
import { Inputs } from '../enums/Inputs';
import { UINames } from '../enums/UINames';

export const Login = () => {
  document.title = Titles.LOGIN;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const toastError = (err: Error) => toast.error(err.message);

  useEffect(() => {
    if (user) {
      navigate(Paths.GRAPH);
    }
  }, [user, loading, navigate]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (err) {
      toastError(err as Error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Sign in</h2>
        <NavLink className={`${styles.headLink} ${styles.link}`} to={Paths.REGISTER}>
          {UINames.SIGN_UP}
        </NavLink>
      </div>
      <form onSubmit={(e) => login(e)}>
        <InputAuth type={Inputs.EMAIL} value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputAuth
          type={Inputs.PASS}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type={Inputs.SUBMIT}>
          Login
        </button>
      </form>
      <NavLink className={`${styles.linkReset} ${styles.link}`} to={Paths.RESET}>
        {UINames.FORGOT_PASS}
      </NavLink>
      <ToastContainer />
    </div>
  );
};
