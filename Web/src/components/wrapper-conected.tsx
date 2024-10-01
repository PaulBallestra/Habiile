import React, { ChangeEvent, ReactNode, Dispatch, SetStateAction } from "react";
import styled from "styled-components"
import Header from "./Header";
import Footer from "./Footer";
import * as PropTypes from 'prop-types'
import { languages } from "../constants/cts_languages";
import { getPageUrl } from "../locales/i18n";
import { useNavigate } from "react-router-dom";
import { useApp } from "../common/contexts/appContext";
import { GRADIENT_TO_RIGHT } from "../constants/cts_gradients";
import { COLOR_WHITE } from "../constants/cts_colors";
import Wallpaper from "./Wallpaper";

/**
 * This component is used to encompass the Header, Footer and given children together
 */

const WrapperConnected = ({children } : 
  {children: ReactNode }) => {

  const { onSendLanguage } = useApp();
  const navigate = useNavigate();
  
  // when the language is selectd
  const handleSelectLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    onSendLanguage(lang) // send and change the language on api
      .then(() => navigate(getPageUrl(null, lang))) // set the language on front
      .catch((err) => alert(err))
  }

  return (
    <Wrapper>
      <Header/>
      <Container>
        {children}
      </Container>
      {/* change language (select) - bottom right of the screen */}
      <SelectLanguage onChange={(e) => handleSelectLanguage(e)}>
        <option>Change Language</option>
        {
          languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.code.toUpperCase()}
            </option>
          ))
        }
      </SelectLanguage>
    </Wrapper>
  );
};

export default WrapperConnected;

WrapperConnected.propTypes = {
  /** Children to render*/
  children: PropTypes.any.isRequired,
}

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: relative;
`

const Container = styled.div`

`

const SelectLanguage = styled.select`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: ${GRADIENT_TO_RIGHT}; 
  color: ${COLOR_WHITE};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  font-size: 13px;
  font-weight: bold;
`