import React from "react";
import styled from "styled-components";
import { COLOR_GRADIENT_1, COLOR_GRADIENT_2, COLOR_WHITE } from "../constants/cts_colors";
import { GRADIENT_TO_RIGHT } from "../constants/cts_gradients";

const Button = ({text, onClick}: {text: string, onClick: (React.MouseEventHandler<HTMLButtonElement>) | undefined}) => {
  return (
    <ButtonStyles onClick={onClick}>{text}</ButtonStyles>
  )
}

export default Button;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const ButtonStyles = styled.button`
  padding: 0.7rem 1.4rem;
  font-size: 13px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: ${GRADIENT_TO_RIGHT};
  color: ${COLOR_WHITE};
  font-weight: bold;
`
