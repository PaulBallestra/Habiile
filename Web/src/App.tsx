import React, { useState } from 'react';
import AppRoutes from './routes/routes';
import styled from "styled-components";

function App() {

  return (
    <Wrapper>
      <AppRoutes/>
    </Wrapper>
  );
}

export default App;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width:  100vw;
`