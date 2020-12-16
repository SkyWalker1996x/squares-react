import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { transformConfig, generateId } from '../../utils';
import { initTableInteractive, initTableButtons, delayTable } from '../../data';
import {
  squaresProps,
  tableInteractive,
  tableConfig,
  timeoutTable,
  bntConfig,
  styleRemoveBtnType,
  styleCellSizeType,
  tableElementsListeners
} from '../../interfaces';

const Squares = ({ width, height, cellSize }: squaresProps) => {
  let timeoutTable: timeoutTable;

  const [tableConfig, setTableConfig] = useState<tableConfig>(
    transformConfig({ width, height, cellSize })
  );
  const [tableInteractive, setTableInteractive] = useState<tableInteractive>(
    initTableInteractive
  );

  const addTableElement: tableElementsListeners = (element) => {
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
  const removeTableElement: tableElementsListeners = (element) => {
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
  const overTable = (e: React.MouseEvent) => {
    clearTimeout(timeoutTable);

    if ((e.target as HTMLElement).className.includes('cell')) {
      setTableInteractive({
        active: true,
        activeCellIndex: (e.target as HTMLTableCellElement).cellIndex,
        offsetLeft: (e.target as HTMLTableElement).offsetLeft,
        offsetTop: (e.target as HTMLTableElement).offsetTop,
        // @ts-ignore
        activeRowIndex: (e.target as HTMLTableElement).parentNode.rowIndex,
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
    timeoutTable = setTimeout(() => {
      setTableInteractive((prevState) => {
        return {
          ...prevState,
          active: false,
        };
      });
    }, delayTable);
  };

  const styleRemoveColBtn: styleRemoveBtnType = {
    display:
      tableConfig.columns.length < 2
        ? 'none'
        : tableInteractive.active
        ? 'block'
        : 'none',
    left: tableInteractive.offsetLeft,
  };
  const styleRemoveRowBtn: styleRemoveBtnType = {
    display:
      tableConfig.rows.length < 2
        ? 'none'
        : tableInteractive.active
        ? 'block'
        : 'none',
    top: tableInteractive.offsetTop,
  };
  const styleCellSize: styleCellSizeType = {
    width: tableConfig.cellSize,
    height: tableConfig.cellSize,
  };

  const buttons = initTableButtons.map((btnConfig: bntConfig) => {
    return (
      <Button
        key={btnConfig.id}
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
      onMouseMove={overTable}
      onMouseLeave={outTable}
    >
      <Table tableConfig={tableConfig} styleCellSize={styleCellSize} />
      {buttons}
    </div>
  );
};

export default Squares;
