import { generateId } from '../utils';

const initTableButtons = [
  {
    id: generateId(),
    label: '+',
    type: 'add',
    element: 'row',
    className: 'button add-row',
  },
  {
    id: generateId(),
    label: '+',
    type: 'add',
    element: 'column',
    className: 'button add-col',
  },
  {
    id: generateId(),
    label: '-',
    type: 'remove',
    element: 'row',
    className: 'button remove-row',
  },
  {
    id: generateId(),
    label: '-',
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

const delayTable = 500;

export {
  delayTable,
  initTableButtons,
  initTableInteractive,
  initCellSize,
  initHeight,
  initWidth,
};
