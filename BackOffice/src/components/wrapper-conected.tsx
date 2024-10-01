import React, { useState } from "react";
import styled from "styled-components"
import Header from "./Header";
import Footer from "./Footer";

const WrapperConnected = ({ children }: { children: any }) => {
  const [openModal, _setOpenModal] = useState<boolean>(false)

  return (
    <Wrapper>
      <Header/>
      <Container /*scroll={scroll}*/>
        {children}
      </Container>
      <Footer/>
    </Wrapper>
  );
};

export default WrapperConnected;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  width: 85%;
`