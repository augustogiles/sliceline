import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { Navbar } from './Navbar/Navbar'
import { Banner } from './Banner/Banner'
import { Menu } from './Menu/Menu'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0px;
  }
`

function App() {
  return (
    <>
      <GlobalStyle/>
      <Navbar/>
      <Banner/>
      <Menu/>
      <div>
        Hello Sliceline
      </div>
    </>
  );
}

export default App;
