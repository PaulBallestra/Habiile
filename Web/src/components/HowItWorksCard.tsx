import styled from "styled-components";
import {
  BLUE,
  GREY_CLEAR,
  GREY_DARK,
  GREY_MIDDLE,
  GREY_SECTION,
} from "../constants/cts_colors";
import { useTranslation } from "react-i18next";
import Button from "./Button";

const HowItWorksCard = () => {
  const { t } = useTranslation();
  return (
    <WorkCard>
      <div>
        <p>Étape 1</p>
        <p>Lancer un diagnostic énergétique</p>
      </div>
      <p style={{ fontSize: 32 }}>🚀</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius
        a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
        molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
        Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium
        a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra
        tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit
        sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
        pellentesque fermentum. Maecenas adipiscing ante non diam sodales
        hendrerit.
      </p>
      <div>
        <Button
          text={t(`heroSection.buttonText`, { ns: "header" })}
          onClick={() => {
            console.log("CLICK");
          }}
        />
      </div>
    </WorkCard>
  );
};

export default HowItWorksCard;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/
const WorkCard = styled.div`
  background-color: ${GREY_SECTION};
  border-radius: 16px;
  border: 1px solid ${GREY_CLEAR};
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  box-shadow: 0px 7px 11px 1px rgba(7, 5, 5, 0.09);
  -webkit-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);

  p {
    font-size: 14px;
    font-weight: bold;
    color: ${GREY_MIDDLE};
    line-height: 1.2;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    p {
      font-size: 18px;
      font-weight: bold;
      color: ${GREY_DARK};
    }
  }
`;
