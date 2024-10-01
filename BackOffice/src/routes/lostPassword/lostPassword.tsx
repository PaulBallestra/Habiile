import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import { COLOR_BLACK, COLOR_TEXT, COLOR_TEXT_MUTED, COLOR_WHITE } from "../../constants/cts_colors";
import { languages } from "../../constants/cts_languages";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";

const LostPassword = () => {
  const { i18n, t } = useTranslation()
  const { onLostPassword } = useUser()
  const [ email, _SetEmail ] = useState<string>("")
  const [ submitted, _setSubmitted ] = useState<boolean>(false)

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    _SetEmail(e.target.value)
  }

  const onSubmit = (e : FormEvent) => {
    e.preventDefault();
    onLostPassword(email)
      .then(() => {
          _setSubmitted(true)                 // Change la valeur de "submitted" si l'email a bien été envoyé à l'utilisateur
        })
      .catch((error:any) => alert(error))
  }

  return (
    <Wrapper>
      {/* change language */}
      { 
        (
          !submitted &&
          <>
            <Languages>
              {
                languages.map((language) => (
                  <Link key={language.code} to={getPageUrl(null, language.code)} className="elem">
                    {language.nativeName}
                  </Link>
                ))
              }
            </Languages>
            <FormHeader>
                <h1>{t("mainTitle", {ns: "lostPasswordPage"})}</h1>
            </FormHeader>
            <form id='lostPassword' onSubmit={onSubmit}>
              <FormInputs>
                <span className="elem">
                  <input 
                    type='email'
                    id='email'
                    name='email'
                    placeholder={"" + t("form.placeholders.email", {ns: "lostPasswordPage"})} 
                    onChange={handleChange}
                    required />
                </span>
              </FormInputs>
              <FormFooter>
                <a href={getPageUrl(PATH.login)}>{t("back", {ns: "lostPasswordPage"})}</a>
                <button type='submit' form='lostPassword'>{t("form.submitBtn", {ns: "lostPasswordPage"})}</button>
              </FormFooter>
            </form>
          </>
        ) || 
        (
          <EmailSent>
            {t("form.infos.linkSent", {ns: "lostPasswordPage"})} {email}
          </EmailSent>
        )
      }
    </Wrapper>
  )
}

export default LostPassword;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 70%;
  background-color: ${COLOR_WHITE};
  box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
  padding: 40px 0;
  color:  ${COLOR_TEXT};

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Languages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 120px;
  margin-bottom: 10px;

  .elem {
    color: ${COLOR_TEXT};
    text-decoration: none;
  }

  .elem:hover {
    color: ${COLOR_BLACK};
  }
`

const FormHeader = styled.div`
`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .elem {
    margin: 5px 0;
    input {
      border: 1px solid ${COLOR_TEXT_MUTED};
      border-radius: 5px;
      background-color: transparent;
      padding: 6px 3px;
      color: ${COLOR_TEXT};
      width: 220px;
    }
  }
`

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
  width: 80%;

  button, a {
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
    text-decoration: none;
  }

  button:hover, a:hover {
    background-color: ${COLOR_TEXT};
    color: ${COLOR_WHITE}
  }

  .back {
    margin-right: 10px;
  }
`

const EmailSent = styled.div`

`