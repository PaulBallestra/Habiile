import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MainContainer from "../../components/MainContainer";

const LegalNotices = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      {/* main container */}
      <MainContainer
        about={<h1>{t("mainTitle", {ns: "legalNoticesPage"})}</h1>}
      >

      </MainContainer>
    </Wrapper>
  )
}

export default LegalNotices;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const MainContent = styled.div`

`