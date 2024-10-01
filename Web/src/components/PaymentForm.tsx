import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import {PaymentElement} from '@stripe/react-stripe-js';
import { COLOR_WHITE } from "../constants/cts_colors";
import { useTranslation } from "react-i18next";
import Button from "./Button";

const PaymentForm = ({_setStripeClientSecret} : {_setStripeClientSecret : Dispatch<SetStateAction<string>>}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null)

  // Detect click outside of the 'more' button to close the associated modal
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref.current && !(ref.current.contains(e.target)))
        _setStripeClientSecret('')
    }

    document.addEventListener("click", checkIfClickedOutside)
    return () => document.removeEventListener("click", checkIfClickedOutside)
  }, [ref])

  return (
    <Wrapper>
      <span ref={ref}>
        <form>
          <PaymentElement />
          <Button 
            text={t("payButton", {ns: "paymentForm"}) + " 10 €"}
            onClick={() => {}}
          />
        </form>
      </span>
    </Wrapper>
  )
}

export default PaymentForm;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 30px;
  border-radius: 12px;
  background-color: ${COLOR_WHITE};
  z-index: 100 !important;

  form {
    position: relative;

    button {
      position: relative;
      margin-top: 40px;
      margin-left: 50%;
      transform: translate(-50%, 0%);  
    }
  }
`