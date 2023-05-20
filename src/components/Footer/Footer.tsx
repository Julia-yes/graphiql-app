import styles from './Footer.module.scss';

import { Links } from '../../enums/Links';

import rsLogo from '../../assets/icons/rs_school_js.svg';

export const Footer = () => {
  const DEV1 = 'julia-yes';
  const DEV2 = 'wave103x';
  const DEV3 = 'nimboo1';
  const YEAR = '2023';
  const RSLOGO_ALT = 'rs logo';

  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <a href={Links.COURSE}>
          <img className={styles.rsLogo} src={rsLogo} alt={RSLOGO_ALT} />
        </a>
        <div className={styles.credits}>
          <a href={Links.GH_JULIA}>{DEV1}</a>
          <a href={Links.GH_WAVE}>{DEV2}</a>
          <a href={Links.GH_NIMBOO}>{DEV3}</a>
        </div>
        <p>
          <b>{YEAR}</b>
        </p>
      </div>
    </div>
  );
};