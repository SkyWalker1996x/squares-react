import { generateId } from '../utils';

const tableButtons = [
  {
    id: generateId(),
    value: '+',
    type: 'add',
    element: 'row',
    className: 'button add-row',
  },
  {
    id: generateId(),
    value: '+',
    type: 'add',
    element: 'column',
    className: 'button add-col',
  },
  {
    id: generateId(),
    value: '-',
    type: 'remove',
    element: 'row',
    className: 'button remove-row',
  },
  {
    id: generateId(),
    value: '-',
    type: 'remove',
    element: 'column',
    className: 'button remove-col',
  },
];

const initWidth = 4;
const initHeight = 4;
const initCellSize = 50;

const initTableInteractive = {
  active: false,
  activeCellIndex: 0,
  activeRowIndex: 0,
  offsetLeft: 0,
  offsetTop: 0,
};

export {
  tableButtons,
  initTableInteractive,
  initCellSize,
  initHeight,
  initWidth,
};
