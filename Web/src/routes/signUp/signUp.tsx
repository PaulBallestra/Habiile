import React, { useState } from "react";
import styled from "styled-components";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import { useUser } from "../../common/contexts/userContext";
import { Link, Navigate } from "react-router-dom";
import PATH from "../../constants/cts_routes";
import { useTranslation } from "react-i18next";
import { getPageUrl } from "../../locales/i18n";
import MainContainer from "../../components/MainContainer";
import Form from "../../components/Form";
import { BsArrowRight, BsKey, BsPhone } from "react-icons/bs";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { COLOR_SPECIAL } from "../../constants/cts_colors";

const initialFormState = {
  firstName : "",
  lastName : "",
  email : "",
  phoneNumber : "",
  password : "",
  repeatPassword : "",
}

const SignUpPage = () => {
  const { t } = useTranslation();
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
    .catch((err) => {
      console.error("error:", err)
      alert(err)
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
      {/* Main container */}
      <MainContainer about={<h1>{t("mainTitle", {ns: "signupPage"})}</h1>}>
        <Container>
          <CenterForm>  {/* this component is intended to set the form width and so, center the form */}
            <Form 
              onHandleSubmit={handleSubmit}
              submitBtn={<BsArrowRight />}
            >
              {/* last name */}
              <label htmlFor="lastName">{t("form.labels.lastName", {ns: "signupPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder={"" + t("form.placeholders.lastName", {ns: "signupPage"})}
                  required
                  onChange={handleChange}
                />
                <BiUser />
              </div>
              {/* first name */}
              <label htmlFor="firstName">{t("form.labels.firstName", {ns: "signupPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder={"" + t("form.placeholders.firstName", {ns: "signupPage"})}
                  required
                  onChange={handleChange}
                />
                <BiUser />
              </div>
              {/* email */}
              <label htmlFor="email">{t("form.labels.email", {ns: "signupPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={"" + t("form.placeholders.email", {ns: "signupPage"})}
                  required
                  onChange={handleChange}
                />
                <BiEnvelope />
              </div>
              {/* phone number */}
              <label htmlFor="phoneNumber">{t("form.labels.phoneNumber", {ns: "signupPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={"" + t("form.placeholders.phoneNumber", {ns: "signupPage"})}
                  onChange={handleChange}
                  maxLength={12}
                />
                <BsPhone />
              </div>
              {/* password  */}
              <label htmlFor="password">{t("form.labels.password", {ns: "signupPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={"" + t("form.placeholders.password", {ns: "signupPage"})}
                  minLength={6}
                  required
                  onChange={handleChange}
                  autoComplete="on"
                />
                <BsKey />
              </div>
              {/* repeat password */}
              <label htmlFor="repeatPassword">{t("form.labels.repeatPassword", {ns: "signupPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  placeholder={"" + t("form.placeholders.repeatPassword", {ns: "signupPage"})}
                  minLength={6}
                  required
                  onChange={handleChange}
                  autoComplete="on"
                />
                <BsKey />
              </div>
              <FormFooter>
                <LinkToLogin>
                  <Link to={getPageUrl(PATH.login)}>{t("form.links.navigateToLogIn", {ns: "signupPage"})}</Link>
                </LinkToLogin>
              </FormFooter>
            </Form>
          </CenterForm>
        </Container>
      </MainContainer>
    </Wrapper>
  )
}

export default SignUpPage;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
`

const CenterForm = styled.div`
  width: 60%;

  // ========= MEDIA QUERIES - CenterForm ============
  @media (max-width: 1100px) {
    width: 95%;
  }
`

const FormFooter = styled.div`

`

const LinkToLogin = styled.div`
  margin-top: 1rem;
  font-size: 12px;
  text-align: end;

  a {
    color: ${COLOR_SPECIAL};
    font-weight: bold;
  }
`