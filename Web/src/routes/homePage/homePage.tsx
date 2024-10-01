import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_WHITE } from "../../constants/cts_colors";
import microsoftLogo from "../../assets/images/homePage/presentationHeader/microsoft_logo.png";
import adidasLogo from "../../assets/images/homePage/presentationHeader/adidas_logo.png";
import ibmLogo from "../../assets/images/homePage/presentationHeader/ibm_logo.png";
import amazonLogo from "../../assets/images/homePage/presentationHeader/amazon_logo.png";
import subtitleLine from "../../assets/images/homePage/about/subtitle_line.png";
import aboutCardBg from "../../assets/images/homePage/about/card_bg.png";
import searchJobIcon from "../../assets/images/homePage/about/job_search_icon.png";
import liveChatIcon from "../../assets/images/homePage/about/live_chat_icon.png";
import fullyFunctionalIcon from "../../assets/images/homePage/about/fully_functional_icon.png";
import aboutBackground from "../../assets/images/homePage/background.png";
import footerSmartphone from "../../assets/images/homePage/footer/smartphone.png";
import footerImg from "../../assets/images/homePage/footer/footer.jpg";

const HomePage = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  return (
    <Wrapper>

      {/* presentation header */}
      <PresentationHeader>
        <PresentationInfo>
          {/* title */}
          <h1>{t("presentation.title.firstPart", {ns: "homePage"})}<strong>{t("presentation.title.strongText", {ns: "homePage"})}</strong>{t("presentation.title.lastPart", {ns: "homePage"})}</h1>
          {/* description */}
          <p>{t("presentation.description", {ns: "homePage"})}</p>
          <Button text={t("presentation.button", {ns: "homePage"})} onClick={() => (
            navigate(getPageUrl(PATH.signup))
          )} />
          <HeaderLogos>
            <img src={microsoftLogo} className="set-size" alt="microsoft" />
            <img src={adidasLogo} className="set-size" alt="adidas" />
            <img src={ibmLogo} alt="microsoft" />
            <img src={amazonLogo} className="set-size" alt="amazon" />
          </HeaderLogos>
        </PresentationInfo>
        <PresentationNumbers>
            {/* numbers for users */}
            <div><span className="numbers">1,865</span>{t("presentation.numbers.users", {ns: "homePage"})}</div>
            {/* numbers for downloads */}
            <div><span className="numbers">2,250</span>{t("presentation.numbers.downloads", {ns: "homePage"})}</div>
            {/* numbers for likes */}
            <div><span className="numbers">1,590</span>{t("presentation.numbers.likes", {ns: "homePage"})}</div>
            {/* numbers for 5 star rating */}
            <div><span className="numbers">1,950</span>{t("presentation.numbers.rating", {ns: "homePage"})}</div>
        </PresentationNumbers>
        {/* presentation ends here */}
      </PresentationHeader>
      
      <BackgroundImage>
        {/* about section */}
        <AboutSection>
          {/* title */}
          <h2>{t("about.title.firstPart", {ns: "homePage"})}<strong>{t("about.title.strongText", {ns: "homePage"})}</strong>{t("about.title.lastPart", {ns: "homePage"})}</h2>
          {/* subtitle */}
          <span className="subtitle">{t("about.subtitle", {ns: "homePage"})}</span>
          <img className="subtitle-line" src={subtitleLine} alt="gradient" />
          <AboutCards>
            <AboutCard className="blue">
              <div className="top">
                <img className="background" src={aboutCardBg} alt="background" />
                <div className="icon-circle">
                  <img className="icon" src={searchJobIcon} alt="search job" />
                </div>
              </div>
              <div className="content">
                {/* search a job - card title */}
                <h3>{t("about.cards.titles.searchJob", {ns: "homePage"})}</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, porro dolorem accusamus sapiente, laborum est cumque, excepturi ratione quidem quia magnam beatae inventore expedita nisi.</p>
              </div>
              <div className="bottom-line" />
            </AboutCard>
            <AboutCard className="middle pink">
              <div className="top">
                <img className="background" src={aboutCardBg} alt="background" />
                <div className="icon-circle">
                  <img className="icon" src={fullyFunctionalIcon} alt="gears" />
                </div>
              </div>
              <div className="content">
                {/* fully functional - card title */}
                <h3>{t("about.cards.titles.functional", {ns: "homePage"})}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint eos fuga fugiat explicabo, quia sed libero, repudiandae ipsum placeat labore magnam necessitatibus quis dicta.</p>
              </div>
              <div className="bottom-line" />
            </AboutCard>
            <AboutCard className="orange">
              <div className="top">
                <img className="background" src={aboutCardBg} alt="background" />
                <div className="icon-circle">
                  <img className="icon" src={liveChatIcon} alt="live chat" />
                </div>
              </div>
              <div className="content">
                {/* live chat - card title */}
                <h3>{t("about.cards.titles.liveChat", {ns: "homePage"})}</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, veritatis culpa? Nesciunt incidunt nisi vitae qui corporis consequatur, illum tempore temporibus, dolorum delectus, esse iste?</p>
              </div>
              <div className="bottom-line" />
            </AboutCard>
          </AboutCards>
        </AboutSection>
        {/* about section ends here */}

        <Footer>
          <div className="top">
            <div className="image-box">
              <img src={footerSmartphone} alt="smartphone" />
            </div>
            <div className="text-box">
              {/* footer title */}
              <h2><strong>{t("footer.title.strongText", {ns: "homePage"})}</strong>{t("footer.title.lastPart", {ns: "homePage"})}</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, cum quam perspiciatis expedita dolorum suscipit doloremque nulla id error, quod distinctio impedit sint. Nulla, voluptatum?</p>
              <Button text={t("footer.button", {ns: "homePage"})} onClick={undefined} />
            </div>
          </div>
          <img className="footer-image" src={footerImg} alt="handshake"/>
        </Footer>
      </BackgroundImage>

    </Wrapper>
  )
}

