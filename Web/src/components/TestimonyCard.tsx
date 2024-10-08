import styled from "styled-components";
import { GREY_CLEAR, GREY_DARK, GREY_SECTION } from "../constants/cts_colors";
import { useTranslation } from "react-i18next";

const TestimonyCard = () => {
  const { t } = useTranslation();
  return (
    <TestCard>
      <UserInfos>
        <img src="https://picsum.photos/200/200" />
        <div>
          <h4>PRÉNOM</h4>
          <h4>NOM</h4>
        </div>
      </UserInfos>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor.
        </p>
      </div>
    </TestCard>
  );
};

export default TestimonyCard;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/
const TestCard = styled.div`
  background-color: ${GREY_SECTION};
  border-radius: 16px;
  border: 1px solid ${GREY_CLEAR};
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  box-shadow: 0px 7px 11px 1px rgba(7, 5, 5, 0.09);
  -webkit-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
  max-width: 28%;

  div > p {
    font-size: 14px;
    color: ${GREY_DARK};
    line-height: 1.2;
    text-align: left;
  }

  // ========= MEDIA QUERIES ============
  @media (max-width: 1078px) {
    max-width: 66%;
  }

  @media (max-width: 662px) {
    max-width: 100%;
  }
`;

const UserInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  div {
    h4 {
      font-size: 16px;
      font-weight: bold;
      color: ${GREY_DARK};
      text-align: left;
    }
  }

  img {
    top: 30;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 1000px;
  }
`;
