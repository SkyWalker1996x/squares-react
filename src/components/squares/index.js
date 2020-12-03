import React, { useState } from 'react';
import { Table } from './table';
import { transformConfig, generateId } from '../../utils';
import { initTableInteractive, tableButtons } from '../../data';

const Squares = ({ width, height, cellSize }) => {
  const [tableConfig, setTableConfig] = useState(
    transformConfig({ width, height, cellSize })
  );
  const [tableInteractive, setTableInteractive] = useState(
    initTableInteractive
  );

  const addTableElement = (element) => {
    setTableConfig((prevState) => {
      const { rows, columns } = prevState;

      const newItem = {
        id: generateId(),
      };

      if (element === 'row') {
        return {
          ...prevState,
          rows: [...rows, newItem],
        };
      } else {
        return {
          ...prevState,
          columns: [...columns, newItem],
        };
      }
    });
  };
  const removeTableElement = (element) => {
    const { rows, columns } = tableConfig;
    if (element === 'row' && rows.length <= 1) return;
    if (element === 'column' && columns.length <= 1) return;

    if (element === 'row') {
      const { rowIndex } = tableInteractive;
      const newRows = rows.filter((v, k) => k !== rowIndex);

      setTableConfig((prevState) => {
        return {
          ...prevState,
          rows: newRows,
        };
      });
    } else {
      const { cellIndex } = tableInteractive;
      const newColumns = columns.filter((v, k) => k !== cellIndex);

      setTableConfig((prevState) => {
        return {
          ...prevState,
          columns: newColumns,
        };
      });
    }

    setTableInteractive((prevState) => {
      return {
        ...prevState,
        active: false,
      };
    });
  };
  const overTable = (e) => {
    if (e.target.className.includes('cell')) {
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

  const buttons = tableButtons.map((btn) => {
    const { id, value, element, className, type } = btn;
    const listener =
      type === 'add'
        ? () => addTableElement(element)
        : () => removeTableElement(element);

    let style;
    if (type === 'remove') {
      style = element === 'row' ? styleRemoveRowBtn : styleRemoveColBtn;
    } else {
      style = {};
    }

    return (
      <button key={id} onClick={listener} className={className} style={style}>
        {value}
      </button>
    );
  });

  return (
    <div
      className="table-wrapper"
      onMouseOver={overTable}
      onMouseLeave={outTable}
    >
      <Table tableConfig={tableConfig} styleCellSize={styleCellSize} />
      {buttons}
    </div>
  );
};

export default Squares;
