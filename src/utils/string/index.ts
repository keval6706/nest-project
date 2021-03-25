export const generateHexString = (length: number): string => {
  let _string = '';
  while (_string.length < length) {
    _string += Math.random().toString(16).substring(2);
  }
  return _string.substring(0, length);
};
