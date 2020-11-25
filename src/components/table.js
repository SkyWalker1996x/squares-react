import React from 'react';

const Table = ({ tableParams }) => {
  const { width, height, cellSize } = tableParams;

  const styleCellSize = {
    width: cellSize,
    height: cellSize,
  };

  return (
    <table className="table">
      <tbody>
        {Array.from({ length: height }, (v, k) => {
          return (
            <tr className="row" key={k}>
              {Array.from({ length: width }, (v, k) => {
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
