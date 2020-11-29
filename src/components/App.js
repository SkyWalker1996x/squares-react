import React from 'react';
import Squares from './squares';
import { initWidth, initHeight, initCellSize } from '../data';

const App = () => {
  return (
    <Squares width={initWidth} height={initHeight} cellSize={initCellSize} />
  );
};

export default App;
