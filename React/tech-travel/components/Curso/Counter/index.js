import React, { useEffect, useState } from 'react';

function CouterFunction() {
  const [count, setCount] = useState(0);
  const [nombre] = useState('Gabriela');

  const sumOne = () => {
    setCount(count + 1);
  };

  useEffect(() => () => {
    console.log('termine');
  }, []);

  return (
    <div>
      <h1>{nombre}</h1>
      <p>{count}</p>
      <button type="button" onClick={sumOne}>Sumar 1</button>
    </div>
  );
}

export default CouterFunction;
