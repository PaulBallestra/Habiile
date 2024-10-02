import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { headerElements } from "../constants/cts_header";
import { useTranslation } from "react-i18next";
import { getPageUrl } from "../locales/i18n";
import PATH from "../constants/cts_routes";
import { useAuthentication } from "../common/contexts/authenticationContext";
import {
  COLOR_BLACK,
  COLOR_SPECIAL,
  COLOR_WHITE,
  GREY_CLEAR,
  GREY_DARK,
  WHITE,
} from "../constants/cts_colors";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const { user } = useAuthentication();
  const [smallHeader, _setSmallHeader] = useState<boolean>(false);
  const { t } = useTranslation();
  const [showElements, _setShowElements] = useState<boolean>(false);

  // if user scrolled, set the small header with changed background
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", () =>
  //       _setSmallHeader(window.pageYOffset > 1)
  //     );
  //   }
  // }, []);

  return (
    <Wrapper className={smallHeader ? "small" : ""}>
      <LogoContainer>
        <Link to={getPageUrl(PATH.home)}>
          <Logo
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
            alt="logo"
          />
        </Link>
      </LogoContainer>
      <ElementsContainer className={showElements ? "show" : ""}>
        {" "}
        {/* this condition is generally for responsive, when user clicks toggle menu btn */}
        {headerElements.map((element) => {
          return (
            <StyledNavLink
              to={getPageUrl(element.to)}
              className={({ isActive }) => (isActive ? "active" : "")}
              key={headerElements.indexOf(element)}
            >
              {t(`elements.${element.name}`, { ns: "header" })}
            </StyledNavLink>
          );
        })}
        {user ? ( // check if user connected
          <>
            <StyledNavLink to={getPageUrl(PATH.items)}>
              {t("itemsLink", { ns: "header" })}
            </StyledNavLink>
            <StyledNavLink to={getPageUrl(PATH.account)}>
              {t("accountLink", { ns: "header" })}
            </StyledNavLink>
          </>
        ) : (
          <StyledNavLink to={getPageUrl(PATH.login)}>
            {t("loginLink", { ns: "header" })}
          </StyledNavLink>
        )}
      </ElementsContainer>

      {/* toggle menu btn */}
      <AiOutlineMenu
        className="toggle-menu"
        onClick={() => _setShowElements(!showElements)}
        size={24}
      />
      {/* toggle the value (set the opposite value of the current value) */}
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
  justify-content: space-between;
  z-index: 100;
  padding: 8px 24px;
  transition: all 0.25s ease-out;
  border-bottom: 1px solid ${GREY_CLEAR};
  background: ${WHITE};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  // if user scrolled, set the small header with changed background
  &.small {
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
    @media (max-width: 745px) {
      display: block;
    }
  }

  // ========= MEDIA QUERIES - Wrapper / header ============
  @media (max-width: 1100px) {
    background-color: ${COLOR_WHITE};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  width: 100px;
`;

const ElementsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  // ========= MEDIA QUERIES - ElementsContainer ============
  @media (max-width: 745px) {
    position: absolute;
    top: 0;
    z-index: 100;
    right: -100%;
    height: 100vh;
    background-color: ${COLOR_WHITE};
    flex-direction: column;
    justify-content: center;
    padding: 0px 24px;
    box-shadow: 0px 7px 11px 1px rgba(7, 5, 5, 0.09);
    -webkit-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
    transition: right 0.25s ease-out;

    &.show {
      right: 0;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  font-size: 16px;
  color: ${GREY_DARK};
  text-underline-offset: 0.15em;
  text-decoration: underline 0.1em rgba(0, 0, 0, 0);
  transition: all 250ms;

  :hover {
    text-decoration-color: rgba(0, 0, 0, 1);
  }

  // ========= MEDIA QUERIES - StyledNavLink ============
  @media (max-width: 745px) {
    color: ${COLOR_BLACK};
    font-size: 14px;
    :after {
      background-color: ${COLOR_SPECIAL};
    }
  }
`;
