import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
        {t("mainTitle", {ns: "dashboard"})}
    </Wrapper>
  )
}

export default Dashboard;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`