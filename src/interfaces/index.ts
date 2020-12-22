export type TableElementsListeners = (element: string) => void;

export type TimeoutTable = ReturnType<typeof setTimeout>;

interface TableElement {
  id: string;
}

export interface BtnConfig {
  id: string;
  label: string;
  type: string;
  element: string;
  className: string;
}

export interface StyleCellSizeType {
  width: number;
  height: number;
}

export interface StyleRemoveBtnType {
  display: string;
  top?: number;
  left?: number;
}

export interface TableInteractive {
  active: boolean;
  activeCellIndex: number;
  activeRowIndex: number;
  offsetLeft: number;
  offsetTop: number;
}

export interface TableConfig {
  rows: Array<TableElement>;
  columns: Array<TableElement>;
  cellSize: number;
}

export interface SquaresProps {
  width: number;
  height: number;
  cellSize: number;
}

export interface TableProps {
  tableConfig: TableConfig;
  styleCellSize: StyleCellSizeType;
}

export interface ButtonProps {
  label: string | number;
  className: string;
  onClick: () => void;
  style: object | StyleRemoveBtnType;
}
