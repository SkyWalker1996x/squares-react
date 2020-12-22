import React from 'react';
import { TableProps } from '../../interfaces';

const Table = ({ tableConfig, styleCellSize }: TableProps) => {
  const { rows, columns } = tableConfig;

  return (
    <table className="table">
      <tbody>
        {rows.map((item) => {
          return (
            <tr className="row" key={item.id}>
              {columns.map((item) => {
                return (
                  <td className="cell" key={item.id} style={styleCellSize} />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
