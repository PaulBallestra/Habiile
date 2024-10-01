import React, { ChangeEvent, FormEvent, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUser } from "../../common/contexts/userContext";
import { languages } from "../../constants/cts_languages";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";
import { COLOR_BLACK, COLOR_BUTTON, COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";

const initialFormState = {
  new_password_token : "",
  email : "",
  password : "",
  repeatPassword : "",
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const { onResetPassword } = useUser();
  const [ formValues, _setFormValues ] = useState(initialFormState);
  const [ submitted, _setSubmitted ] = useState<boolean>(false);

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    _setFormValues({...formValues, [name] :  value})
  }

  const onSubmit = async (e : FormEvent) => {
    e.preventDefault();
    onResetPassword({
      new_password_token: formValues.new_password_token,
      email: formValues.email,
      password: formValues.password,
      repeatPassword: formValues.repeatPassword
    })
      .then((response: any) => {
          _setSubmitted(true)                 // Change la valeur de "submitted" si l'email a bien été envoyé à l'utilisateur
        })
      .catch((error:any) =>  {
        alert(error)
      })
  }

  return (
    <Wrapper>
      {/* change language */}
      <Languages>
        {languages.map((language) => (
          <Link key={language.code} to={getPageUrl(null, language.code)} className="elem">
            {language.nativeName}
          </Link>
        ))}
      </Languages>
      { 
        (
          !submitted &&
          <>
            <h1>{t("mainTitle", {ns: "resetPasswordPage"})}</h1>
            <FormInputs>
              <form id='login' onSubmit={onSubmit}>
                <span className="elem">
                  <label htmlFor='token'>Token</label><br/>
                  <input 
                    type='token'  
                    id='token' 
                    name='new_password_token' 
                    placeholder='token' 
                    onChange={handleChange} 
                    required />
                </span>
                <span className="elem">
                  {/* email */}
                  <label htmlFor='email'>{t("form.labels.email", {ns: "resetPasswordPage"})}</label><br/>
                  <input 
                    type='email'  
                    id='email' 
                    name='email' 
                    placeholder={"" + t("form.placeholders.email", {ns: "resetPasswordPage"})} 
                    onChange={handleChange} 
                    required />
                </span>
                  {/* password */}
                <span className="elem">
                  <label htmlFor='password'>{t("form.labels.password", {ns: "resetPasswordPage"})}</label><br/>
                  <input 
                    type='password'  
                    id='password' 
                    name='password' 
                    placeholder={"" + t("form.placeholders.password", {ns: "resetPasswordPage"})} 
                    minLength={6} 
                    onChange={handleChange} 
                    required />
                </span>
                  {/* repeat password */}
                <span className="elem">
                  <label htmlFor='repeatPassword'>{t("form.labels.repeatPassword", {ns: "resetPasswordPage"})}</label><br/>
                  <input 
                    type='password' 
                    id='repeatPassword'
                    name='repeatPassword' 
                    placeholder={"" + t("form.placeholders.repeatPassword", {ns: "resetPasswordPage"})} 
                    minLength={6} 
                    onChange={handleChange} 
                    required />       
                </span>
              </form>
            </FormInputs>
            <FormFooter>
              <button type='submit' form='login'>{t("form.submitBtn", {ns: "resetPasswordPage"})}</button>
            </FormFooter>
          </>
        ) || 
        (
          <EmailSent>
            <Trans 
              i18nKey={"resetPasswordPage.form.infos.passwordChanged"} 
              values={{loginPath: getPageUrl(PATH.login)}}
            />
          </EmailSent>
        )
      }
    </Wrapper>
  )
}

export default ResetPassword;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Languages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 120px;
  margin-top: 10px;

  .elem {
    color: ${COLOR_TEXT};
    text-decoration: none;
  }

  .elem:hover {
    color: ${COLOR_BLACK};
  }
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
      background-color: transparent;
      padding: 4px 0;
      color: ${COLOR_TEXT};
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
`

const EmailSent = styled.div`
  margin-top: 15px;
`