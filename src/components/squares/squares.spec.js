import React from 'react';
import { render } from 'enzyme';
import Squares from './index';
import { initWidth, initHeight, initCellSize } from '../../data';

describe('Squares testing', () => {
  describe('Render a table', () => {
    const testProps = {
      width: initWidth,
      height: initHeight,
      cellSize: initCellSize,
    };
    const testSquares = render(<Squares {...testProps} />);

    it('table render with initial props', () => {
      expect(testSquares).toMatchSnapshot();
    });

    it('number of rows into a table should be 4', () => {
      const table = testSquares.children()[0].children[0];
      expect(table.children).toHaveLength(initHeight);
    });

    it('number of cells into a row should be 4', () => {
      const table = testSquares.children()[0].children[0];
      const rows = table.children;
      rows.forEach((node) => {
        expect(node.children).toHaveLength(initWidth);
      });
    });
  });

  describe('Correct render after add elements', () => {
    const testProps = {
      width: initWidth,
      height: initHeight,
      cellSize: initCellSize,
    };
    const testSquares = mount(<Squares {...testProps} />);
    it('should add row', () => {
      expect(testSquares.find('tbody').children().length).toEqual(initHeight);
      testSquares.find('.add-row').simulate('click');
      expect(testSquares.find('tbody').children().length).toBe(initHeight + 1);
    });

    it('should add column', () => {
      testSquares
        .find('tbody')
        .children()
        .forEach((node) => {
          expect(node.children().length).toBe(initWidth);
        });
      testSquares.find('.add-col').simulate('click');
      testSquares
        .find('tbody')
        .children()
        .forEach((node) => {
          expect(node.children().length).toBe(initWidth + 1);
        });
    });
  });
});
