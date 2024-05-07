export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

export const parseCSV = (csvContent) => {
  const lines = csvContent.split(/\r\n|\n/);
  const data = [];
  lines.forEach((line) => {
    const delimiter = line.includes(',') ? ',' : ';';
    const values = line.split(delimiter);
    data.push(values);
  });
  return data;
};

export const processHeaderName = (columnName) => {
  const words = columnName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
};
