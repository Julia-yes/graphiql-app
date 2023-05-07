import styles from './Footer.module.scss';
import rsLogo from '../../assets/icons/rs_school_js.svg';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <a href='https://rs.school/react/'>
          <img className={styles.rsLogo} src={rsLogo} alt='rs logo' />
        </a>
        <div>
          <div className={styles.credits}>
            <p>
              <b>2023</b>
            </p>
            <a href='https://github.com/julia-yes'>julia-yes</a>
            <a href='https://github.com/wave103x'>wave103x</a>
            <a href='https://github.com/nimboo1'>nimboo1</a>
          </div>
        </div>
      </div>
    </div>
  );
};
