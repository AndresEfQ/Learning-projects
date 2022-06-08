import React from 'react';
import './styles.css';

function ListOption({ ...props }) {
  const [children, tiempo] = props;
  return (
    <li {...props}>{children} {tiempo}</li>
  );
}

export default ListOption;
