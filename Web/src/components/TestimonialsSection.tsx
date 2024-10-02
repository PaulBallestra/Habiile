import styled from "styled-components";
import { GREY_DARK } from "../constants/cts_colors";
import { useTranslation } from "react-i18next";
import TestimonyCard from "./TestimonyCard";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h2>{t(`testimonialsSection.title`, { ns: "header" })}</h2>
      <CardsSection>
        <TestimonyCard />
        <TestimonyCard />
        {/* <Responsive> */}
        <TestimonyCard />
        {/* </Responsive> */}
      </CardsSection>
    </Container>
  );
};

export default TestimonialsSection;

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

  // ========= MEDIA QUERIES - CardsSection ============
  @media (max-width: 1078px) {
    margin: 32px 16px;
    gap: 24px;
  }

  @media (max-width: 864px) {
  }
`;

const Responsive = styled.div`
  flex-basis: 30%;

  @media (max-width: 1078px) {
    display: flex;
    justify-content: center;
    flex-basis: 50%;
  }
`;
