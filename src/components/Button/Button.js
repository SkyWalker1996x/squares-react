import React from 'react';

const Button = ({
  btnConfig,
  addTableElement,
  removeTableElement,
  styleRemoveColBtn,
  styleRemoveRowBtn,
}) => {
  const { id, value, element, className, type } = btnConfig;
  const listener =
    type === 'add'
      ? () => addTableElement(element)
      : () => removeTableElement(element);

  let style;
  if (type === 'remove') {
    style = element === 'row' ? styleRemoveRowBtn : styleRemoveColBtn;
  } else {
    style = {};
  }

  return (
    <button key={id} onClick={listener} className={className} style={style}>
      {value}
    </button>
  );
};

export { Button };
