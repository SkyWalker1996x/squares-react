const createArray = (number) => {
  return Array.from({ length: number }, () => ({
    id: generateId(),
  }));
};

const transformConfig = (config) => {
  const { width, height, cellSize } = config;

  return {
    rows: createArray(height),
    columns: createArray(width),
    cellSize,
  };
};

const generateId = () => {
  return `f${(~~(Math.random() * 1e8)).toString(16)}`;
};

export { transformConfig, generateId };
