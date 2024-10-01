import React, { FunctionComponent, ReactNode } from "react";
import { ReactI18NextChild } from "react-i18next";
import styled from "styled-components";
import { COLOR_WHITE } from "../constants/cts_colors";
import { GRADIENT_TO_TOP } from "../constants/cts_gradients";

const MainContainer = ({about, children}: {about: ReactNode, children: ReactNode}) => {
  return (
    <Container> 
      <PositionRelativeTop> {/* this is the top position relative for about container */}
        <About>{about}</About>
      </PositionRelativeTop>
      <Children> {/* children components */}
        {children}
      </Children>
    </Container>
  )
}

export default MainContainer;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Container = styled.div`
  position: absolute;
  width: 60%;
  top: 200px;
  left: 50%;
  background: rgba(256, 256, 256, 0.9);
  transform: translate(-50%);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 5px 15px 5px rgba(111, 104, 254, 0.25);
  
  // ========= MEDIA QUERIES - Container ============
  @media (max-width: 720px) {
    width: 80%;
  } 
`

const PositionRelativeTop = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const About = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translate(-50%);
  padding: 1rem;
  background: ${GRADIENT_TO_TOP};
  color: ${COLOR_WHITE};
  border-radius: 10px;
  box-shadow: 0px 5px 15px 5px rgba(180, 70, 255, 0.25);
`

const Children = styled.div`
  margin-top: 5rem; // give a margin top for all the children componentns from the main container
`