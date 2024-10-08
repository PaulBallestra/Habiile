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

const HowItWorksCard = ({ info }: { info: any }) => {
  const { t } = useTranslation();
  return (
    <WorkCard>
      <div>
        <p>{info.etape}</p>
        <p>{info.title}</p>
      </div>
      <p style={{ fontSize: 32 }}>{info.icon}</p>
      <p>{info.content}</p>
      <div>
        <Button
          text={info.button}
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

  // ========= MEDIA QUERIES ============
  @media (max-width: 1078px) {
    max-width: 55vw;
  }

  @media (max-width: 745px) {
    max-width: 90vw;
  }
`;
