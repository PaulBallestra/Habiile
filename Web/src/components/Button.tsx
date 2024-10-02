import React from "react";
import styled from "styled-components";
import {
  BLUE,
  COLOR_GRADIENT_1,
  COLOR_GRADIENT_2,
  COLOR_WHITE,
  WHITE,
} from "../constants/cts_colors";
import { GRADIENT_TO_RIGHT } from "../constants/cts_gradients";

const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return <ButtonStyles onClick={onClick}>{text}</ButtonStyles>;
};

export default Button;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const ButtonStyles = styled.button`
  font-size: 18px;
  font-weight: bold;
  border-radius: 1000px;
  padding: 16px 24px;
  background-color: ${BLUE};
  color: ${WHITE};
  cursor: pointer;
  border: 1px solid ${BLUE};
  transition: all 250ms;
  box-shadow: 0px 7px 11px 1px rgba(7, 5, 5, 0.09);
  -webkit-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.09);

  :hover {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;
