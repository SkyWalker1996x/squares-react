export type tableElementsListeners = (element: string) => void;

export type timeoutTable = ReturnType<typeof setTimeout>;

interface tableElement {
  id: string;
}

export interface bntConfig {
  id: string;
  value: string;
  type: string;
  element: string;
  className: string;
}

export interface styleCellSizeType {
  width: number;
  height: number;
}

export interface styleRemoveBtnType {
  display: string;
  top?: number;
  left?: number;
}

export interface tableInteractive {
  active: boolean;
  activeCellIndex: number;
  activeRowIndex: number;
  offsetLeft: number;
  offsetTop: number;
}

export interface tableConfig {
  rows: Array<tableElement>;
  columns: Array<tableElement>;
  cellSize: number;
}

export interface squaresProps {
  width: number;
  height: number;
  cellSize: number;
}

export interface tableProps {
  tableConfig: tableConfig;
  styleCellSize: styleCellSizeType;
}

export interface buttonProps {
  btnConfig: bntConfig;
  addTableElement: tableElementsListeners;
  removeTableElement: tableElementsListeners;
  styleRemoveColBtn: styleRemoveBtnType;
  styleRemoveRowBtn: styleRemoveBtnType;
}
