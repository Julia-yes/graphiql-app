import { useContext } from 'react';
import stylesCommon from '../RRBlock.module.scss';
import { DataContext } from '../../../../context/Context';
import { Loading } from '../../../Loading/Loading';
import { ErrorBlock } from '../../../Error/Error';
import { ResponseBlock } from './ResponseBlock/ResponseBlock';

export const Response = () => {
  const { data, error, loading } = useContext(DataContext);

  return (
    <section className={stylesCommon.wrapper}>
      <div className={stylesCommon.titleArea}>
        <h3 className={stylesCommon.title}>Response</h3>
      </div>
      <div className={stylesCommon.main}>
        {loading ? (
          <Loading type={'spinningBubbles'} color={'#1b2240'} />
        ) : error ? (
          <ErrorBlock error={error} />
        ) : data !== null ? (
          <ResponseBlock data={data} />
        ) : (
          <div>Make your request</div>
        )}
      </div>
    </section>
  );
};
