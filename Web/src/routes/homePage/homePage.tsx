import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";
import HeroSection from "../../components/HeroSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import i18next from "i18next";

const HomePage = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = t("mainTitle", { ns: "homePage" });
  }, [i18next.language]);

  return (
    <Wrapper>
      {/* HERO SECTION */}
      <HeroSection />

      {/* COMMENT ÇA MARCHE */}
      <HowItWorksSection />

      {/* TEMOIGNAGES */}
      <TestimonialsSection />

      {/* CALL TO ACTION */}
      <CallToAction />

      {/* FOOTER */}
      <Footer />
    </Wrapper>
  );
};

export default HomePage;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: absolute;
  top: 120px;
  width: 100vw;
  height: 100vh;
`;
