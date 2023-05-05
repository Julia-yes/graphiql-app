import React from 'react';
import styles from './Editor.module.scss';

export const Editor = React.forwardRef<HTMLTextAreaElement>((props, ref) => (
  <form className={styles.wrapper}>
    <textarea className={styles.textarea} ref={ref}></textarea>
  </form>
));
