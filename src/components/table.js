import React, { useState } from 'react';

const Table = () => {
  const tableConfig = {
    width: 4,
    height: 4,
    cellSize: 50,
  };

  const [tableParams, setTableParams] = useState({
    width: 5,
    height: 4,
    cellSize: 100,
  });

  const styleCellSize = {
    width: tableParams.cellSize,
    height: tableParams.cellSize
  }

  return (
    <div className="table">
      {Array.from({ length: tableParams.height }, (v, k) => {
        return (
          <div className="row" key={k}>
            {Array.from({ length: tableParams.width }, (v, k) => {
              return <div className="cell" key={k} style={styleCellSize}/>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export { Table };
