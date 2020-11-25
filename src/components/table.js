import React from 'react';

const Table = ({ tableConfig, styleCellSize }) => {
  const { rows, columns } = tableConfig;

  return (
    <table className="table">
      <tbody>
        {rows.map((v, rowKey) => {
          return (
            <tr className="row" key={rowKey}>
              {columns.map((v, colKey) => {
                return (
                  <td className="cell" key={colKey} style={styleCellSize}>
                    {v}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
