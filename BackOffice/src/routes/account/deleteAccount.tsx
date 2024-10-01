import React, { Dispatch, SetStateAction, FormEvent, ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";
import { CONFIRM_DELETE_ACCOUNT } from "../../constants/cts_confirm_alerts";
import { ACCOUNT_DELETED } from "../../constants/cts_alerts";
import { useUser } from "../../common/contexts/userContext";

const deleteAccountFormInitialValues = {
  deleteAccountFormEmail: "",
  deleteAccountFormPassword: "",
}

const DeleteAccount = ( {_setDeleteAccountForm, _setRedirectToLogIn} : 
  { _setDeleteAccountForm: Dispatch<SetStateAction<boolean>>, _setRedirectToLogIn: Dispatch<SetStateAction<boolean>> } ) => {
  
  const { t } = useTranslation();
  const { onDeleteAccount } = useUser();
  const [ deleteAccountFormValues, _setDeleteAccountFormValues ] = useState(deleteAccountFormInitialValues);
  const { deleteAccountFormEmail, deleteAccountFormPassword } = deleteAccountFormValues;

  // handle change on delete account form
  const handleChangeDeleteAccountForm = (e: ChangeEvent<HTMLInputElement>) => {
    _setDeleteAccountFormValues({
      ...deleteAccountFormValues,
      [e.target.name]: e.target.value
    })
  }

  // delete account
  const handleDeleteAccount = (e: FormEvent) => {
    e.preventDefault();
    const confirmDelete = confirm(CONFIRM_DELETE_ACCOUNT);
    if(confirmDelete) {
      onDeleteAccount({
        email: deleteAccountFormEmail,
        password: deleteAccountFormPassword
      })
      .then(() => {
        alert(ACCOUNT_DELETED);
        _setRedirectToLogIn(true);
      })
      .catch((error:any) =>
        alert(error) 
      )
    }
  }

  return (
    <form>
      <Wrapper onSubmit={handleDeleteAccount}>
        <FormInputs>
          {/* email */}
          <span className="elem">
            <label htmlFor="deleteAccountFormEmail">{t("deleteAccountForm.labels.email", {ns: "accountPage"})}</label><br/>
            <input
              type="email"
              id="deleteAccountFormEmail"
              name="deleteAccountFormEmail"
              placeholder={"" + t("deleteAccountForm.placeholders.email", {ns: "accountPage"})}
              value={deleteAccountFormEmail ? deleteAccountFormEmail : ""}
              onChange={handleChangeDeleteAccountForm}
              required
            />
          </span>
          {/* password */}
          <span className="elem">
            <label htmlFor="deleteAccountFormPassword">{t("deleteAccountForm.labels.password", {ns: "accountPage"})}</label><br/>
            <input
              type="password"
              id="deleteAccountFormPassword"
              name="deleteAccountFormPassword"
              placeholder={"" + t("deleteAccountForm.placeholders.password", {ns: "accountPage"})}
              value = {deleteAccountFormPassword ? deleteAccountFormPassword : ""}
              onChange={handleChangeDeleteAccountForm}
              required
            />
          </span>
        </FormInputs>
        <FormFooter>
          <button type="button" onClick={() => _setDeleteAccountForm(false)} className="back">{t("deleteAccountForm.closeBtn", {ns: "accountPage"})}</button>
          <button type="submit">{t("deleteAccountForm.submitBtn", {ns: "accountPage"})}</button>
        </FormFooter>
      </Wrapper>
    </form>
  )
}

export default DeleteAccount

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .elem {
    margin: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
      border: none;
      padding: 4px 0;
      color: ${COLOR_TEXT};
    }

    label {
      margin-right: 10px;
      text-align: left;
    }
  }
`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px; 

  button {
    cursor: pointer;
    border: none;
    background-color: ${COLOR_WHITE};
    color: ${COLOR_TEXT};
    text-align: center;
    vertical-align: center;
    padding: 6px 10px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
    line-height: 1.5;
    border-radius: 4px;
  }

  button:hover {
    background-color: ${COLOR_TEXT};
    color: ${COLOR_WHITE}
  }

  .back {
    margin-right: 10px;
  }
`