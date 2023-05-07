import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { auth, sendPasswordReset } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

export const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const toastError = (err: Error) => toast.error(err.message);
  const toastSuccess = () => toast('Message sent');

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/graphiQL');
    }
  }, [user, loading]);

  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      toastSuccess();
    } catch (err) {
      toastError(err as Error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Reset password</h2>
      </div>
      <form onSubmit={(e) => reset(e)}>
        <InputAuth type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.button}>Send reset email</button>
      </form>
      <ToastContainer />
    </div>
  );
};
