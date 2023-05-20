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

const Register = () => {
  const PASS_HINT = 'minimum 8 symbols, at least one letter, one digit, one special character';

  document.title = Titles.REGISTER;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const toastError = (err: Error) => toast.error(err.message);

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
        <h2 className={styles.h2}>{UINames.SIGN_UP}</h2>
        <NavLink className={`${styles.headLink} ${styles.link}`} to={Paths.LOGIN}>
          {UINames.SIGN_IN}
        </NavLink>
      </div>
      <form onSubmit={(e) => register(e)}>
        <InputAuth type={Inputs.EMAIL} value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputAuth
          type={Inputs.PASS}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.hint}>{PASS_HINT}</p>
        <button
          className={styles.button}
          onClick={() => registerWithEmailAndPassword(email, password)}
        >
          {UINames.REGISTER}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;