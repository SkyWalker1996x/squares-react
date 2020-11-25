const createArray = (number) => {
  return Array.from({ length: number }, (v, k) => k);
};

const transformConfig = (config) => {
  const { width, height, cellSize } = config;

  return {
    rows: createArray(height),
    columns: createArray(width),
    cellSize,
  };
};

export { transformConfig };
