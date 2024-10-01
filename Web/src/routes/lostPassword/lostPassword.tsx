import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiEnvelope } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import Form from "../../components/Form";
import MainContainer from "../../components/MainContainer";
import { COLOR_GREY, COLOR_SPECIAL } from "../../constants/cts_colors";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";

const LostPassword = () => {
  const { t } = useTranslation()
  const { onLostPassword } = useUser()
  const [ email, _SetEmail ] = useState<string>("")
  const [ submitted, _setSubmitted ] = useState<boolean>(false)

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    _SetEmail(e.target.value)
  }

  const onSubmit = (e : FormEvent) => {
    e.preventDefault();
    onLostPassword(email)
      .then(response => {
          _setSubmitted(true)                 // Change la valeur de "submitted" si l'email a bien été envoyé à l'utilisateur
        })
      .catch(error => alert(error))
  }

  return (
    <Wrapper>
      <MainContainer about={<h1>{t("mainTitle", {ns: "lostPasswordPage"})}</h1>}>
        <Container>
          <CenterForm>  {/* this component is intended to set the form width and so, center the form */}
          { 
            (
              !submitted &&
              <>
                
                <Form 
                  id='login' 
                  onHandleSubmit={onSubmit}
                  submitBtn={<BsArrowRight />}
                >
                  <label htmlFor='email'>{t("form.labels.email", {ns: "lostPasswordPage"})}</label><br/>
                  <div className={FORM_STYLE_INPUT_WITH_ICON}>
                    <input 
                      type='email'  
                      id='email' 
                      name='email' 
                      placeholder={"" + t("form.placeholders.email", {ns: "lostPasswordPage"})} 
                      onChange={handleChange} 
                      required 
                    />
                    <BiEnvelope />
                  </div>
                  <FormFooter>
                    <Link to={getPageUrl(PATH.login)}>{t("redirectToLogInLink", {ns: "lostPasswordPage"})}</Link>
                  </FormFooter>        
                </Form>
              </>
            ) || 
            (
              <EmailSent>
                {t("form.infos.linkSent", {ns: "lostPasswordPage"})} {email}
              </EmailSent>
            )
          }
          </CenterForm>
        </Container>
      </MainContainer>
    </Wrapper>
  )
}

export default LostPassword;

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
  margin-top: 1rem;

  a {
    font-size: 12px;
    color: ${COLOR_SPECIAL};
    font-weight: bold;
  }
`

const EmailSent = styled.div`
  color: ${COLOR_GREY};
`