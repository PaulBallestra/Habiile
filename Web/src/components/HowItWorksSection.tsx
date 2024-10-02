import styled from "styled-components";
import { GREY_DARK } from "../constants/cts_colors";
import { useTranslation } from "react-i18next";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorksSection = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h2>{t(`howItWorksSection.title`, { ns: "header" })}</h2>
      <CardsSection>
        <HowItWorksCard />
        <HowItWorksCard />
        <HowItWorksCard />
      </CardsSection>
    </Container>
  );
};

export default HowItWorksSection;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Container = styled.div`
  width: 100%;
  text-align: center;

  h2 {
    padding-top: 32px;
    font-size: 24px;
    font-weight: bold;
    color: ${GREY_DARK};
  }
`;

const CardsSection = styled.div`
  margin: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 32px;

  // ========= MEDIA QUERIES - StyledNavLink ============
  @media (max-width: 1078px) {
    flex-direction: column;
  }
`;
