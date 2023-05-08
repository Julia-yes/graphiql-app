import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { auth, registerWithEmailAndPassword } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const toastError = (err: Error) => toast.error(err.message);
  document.title = 'Sign Up';

  useEffect(() => {
    if (user) {
      navigate('/graphiQL');
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
        <h2 className={styles.h2}>Sign Up</h2>
        <NavLink className={`${styles.headLink} ${styles.link}`} to='/login'>
          Sign In
        </NavLink>
      </div>
      <form onSubmit={(e) => register(e)}>
        <InputAuth type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputAuth type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className={styles.hint}>
          minimum 8 symbols, at least one letter, one digit, one special character
        </p>
        <button
          className={styles.button}
          onClick={() => registerWithEmailAndPassword(email, password)}
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
