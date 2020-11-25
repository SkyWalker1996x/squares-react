import React, { useState } from 'react';
import { Table } from './table';
import { transformConfig } from '../utils';
import { initTableConfig, initTableInteractive } from '../data';

const App = () => {
  const [tableConfig, setTableConfig] = useState(
    transformConfig(initTableConfig)
  );
  const [tableInteractive, setTableInteractive] = useState(
    initTableInteractive
  );

  const addRow = () => {
    setTableConfig((prevState) => {
      const { rows } = prevState;
      const newItem = rows[rows.length - 1] + 1;

      return {
        ...prevState,
        rows: [...rows, newItem],
      };
    });
  };
  const addCol = () => {
    setTableConfig((prevState) => {
      const { columns } = prevState;
      const newItem = columns[columns.length - 1] + 1;

      return {
        ...prevState,
        columns: [...columns, newItem],
      };
    });
  };
  const removeRow = () => {
    const { rows } = tableConfig;
    const { rowIndex } = tableInteractive;
    const newRows = rows.filter((v, k) => k !== rowIndex);

    setTableConfig((prevState) => {
      return {
        ...prevState,
        rows: newRows,
      };
    });
  };
  const removeCol = () => {
    const { columns } = tableConfig;
    const { cellIndex } = tableInteractive;
    const newColumns = columns.filter((v, k) => k !== cellIndex);

    setTableConfig((prevState) => {
      return {
        ...prevState,
        columns: newColumns,
      };
    });
  };
  const overTable = (e) => {
    if (e.target.className === 'cell') {
      setTableInteractive({
        active: true,
        cellIndex: e.target.cellIndex,
        rowIndex: e.target.parentNode.rowIndex,
        offsetLeft: e.target.offsetLeft,
        offsetTop: e.target.offsetTop,
      });
    }
  };
  const outTable = () => {
    setTableInteractive((prevState) => {
      return {
        ...prevState,
        active: false,
      };
    });
  };

  const styleRemoveColBtn = {
    display: tableInteractive.active ? 'block' : 'none',
    left: tableInteractive.offsetLeft,
  };
  const styleRemoveRowBtn = {
    display: tableInteractive.active ? 'block' : 'none',
    top: tableInteractive.offsetTop,
  };
  const styleCellSize = {
    width: tableConfig.cellSize,
    height: tableConfig.cellSize,
  };

  return (
    <div
      className="table-wrapper"
      onMouseOver={overTable}
      onMouseLeave={outTable}
    >
      <Table tableConfig={tableConfig} styleCellSize={styleCellSize} />
      <button onClick={addRow} className="button add-row">
        +
      </button>
      <button onClick={addCol} className="button add-col">
        +
      </button>
      <button
        onClick={removeRow}
        className="button remove-row"
        style={styleRemoveRowBtn}
      >
        -
      </button>
      <button
        onClick={removeCol}
        className="button remove-col"
        style={styleRemoveColBtn}
      >
        -
      </button>
    </div>
  );
};

export default App;
