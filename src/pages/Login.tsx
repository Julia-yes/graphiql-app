import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const toastError = () => toast.error('login error');

  useEffect(() => {
    if (user) {
      navigate('/graphiQL');
    }
  }, [user, loading, navigate]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (err) {
      toastError();
    }
  };

  return (
    <div className={styles.container}>
      {loading && <h2>loading...</h2>}
      <div className={styles.header}>
        <h2 className={styles.h2}>Sign in</h2>
        <NavLink className={`${styles.headLink} ${styles.link}`} to='/register'>
          Sign Up
        </NavLink>
      </div>
      <form onSubmit={(e) => login(e)}>
        <InputAuth type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputAuth type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.button} type={'submit'}>
          Login
        </button>
      </form>
      <NavLink className={`${styles.linkReset} ${styles.link}`} to='/reset'>
        Forgot password
      </NavLink>
      <ToastContainer />
    </div>
  );
};
