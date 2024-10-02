import React, { useState } from "react";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import PATH from "../../constants/cts_routes";
import { useTranslation } from "react-i18next";
import { getPageUrl } from "../../locales/i18n";
import MainContainer from "../../components/MainContainer";
import Form from "../../components/Form";
import { BsArrowRight, BsKey } from "react-icons/bs";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";
import { BiEnvelope } from "react-icons/bi";
import { COLOR_SPECIAL } from "../../constants/cts_colors";

const initialFormState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState(initialFormState);
  const { onLogin } = useAuthentication();
  const [redirectToHome, _setRedirectToHome] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email: formValues.email,
      password: formValues.password,
    })
      .then(() => _setRedirectToHome(true))
      .catch((error) => alert(error));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  // after user connected, redirect to home
  if (redirectToHome) {
    return <Navigate to={getPageUrl(PATH.home)} />;
  }

  return (
    <Wrapper>
      <h1>Connexion</h1>
      {/* main container */}
      {/* <MainContainer about={<h1>{t("mainTitle", { ns: "loginPage" })}</h1>}>
        <Container>
          <CenterForm>
            <Form onHandleSubmit={handleSubmit} submitBtn={<BsArrowRight />}>
              <label htmlFor="email">
                {t("form.labels.email", { ns: "loginPage" })}
              </label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={
                    "" + t("form.placeholders.email", { ns: "loginPage" })
                  }
                  required
                  onChange={handleChange}
                />
                <BiEnvelope />
              </div>
              <label htmlFor="password">
                {t("form.labels.password", { ns: "loginPage" })}
              </label>
              <div className={FORM_STYLE_INPUT_WITH_ICON}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={
                    "" + t("form.placeholders.password", { ns: "loginPage" })
                  }
                  minLength={6}
                  required
                  onChange={handleChange}
                />
                <BsKey />
              </div>
              <FormFooter>
                <Links>
                  <Link to={getPageUrl(PATH.lost_pwd)}>
                    {t("form.links.lostPassword", { ns: "loginPage" })}
                  </Link>
                  <Link to={getPageUrl(PATH.signup)}>
                    {t("form.links.routeToLogin", { ns: "loginPage" })}
                  </Link>
                </Links>
              </FormFooter>
            </Form>
          </CenterForm>
        </Container>
      </MainContainer> */}
    </Wrapper>
  );
};

export default LoginPage;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: absolute;
  left: 8px;
  top: 128px;
`;

const CenterForm = styled.div`
  width: 60%;

  // ========= MEDIA QUERIES - CenterForm ============
  @media (max-width: 1100px) {
    width: 95%;
  }
`;

const Links = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    margin-bottom: 0.5rem;
    color: ${COLOR_SPECIAL};
    font-size: 12px;
    font-weight: bold;
  }
`;

const FormFooter = styled.div``;
