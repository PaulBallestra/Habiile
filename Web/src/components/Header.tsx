import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { headerElements } from "../constants/cts_header";
import { useTranslation } from "react-i18next";
import { getPageUrl } from "../locales/i18n";
import PATH from "../constants/cts_routes";
import { useAuthentication } from "../common/contexts/authenticationContext";
import logo from "../assets/images/logo_colored.png";
import { COLOR_BLACK, COLOR_SPECIAL, COLOR_WHITE } from "../constants/cts_colors";
import { AiOutlineMenu } from "react-icons/ai";

/**
 * This component is used to define and design the header elements such as Home, Login/Logout or many other internal links
 * It loops through a headerElements array object defined as  :
 * ````
 *  [
      { 
        name: string, 
        to: string
      },
      ...
  ] 
 * ````
 * to render elements. Links rendered depend on user state (logged in or logged out)
 */

const Header = () => {
  const { user } = useAuthentication();
  const [ smallHeader, _setSmallHeader ] = useState<boolean>(false);
  const { t } = useTranslation();
  const [ showElements, _setShowElements ] = useState<boolean>(false);

  // if user scrolled, set the small header with changed background
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
      _setSmallHeader(window.pageYOffset > 1)
      );
    }
  }, []);

  return (
    <Wrapper className={smallHeader ? "small" : ""}>
      <LogoContainer>
        <Link to={getPageUrl(PATH.home)}>
          <Logo src={logo} alt="logo" />
        </Link>
      </LogoContainer>
      <ElementsContainer className={showElements ? "show" : ""}> {/* this condition is generally for responsive, when user clicks toggle menu btn */}
        {
          headerElements.map((element) => {
            return (
              <StyledNavLink
                to={getPageUrl(element.to)}
                className={({ isActive }) => (isActive ? "active" : "")}
                key={headerElements.indexOf(element)}
              >
                {t(`elements.${element.name}`, {ns: "header"})}
              </StyledNavLink>
            );
          })
        }
        { 
          user ? // check if user connected
          (
            <>
              <StyledNavLink to={getPageUrl(PATH.items)}>
                {t("itemsLink", {ns: "header"})}
              </StyledNavLink>
              <StyledNavLink to={getPageUrl(PATH.account)}>
                {t("accountLink", {ns: "header"})}
              </StyledNavLink>
            </>
          ) : (
            <StyledNavLink to={getPageUrl(PATH.login)}>
              {t("loginLink", {ns: "header"})}
            </StyledNavLink>
          ) 
        }
      </ElementsContainer>

      {/* toggle menu btn */}
      <AiOutlineMenu className="toggle-menu" onClick={() => _setShowElements(!showElements)} /> {/* toggle the value (set the opposite value of the current value) */}
    </Wrapper>
  );
};

export default Header;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 100;
  padding: 10px;
  transition: 0.25s ease-out;

  // if user scrolled, set the small header with changed background
  &.small {
    background-color: ${COLOR_WHITE};

    // logo
    img {
      width: 60px;
      transition: width 0.25s ease-out;
    }

    // links
    a {
      color: ${COLOR_BLACK};
      transition: color 0.25s ease-out;

      :after {
        background-color: ${COLOR_SPECIAL};
      }
    }

    // separator
    span {
      color: ${COLOR_BLACK};
      transition: color 0.25s ease-out;
    }
  }

  /* toggle menu btn */
  svg.toggle-menu {
    display: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translate(0, -50%);
    cursor: pointer;

    :hover {
      fill: ${COLOR_SPECIAL};
      transition: fill 0.25s ease-out;
    }

    // ========= MEDIA QUERIES - toggle menu btn ============
    @media (max-width: 1100px) {
      display: block;
    }
  }

  // ========= MEDIA QUERIES - Wrapper / header ============
  @media (max-width: 1100px) {
    background-color: ${COLOR_WHITE};
  }
`;

const LogoContainer = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: center;
`

const Logo = styled.img`
  width: 100px;

  // ========= MEDIA QUERIES - Logo ============
  @media (max-width: 1100px) {
    width: 60px;
  }
`

const ElementsContainer = styled.div`
  flex-basis: 50%;
  display: flex;
  align-items: center;
  gap: 3rem;

  // ========= MEDIA QUERIES - ElementsContainer ============
  @media (max-width: 1100px) {
    position: absolute;
    top: 85px;
    right: -100%;
    background-color: ${COLOR_WHITE};
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0px 7px 11px 1px rgba(0,0,0,0.09);
    -webkit-box-shadow: 0px 7px 11px 1px rgba(0,0,0,0.09);
    -moz-box-shadow: 0px 7px 11px 1px rgba(0,0,0,0.09);
    transition: right 0.25s ease-out;

    &.show {
      right: 0;
    }
  }
`

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  color: ${COLOR_WHITE};

  // underline animation
  :after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${COLOR_WHITE};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  :hover {
    :after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  &.active {
    :after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  // ========= MEDIA QUERIES - StyledNavLink ============
  @media (max-width: 1100px) {
    color: ${COLOR_BLACK};
    font-size: 14px;
    :after {
      background-color: ${COLOR_SPECIAL};
    }
  }
`

const ElementSeparator = styled.span`
  color: ${COLOR_WHITE};

  // ========= MEDIA QUERIES - ElementSeparator ============
  @media (max-width: 1100px) {
    color: ${COLOR_BLACK};
  }
`
