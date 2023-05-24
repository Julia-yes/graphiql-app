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
import { useTranslation } from 'react-i18next';
import { Localization } from '../enums/localization';

const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toastError = (err: Error) => toast.error(err.message);
  const toastSuccess = () => toast(t(Localization.MESSAGE_SENT));

  document.title = t(Titles.RESET);

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
        <h2 className={styles.h2}>{t(Localization.RESET_PASS)}</h2>
      </div>
      <form onSubmit={(e) => reset(e)}>
        <InputAuth type={Inputs.EMAIL} value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.button}>{t(Localization.SEND_RESET)}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPass;
