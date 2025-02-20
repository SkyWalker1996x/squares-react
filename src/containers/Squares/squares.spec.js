import React from 'react';
import { render, mount } from 'enzyme';
import Squares from './Squares';
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
      console.log(testSquares.debug());
      testSquares.find('.add-row').at(0).simulate('click');
      expect(testSquares.find('tbody').children().length).toBe(initHeight + 1);
    });

    it('should add column', () => {
      testSquares
        .find('tbody')
        .children()
        .forEach((node) => {
          expect(node.children().length).toBe(initWidth);
        });
      testSquares.find('.add-col').at(0).simulate('click');
      testSquares
        .find('tbody')
        .children()
        .forEach((node) => {
          expect(node.children().length).toBe(initWidth + 1);
        });
    });
  });

  describe('Correct render after remove elements', () => {
    const testProps = {
      width: initWidth,
      height: initHeight,
      cellSize: initCellSize,
    };
    const testSquares = mount(<Squares {...testProps} />);
    it('should remove row', () => {
      expect(testSquares.find('tbody').children().length).toEqual(initHeight);
      testSquares.find('.remove-row').at(0).simulate('click');
      expect(testSquares.find('tbody').children().length).toBe(initHeight - 1);
    });

    it('should remove column', () => {
      testSquares
          .find('tbody')
          .children()
          .forEach((node) => {
            expect(node.children().length).toBe(initWidth);
          });
      testSquares.find('.remove-col').at(0).simulate('click');
      testSquares
          .find('tbody')
          .children()
          .forEach((node) => {
            expect(node.children().length).toBe(initWidth - 1);
          });
    });
  });

  describe('Correct render after remove last elements', () => {
    const testProps = {
      width: 1,
      height: 1,
      cellSize: initCellSize,
    };
    const testSquares = mount(<Squares {...testProps} />);
    it('should not remove row', () => {
      expect(testSquares.find('tbody').children().length).toEqual(1);
      testSquares.find('.remove-row').at(0).simulate('click');
      expect(testSquares.find('tbody').children().length).toBe(1);
    });

    it('should not remove column', () => {
      testSquares
          .find('tbody')
          .children()
          .forEach((node) => {
            expect(node.children().length).toBe(1);
          });
      testSquares.find('.remove-col').at(0).simulate('click');
      testSquares
          .find('tbody')
          .children()
          .forEach((node) => {
            expect(node.children().length).toBe(1);
          });
    });
  });
});
