import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { footerElements, footerSocialsElements } from "../constants/cts_footer";
import { getPageUrl } from "../locales/i18n";
import { useTranslation } from "react-i18next";
import { GREY_DARK, WHITE } from "../constants/cts_colors";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {/* LINKS */}
      <div>
        {footerElements.map((element, key) => {
          return (
            <StyledNavLink
              to={getPageUrl("")}
              className={({ isActive }) => (isActive ? "active" : "")}
              key={key}
            >
              {t(`elements.${element.name}`, { ns: "footer" })}
            </StyledNavLink>
          );
        })}
      </div>
      {/* SOCIALS MEDIAS */}
      <div>
        {footerSocialsElements.map((social, key) => {
          if (social.title === "Facebook")
            return (
              <SocialMediaLink href={social.link} key={key}>
                <FaFacebook size={24} />
              </SocialMediaLink>
            );
          if (social.title === "X")
            return (
              <SocialMediaLink href={social.link} key={key}>
                <FaTwitter size={24} />
              </SocialMediaLink>
            );
          if (social.title === "Instagram")
            return (
              <SocialMediaLink href={social.link} key={key}>
                <FaInstagram size={24} />
              </SocialMediaLink>
            );
          if (social.title === "Tik Tok")
            return (
              <SocialMediaLink href={social.link} key={key}>
                <FaTiktok size={24} />
              </SocialMediaLink>
            );
        })}
      </div>
    </Wrapper>
  );
};

export default Footer;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  background-color: ${WHITE};
  padding: 64px 32px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  // ========= MEDIA QUERIES - Wrapper ============
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 64px;

    div {
      flex-direction: row;
      justify-content: center;
    }
  }

  @media (max-width: 745px) {
    flex-direction: column;
    gap: 64px;

    div {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${GREY_DARK};
  text-underline-offset: 0.15em;
  text-decoration: underline 0.1em rgba(0, 0, 0, 0);
  transition: all 250ms;
  font-size: 14px;

  :hover {
    text-decoration-color: rgba(0, 0, 0, 1);
  }

  &.active {
    // Ici, définir un style lorsque le lien est actif
  }
`;

const SocialMediaLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${GREY_DARK};
`;
