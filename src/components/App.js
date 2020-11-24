import React, { useState } from 'react';
import { Table } from './table';

const initTableConfig = {
  width: 4,
  height: 4,
  cellSize: 50,
};

const App = () => {
  const [tableParams, setTableParams] = useState(initTableConfig);

  const addRow = () => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        height: prevState.height + 1,
      };
    });
  };

  const addCol = () => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        width: prevState.width + 1,
      };
    });
  };

  return (
    <div className="table-wrapper">
      <Table tableParams={tableParams} />
      <button onClick={addRow} className="button add-row">
        +
      </button>
      <button onClick={addCol} className="button add-col">
        +
      </button>
      <button onClick={console.log('- row')} className="button remove-row">
        -
      </button>
      <button onClick={console.log('- col')} className="button remove-col">
        -
      </button>
    </div>
  );
};

export default App;
