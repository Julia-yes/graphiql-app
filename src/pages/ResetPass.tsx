import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth, sendPasswordReset } from '../firebase/firebase';
import { InputAuth } from '../components/index';

import styles from './Auth.module.scss';

export const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/graphiQL');
    }
  }, [user, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Reset password</h2>
      </div>
      <div className='container'>
        <InputAuth type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.button} onClick={() => sendPasswordReset(email)}>
          Send reset email
        </button>
      </div>
    </div>
  );
};
