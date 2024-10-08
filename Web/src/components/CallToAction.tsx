import styled from "styled-components";
import { BLUE, GREY_DARK, GREY_MIDDLE, WHITE } from "../constants/cts_colors";
import { useTranslation } from "react-i18next";
import Button from "./Button";

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <Container
      style={{ backgroundImage: `url("https://picsum.photos/1920/1080")` }}
    >
      <TextHero>
        <h1>{t(`callToAction.title`, { ns: "header" })}</h1>
        <Button
          text={t(`callToAction.buttonText`, { ns: "header" })}
          onClick={() => {
            console.log("CLICK");
          }}
        />
      </TextHero>
    </Container>
  );
};

export default CallToAction;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Container = styled.div`
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 7px 11px 1px rgba(7, 5, 5, 0.09);
  -webkit-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
`;

const TextHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 128px;
  padding-bottom: 128px;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;

  h1 {
    font-size: 36px;
    margin: 0 24px;
    font-weight: bold;
    color: ${GREY_DARK};
  }

  /* h4 {
    font-size: 18px;
    color: ${GREY_DARK};
    margin: 0 24px;
  } */

  button {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 1000px;
    padding: 16px 24px;
    background-color: ${BLUE};
    color: ${WHITE};
    cursor: pointer;
    border: 1px solid ${BLUE};
    transition: all 250ms;

    :hover {
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  }

  // ========= MEDIA QUERIES - TextHero ============
  @media (max-width: 745px) {
    padding: 128px 32px;

    h1 {
      font-size: 33px;
      margin: 0 12px;
    }

    h4 {
      margin: 0 12px;
    }
  }
`;
