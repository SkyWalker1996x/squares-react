import React, { useState } from 'react';
import { Table } from './table';

const initTableConfig = {
  width: 4,
  height: 4,
  cellSize: 50,
};

const App = () => {
  const [tableParams, setTableParams] = useState(initTableConfig);
  const [tableActive, setTableActive] = useState(false);

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

  const overTable = (e) => {
    setTableActive(true);
    console.log(e.target.cellIndex);
    console.log(e.target.parentNode.rowIndex);
  };

  const outTable = () => {
    setTableActive(false);
  };

  const displayButton = {
    display: tableActive ? 'block' : 'none',
  };

  return (
    <div
      className="table-wrapper"
      onMouseOver={overTable}
      onMouseOut={outTable}
    >
      <Table tableParams={tableParams} />
      <button onClick={addRow} className="button add-row">
        +
      </button>
      <button onClick={addCol} className="button add-col">
        +
      </button>
      <button
        onClick={console.log('- row')}
        className="button remove-row"
        style={displayButton}
      >
        -
      </button>
      <button
        onClick={console.log('- col')}
        className="button remove-col"
        style={displayButton}
      >
        -
      </button>
    </div>
  );
};

export default App;
