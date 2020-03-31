import React from 'react';
import Menu from '../../Menu/Menu';
import useFood from '../../Hooks/useFood';

function Main({ openFood }) {
  const foods = useFood();
  return <Menu {...openFood} {...foods} />;
}

export default Main;
