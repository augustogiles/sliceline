import React from 'react';
import Menu from 'components/Menu/Menu';
import useFood from 'Hooks/useFood';

function Main(setOpenFood) {
  const foods = useFood();
  return <Menu {...setOpenFood} {...foods} />;
}

export default Main;
