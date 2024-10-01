import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { footerElements } from "../constants/cts_footer";
import { getPageUrl } from "../locales/i18n";
import { useTranslation } from "react-i18next";

/**
 * This component is used to define and design the footer elements such as contacts, adresse or many other informations/internal links
 * It loops through a footerElements array object defined as  :
 * ````
 *  [
      { 
        name: string, 
        to: string
      },
      ...
  ] 
 * ````
 * to render elements
 */

  const Footer = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {
        footerElements.map((element) => {
          return (
            <StyledNavLink
              to={getPageUrl(element.to)}
              className={({ isActive }) => (isActive ? 'active' : '')}
              key={footerElements.indexOf(element)}
            >
              {t(`elements.${element.name}`, {ns: "footer"})}
            </StyledNavLink>
          )
        })
      }
    </Wrapper>
  )
}

export default Footer;


/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`               // Ici, définir le style globale du header (hauteur, largeur, couleur de fond, font ....)

`

const StyledNavLink = styled(NavLink)`

  :hover {                                // Ici, définir un style lorsque le lien est survolé

  }

  &.active {                              // Ici, définir un style lorsque le lien est actif

  }
`
