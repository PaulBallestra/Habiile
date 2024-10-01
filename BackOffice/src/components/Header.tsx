import React, { ChangeEvent, useState , useEffect, useRef} from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { headerElements, logo } from "../constants/cts_header";
import { useTranslation } from "react-i18next";
import { languages } from "../constants/cts_languages";
import { getPageUrl } from "../locales/i18n";
import PATH from "../constants/cts_routes";
import { COLOR_ACTIVE_LINK, COLOR_BACKGROUND_NAVBAR, COLOR_BLACK, COLOR_BLUE_MORE, COLOR_BUTTON, COLOR_TEXT, COLOR_WHITE } from "../constants/cts_colors";
import { useAuthentication } from "../common/contexts/authenticationContext";

const Header = () => {
  const { t } = useTranslation();
  const { user } = useAuthentication();
  const [ selectedLanguage, _setSelectedLanguage ] = useState<string>(getPageUrl().includes('fr') ? "fr" : "en") 
  const [moreButton, _setMoreButton] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (ref.current && !(ref.current.contains(e.target)))
        _setMoreButton(false)
    }

    document.addEventListener("click", checkIfClickedOutside)
    return () => document.removeEventListener("click", checkIfClickedOutside)
  }, [ref]) 

  return (
    <Wrapper>
      {
        <div className="brand">
          <StyledNavLink
            to={getPageUrl(PATH.home)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={logo}/>
          </StyledNavLink>
        </div>
      }
      {
        headerElements.map((element) => {
          return (
            <div className="element" key={headerElements.indexOf(element)}>
              <i className={element.logo}></i>
              <StyledNavLink
                to={getPageUrl(element.to)}
                className={({ isActive }) => (isActive ? "active" : "")}
                key={headerElements.indexOf(element)}
              >
                {t(`elements.${element.name}`, {ns: "header"})}
              </StyledNavLink>
            </div>
          );
        })
      }
      {
        user && // check if user connected
        (
          <div className="element">
            <StyledNavLink to={getPageUrl(PATH.account)}>
              {t("accountLink", {ns: "header"})}
            </StyledNavLink>
          </div>
        )
      }
      {/* change language */}
      <Language>
        {
          <span ref={ref}>
            <button onClick={() => _setMoreButton(true)}>{t(`language`, {ns: "header"})} : {selectedLanguage}</button>
          </span>
        }
        {
          moreButton &&
          <span className="options">
            {
              languages.map((language) => (
                <button onClick={() => _setSelectedLanguage(language.code)}>
                  <Link key={language.code} to={getPageUrl(null, language.code)} className='link'>
                    {language.nativeName}
                  </Link>
                </button>    
              ))
            }
          </span>
        }
      </Language>
    </Wrapper>
  );
};

export default Header;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_BACKGROUND_NAVBAR};
  min-width: 216px;
  margin: 0;

  .brand {
    float: none;
    margin-right: 0;
    font-size: 18px;
    line-height: 1;
  }

  .element {
    display: flex;
    align-items: center;
    padding: 0 16px;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    i {
      font-size: 16px;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-wrap: nowrap;
  text-decoration: none;
  color: ${COLOR_TEXT};
  cursor: pointer;
  margin: 0 16px;
  padding: 11px 0;
  line-height: 18px;

  &:hover {
    color: ${COLOR_BLACK};
  }

  &.active {
    color: ${COLOR_ACTIVE_LINK}!important;
  }
`;

const Language = styled.div`
  margin-top: auto;
  position: relative;

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
    font-size: 18px;
    color: black;
  }


  .options {
    max-height: 300px;
    overflow: auto;
    background-color: ${COLOR_BLUE_MORE} ;
    position: absolute;
    bottom: 25px;
    color: white;
    right: -70px;
    width: 150px;
    z-index: 1;
    .link {
      color: ${COLOR_WHITE};
      text-decoration: none;
    }
    button {
      color: white;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      width: 100%;
      padding: 12px 24px;
    }
    button:hover {
      background-color: ${COLOR_BUTTON};
    }
  }
`