import React, { Dispatch, FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEnvelope } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import styled from "styled-components";
import Form from "../../components/Form";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";

const DeleteAccountForm = ({email, password, _setEmail, _setPassword, onHandleSubmit}:
  {
    email: string,
    password: string,
    _setEmail: Dispatch<React.SetStateAction<string>>,
    _setPassword: Dispatch<React.SetStateAction<string>>,
    onHandleSubmit: FormEventHandler<HTMLFormElement>,
  }
) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Form
        onHandleSubmit={onHandleSubmit} 
        submitBtn={<AiOutlineDelete />}
      >
        {/* email */}
        <label htmlFor="deleteAccountFormEmail">{t("deleteAccountForm.labels.email", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input
              type="email"
              id="deleteAccountFormEmail"
              name="deleteAccountFormEmail"
              placeholder={"" + t("deleteAccountForm.placeholders.email", {ns: "accountPage"})}
              value={email ? email : ""}
              onChange={(e) => _setEmail(e.target.value)}
              required
            />
            <BiEnvelope />
          </div>
        {/* password */}
        <label htmlFor="deleteAccountFormPassword">{t("deleteAccountForm.labels.password", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input
              type="password"
              id="deleteAccountFormPassword"
              name="deleteAccountFormPassword"
              placeholder={"" + t("deleteAccountForm.placeholders.password", {ns: "accountPage"})}
              value = {password ? password : ""}
              onChange={(e) => _setPassword(e.target.value)}
              required
            />
            <BsKey />
          </div>
      </Form>
    </Wrapper>
  )
}

export default DeleteAccountForm;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

