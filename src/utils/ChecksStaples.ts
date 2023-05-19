export const ChecksStaples = (data: string) => {
  const staples = JSON.stringify(data)
    .match(/[{}()]+/g)
    ?.join('')
    .split('');
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