export default HomePage;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: absolute;
  top: 28vh;
`

const PresentationHeader = styled.div`
  
`

const PresentationInfo = styled.div`
  position: relative;
  left: 22.5%;
  width: 25%;

  h1 {
    font-weight: 400;
    font-size: 2.5rem;

    strong {
      font-weight: 900;
    }
  }

  p {
    margin: 2rem 0px;
  }

  // ========= MEDIA QUERIES - PresentationInfo ============
  @media (max-width: 1480px) {
    h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 1280px) {
    left: 21%;

    h1 {
      font-size: 1.5rem;
    }

    p {
      margin: 1rem 0px;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 1100px) {
    position: relative;
    left: 0;
    top: 0;
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
`

const HeaderLogos = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 3rem;

  img {
    &.set-size {
      width: 30px;
    }
  }

  // ========= MEDIA QUERIES - HeaderLogos ============
  @media (max-width: 1100px) {
    justify-content: center;
  }

  @media (max-width: 874px) {
    gap: 1rem;

    img {
      width: 20px;
    }
  }
`

const PresentationNumbers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto;
  border-bottom: 1px solid ${COLOR_GREY_LIGHT};
  padding: 0px 3rem 1.5rem;
  gap: 2rem;

  div {
    margin-top: 1rem;

    span.numbers {
      font-size: 2rem;
    }
  }

  // ========= MEDIA QUERIES - PresentationNumbers ============
  @media (max-width: 1200px) {
    margin-top: 2rem;
    
    div {
      span.numbers {
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 400px) {
    width: 80%;
  }
`

const BackgroundImage = styled.div`
  background-image: url(${aboutBackground});
  background-size: cover;
`

const AboutSection = styled.section`
  h2 {
    font-size: 2.2rem;
    font-weight: 400;
    text-align: center;
    margin-top: 5rem;
  }

  span.subtitle {
    display: block;
    width: max-content;
    margin: 0 auto;
    color: ${COLOR_GREY};
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 1rem;
  }

  img.subtitle-line {
    display: block;
    width: 100px;
    margin: 1rem auto 0px;
    opacity: 0.6;
  }

  // ========= MEDIA QUERIES - AboutSection ============
  @media (max-width: 1480px) {
    h2 {
      font-size: 2rem;
    }
  }

  @media (max-width: 1280px) {
    h2 {
      width: 60%;
      font-size: 1.5rem;
      margin: 5rem auto 0;
    }

    span.subtitle {
      width: 60%;
      text-align: center;
      font-size: 0.8rem;
    }
  }
`

const AboutCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`

const AboutCard = styled.article`
  position: relative;
  width: 300px;
  border-radius: 10px;
  background-color: ${COLOR_WHITE};
  opacity: 0.9;

  div.top {
    position: relative;

    img.background {
      border-radius: 10px 10px 0px 0px;
      width: 100%;
    }

    div.icon-circle {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      padding: 1rem;
      border-radius: 50%;
      background-color: ${COLOR_WHITE};
      box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.05);
    }
  
    img.icon {
      width: 50px;
    }
  }

  div.content {
    text-align: center;
    padding: 1rem 2rem 3rem;

    h3 {
      margin-bottom: 1rem;
      color: ${COLOR_BLACK};
    }

    p {
      font-size: 0.8rem;
      color: ${COLOR_GREY};
      line-height: 1.2rem;
      font-weight: bold;
    }
  }

  div.bottom-line {
    width: 80%;
    height: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    border-radius: 10px;
  }

  &.middle {
    margin-top: 2rem; // the middle card
  }

  &.blue {
    box-shadow: 0px 0px 10px 3px rgba(99,88,224,0.1);

    div.bottom-line {
      background-color: #6358E0;
    }
  }

  &.pink {
    box-shadow: 0px 0px 10px 3px rgba(175,69,248,0.1);

    div.bottom-line {
      background-color: #AF45F8;
    }
  }

  &.orange {
    box-shadow: 0px 0px 10px 3px rgba(254,161,70,0.1);

    div.bottom-line {
      background-color: #FEA146;
    }
  }

  // ========= MEDIA QUERIES - AboutCard ============
  @media (max-width: 1100px) {
    width: 60%;

    &.middle {
      margin-top: 0; // the middle card
    }
  }
`

const Footer = styled.div`
  width: 60%;
  margin: 0px auto;

  img.footer-image {
    display: block;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
  }

  div.top {
    display: flex;
    align-items: center;
  }

  div.image-box {
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    transform: translate(0, 20%);

    img {
      display: block;
    }
  }

  div.text-box {
    flex-basis: 50%;

    h2 {
      display: flex;
      flex-direction: column;
      font-weight: 400;
      font-size: 2.2rem;

      strong {
        font-weight: 900;
      }
    }

    p {
      font-size: 0.8rem;
      color: ${COLOR_GREY};
      line-height: 1.2rem;
      font-weight: bold;
      margin: 1rem 0px;
    }
  }

  // ========= MEDIA QUERIES - Footer ============
  @media (max-width: 1480px) {
    div.image-box {
      img {
        width: 50%;
      }
    }

    div.text-box { 
      h2 {
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 1280px) {
    div.text-box {
      h2 {
        font-size: 1.5rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 1100px) {
    div.top {
      margin-top: 5rem;
    }

    div.text-box {
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      h2 {
        text-align: center;
      }
      p {
        text-align: center;
      }
      button {
        display: flex;
        justify-self: center;
        margin-bottom: 1rem;
      }
    }

    div.image-box {
      flex-basis: 0%;
      img {
        display: none;
      }
    }
  }
`