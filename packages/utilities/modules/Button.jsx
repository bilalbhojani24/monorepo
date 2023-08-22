import React from 'react';

const text = {};

const Button = () => {
  if (text.data.group) return <h1>Failed...</h1>;
  return <div>Button</div>;
};

export default Button;
