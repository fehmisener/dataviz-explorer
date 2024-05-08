export const processHeaderName = (columnName) => {
  const words = columnName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
};
