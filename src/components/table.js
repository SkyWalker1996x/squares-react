import React from 'react';

const Table = ({ tableConfig, styleCellSize }) => {
  const { rows, columns } = tableConfig;

  return (
    <table className="table">
      <tbody>
        {rows.map((v, k) => {
          return (
            <tr className="row" key={k}>
              {columns.map((v, k) => {
                return <td className="cell" key={k} style={styleCellSize} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
