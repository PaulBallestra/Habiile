import React from "react";
import styled from "styled-components";

const Button = ({text}: {text : string}) => {
  return (
    <Wrapper>
      <button type="submit">{text}</button>
    </Wrapper>
  )
}

export default Button;

const Wrapper = styled.div`
  button {
    cursor: pointer;
    font-weight: Medium;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #448bff;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: .875rem;
    line-height: 1.4285714286;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
`
