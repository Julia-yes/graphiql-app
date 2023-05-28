import { useContext } from 'react';
import stylesCommon from '../RRBlock.module.scss';
import { DataContext } from '../../../../context/Context';
import { Loading } from '../../../Loading/Loading';
import { ErrorBlock } from '../../../Error/Error';
import { ResponseBlock } from './ResponseBlock/ResponseBlock';
import { useTranslation } from 'react-i18next';
import { Localization } from '../../../../enums/Localization';

export const Response = () => {
  const { data, error, loading, variablesError } = useContext(DataContext);
  const { t } = useTranslation();

  return (
    <section className={stylesCommon.wrapper}>
      <div className={stylesCommon.titleArea}>
        <h3 className={stylesCommon.title}>{t(Localization.RESPONSE)}</h3>
      </div>
      <div className={stylesCommon.main}>
        {loading ? (
          <Loading type={'spinningBubbles'} color={'#1b2240'} />
        ) : error ? (
          <ErrorBlock error={t(error)} />
        ) : variablesError ? (
          <ErrorBlock error={t(variablesError)} />
        ) : data !== null ? (
          <ResponseBlock data={data} />
        ) : (
          <div className={stylesCommon.defaultText}>{t(Localization.RESPONSE_TEXT)}</div>
        )}
      </div>
    </section>
  );
};
