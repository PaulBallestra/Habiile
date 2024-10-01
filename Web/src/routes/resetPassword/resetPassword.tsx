import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUser } from "../../common/contexts/userContext";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";
import MainContainer from "../../components/MainContainer";
import Form from "../../components/Form";
import { BsArrowRight, BsKey } from "react-icons/bs";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";
import { GiToken } from "react-icons/gi";
import { BiEnvelope } from "react-icons/bi";
import { COLOR_GREY, COLOR_SPECIAL } from "../../constants/cts_colors";

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
      .then(response => {
          _setSubmitted(true)                 // Change la valeur de "submitted" si l'email a bien été envoyé à l'utilisateur
        })
      .catch(error =>  {
        alert(error)
      })
  }

  return (
    <Wrapper>
      {/* main container */}
      <MainContainer 
        about={<h1>{t("mainTitle", {ns: "resetPasswordPage"})}</h1>}
      >
        <Container>
          <CenterForm>
          { 
            (
              !submitted &&
              <>
                <Form 
                  id='login' 
                  onHandleSubmit={onSubmit}
                  submitBtn={<BsArrowRight />}
                >
                  {/* token */}
                  <label htmlFor='token'>{t("form.labels.token", {ns: "resetPasswordPage"})}</label>
                  <div className={FORM_STYLE_INPUT_WITH_ICON}>
                    <input 
                      type='token'  
                      id='token' 
                      name='new_password_token' 
                      placeholder={"" + t("form.placeholders.token", {ns: "resetPasswordPage"})} 
                      onChange={handleChange} 
                      required 
                    />
                    <GiToken />
                  </div>
                  {/* email */}
                  <label htmlFor='email'>{t("form.labels.email", {ns: "resetPasswordPage"})}</label>
                  <div className={FORM_STYLE_INPUT_WITH_ICON}>
                    <input 
                      type='email'  
                      id='email' 
                      name='email' 
                      placeholder={"" + t("form.placeholders.email", {ns: "resetPasswordPage"})} 
                      onChange={handleChange} 
                      required 
                    />
                    <BiEnvelope />
                  </div>
                  {/* password */}
                  <label htmlFor='password'>{t("form.labels.password", {ns: "resetPasswordPage"})}</label>
                  <div className={FORM_STYLE_INPUT_WITH_ICON}>
                    <input 
                      type='password'  
                      id='password' 
                      name='password' 
                      placeholder={"" + t("form.placeholders.password", {ns: "resetPasswordPage"})} 
                      minLength={6} 
                      onChange={handleChange} 
                      required 
                    />
                    <BsKey />
                  </div>
                  {/* repeat password */}
                  <label htmlFor='password'>{t("form.labels.repeatPassword", {ns: "resetPasswordPage"})}</label>
                  <div className={FORM_STYLE_INPUT_WITH_ICON}>
                    <input 
                      type='password'  
                      id='repeatPassword' 
                      name='repeatPassword' 
                      placeholder={"" + t("form.placeholders.repeatPassword", {ns: "resetPasswordPage"})} 
                      minLength={6} 
                      onChange={handleChange} 
                      required 
                    />
                    <BsKey />
                  </div> 
                </Form>
              </>
            ) || 
            (
              <EmailSent>
                <p>
                  {/* first part text */}
                  {t("passwordChangedInfo.firstPartText", {ns: "resetPasswordPage"})}
                  {/* redirect button */}
                  <Link to={getPageUrl(PATH.login)}>
                    {t("passwordChangedInfo.link", {ns: "resetPasswordPage"})}
                  </Link>
                  {/* lest part text */}
                  {t("passwordChangedInfo.lastPartText", {ns: "resetPasswordPage"})}
                </p>
              </EmailSent>
            )
          }
          </CenterForm>
        </Container>
      </MainContainer>
    </Wrapper>
  )
}

export default ResetPassword;

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

const EmailSent = styled.div`
  color: ${COLOR_GREY};

  a {
    color: ${COLOR_SPECIAL};
  }
`