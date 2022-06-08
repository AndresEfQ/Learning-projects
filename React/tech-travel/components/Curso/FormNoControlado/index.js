import React, { useRef } from 'react';

function FormNoControlado() {
  const inputRef = useRef();

  const onClickButton = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <h1>Mi input</h1>
      <input ref={inputRef} />
      <button type="submit" onClick={onClickButton}>Continuar</button>
    </div>
  );
}

export default FormNoControlado;
