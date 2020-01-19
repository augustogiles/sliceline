import React from 'react';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`

function App() {
  return (
    <>
      <GlobalStyle/>
      <div>
        Hello Sliceline
      </div>
    </>
  );
}

export default App;
