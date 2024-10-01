import React, { useState } from "react";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import PATH from "../../constants/cts_routes";
import { useTranslation } from "react-i18next";
import { languages } from "../../constants/cts_languages";
import { getPageUrl } from "../../locales/i18n";
import { COLOR_FORM_HEADER, COLOR_FORM_INPUT, COLOR_TEXT_MUTED, COLOR_TEXT } from "../../constants/cts_colors";
import Button from "../../components/Button";
 
const initialFormState = {
  email : "",
  password : "",
}

const LoginPage = () => {
  const { t } = useTranslation();
  const [ formValues, setFormValues ] = useState(initialFormState);
  const { onLogin } = useAuthentication();
  const [ redirectToHome, _setRedirectToHome ] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email: formValues.email,
      password: formValues.password,
    })
    .then(() => _setRedirectToHome(true))
    .catch ((error:any) => alert(error))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }
  // after user connected, redirect to home
  if(redirectToHome) {
    return <Navigate to={getPageUrl(PATH.home)} />
  }

  return (
    <div>
      {/* change language */}
      {
        languages.map((language) => (
          <Link key={language.code} to={getPageUrl(null, language.code)}>
            {language.nativeName}
          </Link>
        ))
      }
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <FormHeader>
          <h1>{t("mainTitle", {ns: "loginPage"})}</h1>
          <p className="text-muted">{t("description", {ns: "loginPage"})}</p>
          </FormHeader>
          <FormInputs>
            <div className="form-group">
              {/* email */}
              <label htmlFor="email">{t("form.labels.email", {ns: "loginPage"})}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={"" + t("form.placeholders.email", {ns: "loginPage"})}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {/* password */}
              <label htmlFor="password">{t("form.labels.password", {ns: "loginPage"})}</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={"" + t("form.placeholders.password", {ns: "loginPage"})}
                minLength={6}
                required
                onChange={handleChange}
              />
            </div>
            {/* lost password link */}
            <div className='text-right'> 
              <Link to={getPageUrl(PATH.lost_pwd)} className='text-muted'>
                {t("form.links.lostPassword", {ns: "loginPage"})}
              </Link>
            </div>
          </FormInputs>
          <FormFooter>
            {/* submit btn */}
            <Button text={t("form.submitBtn", {ns: "loginPage"})} />
          </FormFooter>
        </Form>
      </Wrapper>
    </div>
  )
}

export default LoginPage;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  width: 320px;
  background: #fff;
  border-width: 0;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 5%);

  font-size: .875rem;
  font-weight: 400;
  text-align: left;
  line-height: 1.4285714286;

  color: ${COLOR_TEXT};

  .text-muted {
    color: ${COLOR_TEXT_MUTED};
  }

  a {
    text-decoration: none;
    cursor: pointer;
    outline: 0;
    background-color: transparent;
  }
`

const Form = styled.form`
  padding: 3rem;
`

const FormHeader = styled.div`
  h1 {
    font-size: 1.09375rem;
    font-weight: Medium;
    color: ${COLOR_FORM_HEADER};
    line-height: 1.2;
    
  }
  p {
    margin-top: 0;
    font-size: 0.825rem;
    font-weight: normal;
  }
  margin-bottom: 1rem;
`

const FormInputs = styled.div`
  display: block;
  margin-top: 0em;


  .form-group {
    margin-bottom: 1rem;
    text-align: left;
    box-sizing: border-box;

    label {
      display: inline-block;
      margin-bottom: 0.5rem;
    }

    input{
      display: block;
      box-sizing: border-box;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.4285714286;
      color: ${COLOR_FORM_INPUT};
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(135,150,165,.15);
      border-radius: 0.25rem;
      color: inherit;
      width: 100%;
    }
  }

  .text-right {
    text-align: right;
    margin: 1rem 0;
  }
  

`

const FormFooter = styled.div`
  button {
    font-weight: Medium;
    margin-bottom: 1.5rem
  }
`
