import React, {  Dispatch, SetStateAction ,ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import { PWD_CHANGED } from "../../constants/cts_alerts";
import { COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";

const ChangePassword = ({_setChangePassword} : {_setChangePassword : Dispatch<SetStateAction<boolean>>}) => {
  const { t } = useTranslation();
  const { onChangePassword } = useUser();
  const [ formValues, setFormValues ] = useState({
    password: "",
    repeatPassword: "",
  });
  const { onGetCurrentUser } = useUser();
  const [ userId, _setUserId ] = useState(-1);

   useEffect(() => {
    onGetCurrentUser()
      .then((response:any) => _setUserId(response.id))
      .catch ((error:any) => alert(error))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onChangePassword({userId , newPassword: formValues.password, repeatPassword: formValues.repeatPassword})
      .then(() => {
        alert(PWD_CHANGED)
        _setChangePassword(false)
      })
      .catch((error:any) => {
        console.log("error=", error)
        alert(error)
      });
  }

  return (
      <form id='login' onSubmit={handleSubmit}>
        <Wrapper>
          <FormInputs>
            <span className="elem">
              <label htmlFor='password'>{t("form.labels.password", {ns: "changePasswordPage"})}</label><br/>
              <input 
                type='password' 
                id='password' 
                name='password' 
                placeholder={"" + t("form.placeholders.password", {ns: "changePasswordPage"})}
                minLength={6}
                value={formValues.password ? formValues.password : ""}
                onChange={handleChange} 
                required />
              </span>
            <span className="elem">
              <label htmlFor='repeatPassword'>{t("form.labels.repeatPassword", {ns: "changePasswordPage"})}</label><br/>
              <input 
                type='password' 
                id='repeatPassword' 
                name='repeatPassword' 
                placeholder={"" + t("form.placeholders.repeatPassword", {ns: "changePasswordPage"})}
                minLength={6}
                value={formValues.repeatPassword ? formValues.repeatPassword : ""}
                onChange={handleChange} required />
            </span>    
          </FormInputs>
          <FormFooter>
            <button onClick={() => _setChangePassword(false)} className="back">{"" + t("back", {ns: "editAccountPage"})}</button>
            <button type='submit' form='login'>{t("form.submitBtn", {ns: "changePasswordPage"})}</button>
          </FormFooter>
      </Wrapper>
    </form>
  )
}

export default ChangePassword;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormHeader = styled.div`

`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .elem {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;

    input {
      border: none;
      padding: 4px 0;
      color: ${COLOR_TEXT}
    }

    label {
      margin-right: 10px;
      text-align: left;
    }
  }
`

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const PasswordChangedInfo = styled.div`

`
