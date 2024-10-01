import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MainContainer from "../../components/MainContainer";

const About = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      {/* main container */}
      <MainContainer
        about={<h1>{t("mainTitle", {ns: "aboutPage"})}</h1>}
      >

      </MainContainer>
    </Wrapper>
  )
}

export default About;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const MainContent = styled.div`

`