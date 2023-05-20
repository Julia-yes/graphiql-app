import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { auth, sendPasswordReset } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

import { Titles } from '../enums/Titles';
import { Paths } from '../enums/Paths';
import { Inputs } from '../enums/Inputs';

const ResetPass = () => {
  const RESET_PASS = 'Reset password';
  const SEND_RESET = 'Send reset email';
  const MESSAGE_SENT = 'Message sent';

  document.title = Titles.RESET;
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const toastError = (err: Error) => toast.error(err.message);
  const toastSuccess = () => toast(MESSAGE_SENT);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate(Paths.GRAPH);
    }
  }, [user, loading, navigate]);

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
        <h2 className={styles.h2}>{RESET_PASS}</h2>
      </div>
      <form onSubmit={(e) => reset(e)}>
        <InputAuth type={Inputs.EMAIL} value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.button}>{SEND_RESET}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPass;
