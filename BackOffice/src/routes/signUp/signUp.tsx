import React, { useState } from "react";
import styled from "styled-components";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import { useUser } from "../../common/contexts/userContext";
import { Link, Navigate } from "react-router-dom";
import PATH from "../../constants/cts_routes";
import { languages } from "../../constants/cts_languages";
import { Trans, useTranslation } from "react-i18next";
import { getPageUrl } from "../../locales/i18n";

const initialFormState = {
  firstName : "",
  lastName : "",
  email : "",
  phoneNumber : "",
  password : "",
  repeatPassword : "",
}

const SignUpPage = () => {
  const { i18n, t } = useTranslation();
  const { onCreateAccount } = useUser();
  const { onLogin } = useAuthentication();
  const [ formValues, _setFormValues ] = useState(initialFormState);
  const [ redirectToHome, _setRedirectToHome ] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAccount({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
      repeatPassword: formValues.repeatPassword
    })
    .then(() => {
      onLogin({email: formValues.email, password: formValues.password})
        .then(() => {
          _setRedirectToHome(true)
        });
    })
    .catch((error : any) => {
      console.error("error:", error)
      alert(error)
    }
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    _setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  // if user connected, redirect to home
  if(redirectToHome) {
    return <Navigate to={getPageUrl(PATH.home)} />
  }

  return (
    <Wrapper>
      {/* change language */}
      {languages.map((language) => (
        <Link key={language.code} to={getPageUrl(null, language.code)}>
          {language.nativeName}
        </Link>
      ))}
      <Form onSubmit={handleSubmit}>
        <FormHeader>
          <h1>{t("mainTitle", {ns: "signupPage"})}</h1>
        </FormHeader>
        <FormInputs>
          {/* last name */}
          <label htmlFor="lastName">{t("form.labels.lastName", {ns: "signupPage"})}</label><br/>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder={"" + t("form.placeholders.lastName", {ns: "signupPage"})}
            required
            onChange={handleChange}
          /><br/>
          {/* first name */}
          <label htmlFor="firstName">{t("form.labels.firstName", {ns: "signupPage"})}</label><br/>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder={"" + t("form.placeholders.firstName", {ns: "signupPage"})}
            required
            onChange={handleChange}
          /><br/>
          {/* email */}
          <label htmlFor="email">{t("form.labels.email", {ns: "signupPage"})}</label><br/>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={"" + t("form.placeholders.email", {ns: "signupPage"})}
            required
            onChange={handleChange}
          /><br/>
          {/* phone number */}
          <label htmlFor="phoneNumber">{t("form.labels.phoneNumber", {ns: "signupPage"})}</label><br/>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder={"" + t("form.placeholders.phoneNumber", {ns: "signupPage"})}
            onChange={handleChange}
          /><br/>
          {/* password  */}
          <label htmlFor="password">{t("form.labels.password", {ns: "signupPage"})}</label><br/>
          <input
            type="password"
            id="password"
            name="password"
            placeholder={"" + t("form.placeholders.password", {ns: "signupPage"})}
            minLength={6}
            required
            onChange={handleChange}
            autoComplete="on"
          /><br/>
          {/* repeat password */}
          <label htmlFor="repeatPassword">{t("form.labels.repeatPassword", {ns: "signupPage"})}</label><br/>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder={"" + t("form.placeholders.repeatPassword", {ns: "signupPage"})}
            minLength={6}
            required
            onChange={handleChange}
            autoComplete="on"
          /><br/>
        </FormInputs>
        <FormFooter>
          <button type="submit">{t("form.submitBtn", {ns: "signupPage"})}</button><br/>
          <Link to={getPageUrl(PATH.login)}>
            <Trans i18nKey={"signupPage.form.links.navigateToLogIn"} />
          </Link>
        </FormFooter>
      </Form>
    </Wrapper>
  )
}

export default SignUpPage;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const Form = styled.form`

`

const FormHeader = styled.div`

`

const FormInputs = styled.div`

`

const FormFooter = styled.div`

`

const EmailSent = styled.div`

`