import styled from "styled-components";
import { GREY_DARK } from "../constants/cts_colors";
import { useTranslation } from "react-i18next";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const howItWorksInfos = [
    {
      etape: "Étape 1",
      title: "Lancer un diagnostic énergétique",
      icon: "🚀",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.",
      button: "Commencer",
    },
    {
      etape: "Étape 2",
      title: "Comparer les devis de nos artisans certifiés",
      icon: "🆚",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.",
      button: "Commencer",
    },
    {
      etape: "Étape 3",
      title: "Suivre vos travaux en temps réel",
      icon: "👉",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.",
      button: "Commencer",
    },
  ];

  return (
    <Container>
      <h2>{t(`howItWorksSection.title`, { ns: "header" })}</h2>
      <CardsSection>
        {howItWorksInfos.map((info, key) => {
          return <HowItWorksCard info={info} key={key} />;
        })}
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
    align-items: center;
  }
`;
