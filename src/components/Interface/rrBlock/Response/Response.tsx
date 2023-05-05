import { useContext } from 'react';
import stylesCommon from '../RRBlock.module.scss';
import { DataContext } from '../../../../context/Context';

export const Response = () => {
  const { data, error } = useContext(DataContext);

  return (
    <section className={stylesCommon.wrapper}>
      <div className={stylesCommon.titleArea}>
        <h3 className={stylesCommon.title}>Response</h3>
      </div>
      <div>{error ? error : JSON.stringify(data)}</div>
    </section>
  );
};
