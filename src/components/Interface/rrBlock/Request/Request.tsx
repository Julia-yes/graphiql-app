import React, { useContext, useState } from 'react';
import { Editor } from '../../Editor/Editor';
import stylesCommon from '../RRBlock.module.scss';
import styles from './Request.module.scss';
import { DataContext } from '../../../../context/Context';
import { LoadSource } from '../../../../context/LoadSource';

export const Request = () => {
  const { setNewData, setNewError } = useContext(DataContext);
  const [queryTitle, setQueryTitle] = useState('');
  const [data, setData] = useState('null');

  const input = React.useRef<HTMLTextAreaElement>(null);
  const MakeRequest = async () => {
    if (input.current) {
      const data = await LoadSource(input?.current.value);
      console.log('222', typeof input?.current.value);
      setNewData(data);
      ParseData(input?.current.value);
    }
  };

  const ParseData = (data: string) => {
    const res: string[] = [];
    const wordsArray = JSON.stringify(data)
      .match(/[a-zA-Z}${]+/g)
      ?.forEach((item) => {
        if (item !== 'n') {
          res.push(item);
        }
      });

    console.log(res);
    ChecksStaples(data);
    const error = ChecksStaples(data);
    if (!error) {
      setNewError('problem with staples');
    }
    console.log('!', error);
    // setData(res)
  };

  const ChecksStaples = (data: string) => {
    const staples = JSON.stringify(data).match(/[{}()]+/g);
    const solo: string[] = [];
    if (staples) {
      if (staples[0] === ')' || staples[0] === '}' || staples.length % 2 !== 0) {
        return false;
      } else {
        solo.push(staples[0]);

        const open = (param: string) => {
          if (!solo.length) {
            solo.push(param);
          } else {
            if (param === '(') {
              if (solo.at(-1) !== ')') {
                solo.push(param);
              } else {
                return false;
              }
            } else {
              if (solo.at(-1) === '{') {
                solo.push(param);
              } else {
                return false;
              }
            }
          }
        };

        const close = (param: string) => {
          if (!solo.length) {
            return false;
          } else {
            if (param === ')') {
              if (solo.at(-1) === '(') {
                solo.pop();
              } else {
                return false;
              }
            } else {
              if (solo.at(-1) === '{') {
                solo.pop();
              } else {
                return false;
              }
            }
          }
        };

        for (let i = 1; i < staples?.length; i++) {
          if (staples[i] == '(') {
            open(staples[i]);
          } else if (staples[i] == ')') {
            close(staples[i]);
          } else if (staples[i] == '{') {
            open(staples[i]);
          } else if (staples[i] == '}') {
            close(staples[i]);
          } else {
            return false;
          }
        }
      }
    } else {
      return null;
    }
    if (solo.length) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className={stylesCommon.wrapper}>
      <div className={stylesCommon.titleArea}>
        <h3 className={stylesCommon.title}>Request</h3>
        <button className={styles.button} onClick={MakeRequest}>
          <span className={styles.button__title}>{queryTitle ? queryTitle : 'Run'}</span>
          <span className={`material-icons ${styles.button__icon}`}>arrow_circle_right</span>
        </button>
      </div>
      <Editor ref={input} />
      <div className={styles.data}>{data}</div>
    </section>
  );
};
