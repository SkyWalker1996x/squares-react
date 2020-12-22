import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { transformConfig, generateId } from '../../utils';
import { initTableInteractive, initTableButtons, delayTable } from '../../data';
import {
  SquaresProps,
  TableInteractive,
  TableConfig,
  TimeoutTable,
  BtnConfig,
  StyleRemoveBtnType,
  StyleCellSizeType,
  TableElementsListeners
} from '../../interfaces';

const Squares = ({ width, height, cellSize }: SquaresProps) => {
  let timeoutTable: TimeoutTable;

  const [tableConfig, setTableConfig] = useState<TableConfig>(
    transformConfig({ width, height, cellSize })
  );
  const [tableInteractive, setTableInteractive] = useState<TableInteractive>(
    initTableInteractive
  );

  const addTableElement: TableElementsListeners = (element) => {
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
  const removeTableElement: TableElementsListeners = (element) => {
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

  const styleRemoveColBtn: StyleRemoveBtnType = {
    display:
      tableConfig.columns.length < 2
        ? 'none'
        : tableInteractive.active
        ? 'block'
        : 'none',
    left: tableInteractive.offsetLeft,
  };
  const styleRemoveRowBtn: StyleRemoveBtnType = {
    display:
      tableConfig.rows.length < 2
        ? 'none'
        : tableInteractive.active
        ? 'block'
        : 'none',
    top: tableInteractive.offsetTop,
  };
  const styleCellSize: StyleCellSizeType = {
    width: tableConfig.cellSize,
    height: tableConfig.cellSize,
  };

  const buttons = initTableButtons.map((btnConfig: BtnConfig) => {
    const {id, label, element, className, type} = btnConfig;
    console.log(btnConfig);

    return (
      <Button
        key={id}
        onClick={
          type === 'remove'
              ? () => removeTableElement(element)
              : () => addTableElement(element)
        }
        label={label}
        className={className}
        style={
          type === 'add'
              ? {}
              : element === 'row'
              ? styleRemoveRowBtn
              : styleRemoveColBtn
        }
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
