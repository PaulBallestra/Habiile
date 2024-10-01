import React, { FormEventHandler, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_WHITE } from "../constants/cts_colors";
import { FORM_STYLE_FOOTER, FORM_STYLE_INFO_MESSAGES, FORM_STYLE_INPUT_WITH_ICON, FORM_STYLE_SUBMIT_BTN, FORM_STYLE_TEXTAREA_WITH_ICON } from "../constants/cts_form";
import { GRADIENT_TO_RIGHT } from "../constants/cts_gradients";

const Form = ({id, children, onHandleSubmit, submitBtn}: {id?: string, children: ReactNode, onHandleSubmit: FormEventHandler<HTMLFormElement>, submitBtn: ReactNode}) => {
  const { t } = useTranslation();

  return (
    <FormContainer id={id} onSubmit={onHandleSubmit}>

      <FormInputs>
        {children}
      </FormInputs>

      {/* form footer */}
      <div className={FORM_STYLE_FOOTER}>
        {/* form info messages */}
        <div className={FORM_STYLE_INFO_MESSAGES}></div>

        {/* submit btn */}
        <button className={FORM_STYLE_SUBMIT_BTN} type="submit">{submitBtn}</button>
      </div>
    </FormContainer>
  )
}

export default Form;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const FormContainer = styled.form`
  width: 100%;
  background-color: ${COLOR_WHITE};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px 2px rgba(180, 70, 255, 0.1);

  /* form footer */
  button.${FORM_STYLE_SUBMIT_BTN} {
    display: block;
    width: 65px;
    height: 65px;
    margin: 0px auto;
    background: ${GRADIENT_TO_RIGHT};
    border: none;
    border-radius: 50%;
    border: 5px solid ${COLOR_WHITE};
    box-shadow: 0px 5px 15px 2px rgba(180, 70, 255, 0.2);
    transform: translate(0, 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 30px;
      height: auto;
      stroke: ${COLOR_WHITE};
      fill: ${COLOR_WHITE};
      
      path {
        stroke: ${COLOR_WHITE};
      }
    }
  }
`

const FormInputs = styled.div`

  label {
    display: block;
    margin-top: 10px;
    color: ${COLOR_GREY};
    font-size: 12px,
  }

  /* input box */
  div.${FORM_STYLE_INPUT_WITH_ICON} {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${COLOR_GREY_LIGHT};

    input {
      width: 100%;
      color: ${COLOR_BLACK};
      border: none;
      padding: 10px 0px;

      // Removing input background colour for Chrome autocomplete
      &:-webkit-autofill,
      &:-webkit-autofill:hover, 
      &:-webkit-autofill:focus, 
      &:-webkit-autofill:active{
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          box-shadow: 0 0 0 30px white inset !important;
      }

      &:focus {
        outline: none;
      }
    }

    svg {
      width: 15px;
      fill: ${COLOR_GREY};
    }
  }

  /* textarea box */
  div.${FORM_STYLE_TEXTAREA_WITH_ICON} {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid ${COLOR_GREY_LIGHT};

    textarea {
      width: 100%;
      height: 100px;
      color: ${COLOR_BLACK};
      border: none;
      padding: 10px 0px;
      resize: none;
      background: transparent;

      &:focus {
        outline: none;
      }
    }

    svg {
      width: 15px;
      fill: ${COLOR_GREY};
    }
  }
`