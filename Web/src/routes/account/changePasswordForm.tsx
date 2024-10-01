import React, { Dispatch, FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { BsKey } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import styled from "styled-components";
import Form from "../../components/Form";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";

const ChangePasswordForm = ({newPassword, repeatNewPassword, _setNewPassword, _setRepeatNewPassword, onHandleSubmit}: 
  {
    newPassword: string,
    repeatNewPassword: string, 
    _setNewPassword: Dispatch<React.SetStateAction<string>>, 
    _setRepeatNewPassword: Dispatch<React.SetStateAction<string>>, 
    onHandleSubmit: FormEventHandler<HTMLFormElement>,
  }
) => {
  const { t } = useTranslation();
  
  return (
    <Wrapper>
      <Form
        onHandleSubmit={onHandleSubmit}
        submitBtn={<FiEdit2 />}
      >
        <label htmlFor='changePasswordFormNewPassword'>{t("changePasswordForm.form.labels.password", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input 
              type='password' 
              id='changePasswordFormNewPassword' 
              name='changePasswordFormNewPassword' 
              placeholder={"" + t("changePasswordForm.form.placeholders.password", {ns: "accountPage"})}
              minLength={6}
              value={newPassword ? newPassword : ""}
              onChange={(e) => _setNewPassword(e.target.value)}
              required 
            />
            <BsKey />
          </div>
        <label htmlFor='changePasswordFormRepeatNewPassword'>{t("changePasswordForm.form.labels.repeatPassword", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input 
              type='password' 
              id='changePasswordFormRepeatNewPassword' 
              name='changePasswordFormRepeatNewPassword' 
              placeholder={"" + t("changePasswordForm.form.placeholders.repeatPassword", {ns: "accountPage"})}
              minLength={6}
              value={repeatNewPassword ? repeatNewPassword : ""}
              onChange={(e) => _setRepeatNewPassword(e.target.value)}
              required 
            />
            <BsKey />
          </div>
      </Form>
    </Wrapper>
  )
}

export default ChangePasswordForm;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`
