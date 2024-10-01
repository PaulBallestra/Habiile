import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import { PWD_CHANGED } from "../../constants/cts_alerts";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";

const ChangePassword = () => {
  const { t } = useTranslation();
  const { onChangePassword } = useUser();
  const [ formValues, setFormValues ] = useState({
    password: "",
    repeatPassword: "",
  });
  const { onGetCurrentUser } = useUser();
  const [ userId, _setUserId ] = useState(-1);
  const [ redirectToAccount, _setRedirectToAccount ] = useState(false);

   useEffect(() => {
    onGetCurrentUser()
      .then((response) => _setUserId(response.id))
      .catch (error => alert(error))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { password, repeatPassword} = formValues

    onChangePassword({userId , newPassword: password, repeatPassword: repeatPassword})
      .then(() => {
        alert(t(PWD_CHANGED, {ns: "alerts"}))
        _setRedirectToAccount(true)
      })
      .catch((err) => {
        alert(err)
      });
  }

  // if user changed the password redirect to account
  if(redirectToAccount) {
    return <Navigate to={getPageUrl(PATH.account)} />
  }

  return (
    <Wrapper>
      <FormHeader>
        <h1>{t("mainTitle", {ns: "changePasswordPage"})}</h1>
      </FormHeader>
      <Link to={getPageUrl(PATH.account)}>{t("redirectToAccountLink", {ns: "changePasswordPage"})}</Link>
      <FormInputs>
        <form id='login' onSubmit={handleSubmit}>
          <label htmlFor='password'>{t("form.labels.password", {ns: "changePasswordPage"})}</label><br/>
            <input 
              type='password' 
              id='password' 
              name='password' 
              placeholder={"" + t("form.placeholders.password", {ns: "changePasswordPage"})}
              minLength={6}
              value={formValues.password ? formValues.password : ""}
              onChange={handleChange} 
              required /><br/>
          <label htmlFor='repeatPassword'>{t("form.labels.repeatPassword", {ns: "changePasswordPage"})}</label><br/>
            <input 
              type='password' 
              id='repeatPassword' 
              name='repeatPassword' 
              placeholder={"" + t("form.placeholders.repeatPassword", {ns: "changePasswordPage"})}
              minLength={6}
              value={formValues.repeatPassword ? formValues.repeatPassword : ""}
              onChange={handleChange} required /><br/>          
        </form>
      </FormInputs>
      <FormFooter>
        <button type='submit' form='login'>{t("form.submitBtn", {ns: "changePasswordPage"})}</button>
      </FormFooter>
  </Wrapper>
  )
}

export default ChangePassword;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const FormHeader = styled.div`

`

const FormInputs = styled.div`

`

const FormFooter = styled.div`

`

const PasswordChangedInfo = styled.div`

`
