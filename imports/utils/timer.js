const convertFormat = (obj) => {
  const copiedObj = Object.assign({}, obj);
  Object.keys(copiedObj).forEach((el) => {
    if (copiedObj[el] < 10) {
      copiedObj[el] = `0${copiedObj[el]}`;
    }
  });
  return copiedObj;
};

export const getValue = (value) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value - hours * 3600) / 60);
  const seconds = Math.floor(value - hours * 3600 - minutes * 60);

  const time = convertFormat({ hours, minutes, seconds });

  return time;
};
