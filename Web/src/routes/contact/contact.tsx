import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import MainContainer from "../../components/MainContainer";
import { GrSend } from "react-icons/gr";
import { BiUser, BiEnvelope } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import Form from "../../components/Form";
import { FORM_STYLE_FOOTER, FORM_STYLE_INFO_MESSAGES, FORM_STYLE_INPUT_WITH_ICON, FORM_STYLE_TEXTAREA_WITH_ICON } from "../../constants/cts_form";
import { COLOR_SPECIAL } from "../../constants/cts_colors";

const initialFormState = {
  firstName : "",
  lastName : "",
  email : "",
  phoneNumber: "",
  message: "",
}

const Contact = () => {
  const { t } = useTranslation()
  const [ formValues, _setFormValues ] = useState(initialFormState)
  const { onSendContactMessage } = useUser()
  const [ messageSent, _setMessageSent ] = useState(false)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const {firstName, lastName, email, phoneNumber, message } = formValues
    onSendContactMessage({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
    })
    .then(() => {
      _setFormValues(initialFormState);
      _setMessageSent(true);
    })
    .catch(error => alert(error))
  }

  const handleChange = (e: 
      React.ChangeEvent<HTMLInputElement> | 
      React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    _setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  return (
    <Wrapper>
      {/* Main container */}
      <MainContainer about={<h1>{t("mainTitle", {ns: "contactPage"})}</h1>}>
        <Container>
          <CenterForm>  {/* this component is intended to set the form width and so, center the form */}
            <Form 
              onHandleSubmit={handleSubmit}
              submitBtn={<GrSend />}
            >
              {/* last name */}
              <label htmlFor="lastName">{t("form.labels.lastName", {ns: "contactPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder={"" + t("form.placeholders.lastName", {ns: "contactPage"})}
                  onChange={handleChange}
                  required
                />
                <BiUser />
              </div>
              {/* first name */}
              <label htmlFor="firstName">{t("form.labels.firstName", {ns: "contactPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder={"" + t("form.placeholders.firstName", {ns: "contactPage"})}
                  onChange={handleChange}
                  required
                />
                <BiUser />
              </div>
              {/* email */}
              <label htmlFor="email">{t("form.labels.email", {ns: "contactPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={"" + t("form.placeholders.email", {ns: "contactPage"})}
                  onChange={handleChange}
                  required
                />
                <BiEnvelope />
              </div>
              {/* phone number */}
              <label htmlFor="phoneNumber">{t("form.labels.phoneNumber", {ns: "contactPage"})}</label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={"" + t("form.placeholders.phoneNumber", {ns: "contactPage"})}
                  onChange={handleChange}
                  maxLength={12}
                />
                <BsPhone />
              </div>
              {/* message */}
              <label htmlFor="message">{t("form.labels.message", {ns: "contactPage"})}</label>
              <div className={FORM_STYLE_TEXTAREA_WITH_ICON}>
                <textarea
                  id="message"
                  name="message"
                  placeholder={"" + t("form.placeholders.message", {ns: "contactPage"})}
                  onChange={handleChange}
                  required
                ></textarea>
                <AiOutlineMessage />
              </div>

              {/* form footer */}
              <div className={FORM_STYLE_FOOTER}>
                <div className={FORM_STYLE_INFO_MESSAGES}>
                  {
                    messageSent && // check if message is sent
                    <InformMessageSent>
                      {t("form.infos.messageSent", {ns: "contactPage"})}
                    </InformMessageSent>
                  }
                </div>
              </div>
            </Form>
          </CenterForm>
        </Container>
      </MainContainer>
    </Wrapper>
  )
}

export default Contact;

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

const InformMessageSent = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: ${COLOR_SPECIAL};
`
