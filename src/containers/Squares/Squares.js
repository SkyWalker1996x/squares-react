import React, { useState } from 'react';
import { Table } from '../../components/Table/Table';
import { Button } from '../../components/Button/Button';
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
      const { activeRowIndex: removeRowIndex } = tableInteractive;
      const newRows = rows.filter(
        (row, rowIndex) => rowIndex !== removeRowIndex
      );

      setTableConfig((prevState) => {
        return {
          ...prevState,
          rows: newRows,
        };
      });
    } else {
      const { activeCellIndex: removeCellIndex } = tableInteractive;
      const newColumns = columns.filter(
        (column, colIndex) => colIndex !== removeCellIndex
      );

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
        activeCellIndex: e.target.cellIndex,
        activeRowIndex: e.target.parentNode.rowIndex,
        offsetLeft: e.target.offsetLeft,
        offsetTop: e.target.offsetTop,
      });
    } else {
      setTableInteractive((prevState) => {
        return {
          ...prevState,
          active: true,
        };
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
    display:
      tableConfig.columns.length < 2
        ? 'none'
        : tableInteractive.active
        ? 'block'
        : 'none',
    left: tableInteractive.offsetLeft,
  };
  const styleRemoveRowBtn = {
    display:
      tableConfig.rows.length < 2
        ? 'none'
        : tableInteractive.active
        ? 'block'
        : 'none',
    top: tableInteractive.offsetTop,
  };
  const styleCellSize = {
    width: tableConfig.cellSize,
    height: tableConfig.cellSize,
  };

  const buttons = tableButtons.map((btnConfig) => {
    return (
      <Button
        addTableElement={addTableElement}
        removeTableElement={removeTableElement}
        btnConfig={btnConfig}
        styleRemoveRowBtn={styleRemoveRowBtn}
        styleRemoveColBtn={styleRemoveColBtn}
      />
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
