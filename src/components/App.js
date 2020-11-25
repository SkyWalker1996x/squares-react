import React, { useState } from 'react';
import { Table } from './table';

const initTableConfig = {
  width: 4,
  height: 4,
  cellSize: 50,
};

const App = () => {
  const [tableParams, setTableParams] = useState(initTableConfig);
  const [tableActive, setTableActive] = useState({});

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
    if (e.target.className === 'cell') {
      setTableActive({
        active: true,
        cellIndex: e.target.cellIndex,
        rowIndex: e.target.parentNode.rowIndex,
        offsetLeft: e.target.offsetLeft,
        offsetTop: e.target.offsetTop,
      });
    }
  };

  const outTable = () => {
    setTableActive((prevState) => {
      return {
        ...prevState,
        active: false,
      };
    });
  };

  const styleRemoveColBtn = {
    display: tableActive.active ? 'block' : 'none',
    left: tableActive.offsetLeft,
  };

  const styleRemoveRowBtn = {
    display: tableActive.active ? 'block' : 'none',
    top: tableActive.offsetTop,
  };

  return (
    <div
      className="table-wrapper"
      onMouseOver={overTable}
      onMouseLeave={outTable}
    >
      <Table tableParams={tableParams} />
      <button onClick={addRow} className="button add-row">
        +
      </button>
      <button onClick={addCol} className="button add-col">
        +
      </button>
      <button className="button remove-row" style={styleRemoveRowBtn}>
        -
      </button>
      <button className="button remove-col" style={styleRemoveColBtn}>
        -
      </button>
    </div>
  );
};

export default App;
