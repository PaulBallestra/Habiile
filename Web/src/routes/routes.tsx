import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthentication } from "../common/contexts/authenticationContext";
import WrapperConnected from "../components/wrapper-conected";
import SignUpPage from "./signUp/signUp";
import HomePage from "./homePage/homePage";
import LoginPage from "./login/login";
import LostPassword from "./lostPassword/lostPassword";
import ResetPassword from "./resetPassword/resetPassword";
import LegalNotices from "./legalNotices/legalNotices";
import Contact from "./contact/contact";
import ChangePassword from "./changePassword/changePassword";
import Account from "./account/account";
import About from "./about/about";
import Items from "./items/items";
import PATH from "../constants/cts_routes";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import { DEFAULT_LANGUAGE } from "../constants/cts_language";
import { useApp } from "../common/contexts/appContext";
import { IUserAuthenticationInfos } from "../interfaces/user";

// ⚠️ Lors de la création d'une nouvelle route, il faut ajouter le chemin dans le
// fichier "front/src/constants/cts_routes.tsx"

const AppRoutes = () => {
  const initialAuthenticatedUserInfos = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    image: "",
    roleName: "",
    password: "",
    id: -1,
    created_at: "",
    isWaitingAuthenticationResponse: true,
    isAuthenticated: false,
  };
  const { onGetUserIfIsAuthenticated, user } = useAuthentication();
  const [checkUser, _setCheckUser] = useState<IUserAuthenticationInfos>(
    initialAuthenticatedUserInfos
  );
  const [stripeClientSecret, _setStripeClientSecret] = useState<string>("");

  // set user authenticated infos
  useEffect(() => {
    onGetUserIfIsAuthenticated()
      .then((returnUser) => {
        if (returnUser) {
          // authenticated user
          _setCheckUser({
            ...returnUser,
            isWaitingAuthenticationResponse: false,
            isAuthenticated: true,
          });
        } else {
          // not authenticated user
          _setCheckUser({
            ...initialAuthenticatedUserInfos,
            isWaitingAuthenticationResponse: false,
            isAuthenticated: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  // on logout / user does not exist -> set the default initial settings to prevent bugs (page flickering)
  useEffect(() => {
    if (!user) {
      _setCheckUser({
        ...initialAuthenticatedUserInfos,
        isWaitingAuthenticationResponse: true,
        isAuthenticated: false,
      });
    }
  }, [user]);

  return checkUser.isWaitingAuthenticationResponse ? (
    <></>
  ) : (
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route path="/:lang" element={<LanguagePage />}>
          <Route
            index
            element={
              <WrapperConnected>
                <HomePage />
              </WrapperConnected>
            }
          />
          <Route element={<AuthRoutes checkUser={checkUser} />}>
            <Route
              path={PATH.signup}
              element={
                <WrapperConnected>
                  <SignUpPage />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.login}
              element={
                <WrapperConnected>
                  <LoginPage />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.lost_pwd}
              element={
                <WrapperConnected>
                  <LostPassword />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.reset_pwd}
              element={
                <WrapperConnected>
                  <ResetPassword />
                </WrapperConnected>
              }
            />
          </Route>
          <Route
            path={PATH.legals}
            element={
              <WrapperConnected>
                <LegalNotices />
              </WrapperConnected>
            }
          />
          <Route
            path={PATH.contact}
            element={
              <WrapperConnected>
                <Contact />
              </WrapperConnected>
            }
          />
          <Route
            path={PATH.about}
            element={
              <WrapperConnected>
                <About />
              </WrapperConnected>
            }
          />
          <Route
            element={
              <ProtectedRoutes checkUser={checkUser} path={PATH.login} />
            }
          >
            <Route
              path={PATH.items}
              element={
                <WrapperConnected>
                  <Items
                    stripeClientSecret={stripeClientSecret}
                    _setStripeClientSecret={_setStripeClientSecret}
                  />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.change_pwd}
              element={
                <WrapperConnected>
                  <ChangePassword />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.account}
              element={
                <WrapperConnected>
                  <Account />
                </WrapperConnected>
              }
            />
          </Route>
        </Route>
        <Route path="/*" element={<RedirectToIndexLanguagePage />} />
      </Routes>
    </I18nextProvider>
  );
};

const AuthRoutes = ({ checkUser }: { checkUser: IUserAuthenticationInfos }) => {
  if (checkUser.isAuthenticated) {
    return <Navigate to={PATH.account} replace />;
  } else {
    return <Outlet />;
  }
};

const ProtectedRoutes = ({
  path,
  checkUser,
}: {
  path: string;
  checkUser: IUserAuthenticationInfos;
}) => {
  if (checkUser.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={path} replace />;
  }
};

const LanguagePage: React.FC = (): JSX.Element => {
  const { lang } = useParams();
  const { onSendLanguage } = useApp();

  useEffect(() => {
    // send selected language to the server
    // the language will be changed on api
    onSendLanguage(lang || DEFAULT_LANGUAGE)
      // change language in front
      .then(() => i18n.changeLanguage(lang));
  }, [lang]);

  return <Outlet />;
};

const RedirectToIndexLanguagePage = () => {
  let navigatorLangageDetected = navigator.language
    ? navigator.language
    : DEFAULT_LANGUAGE;
  // remove - to language string
  navigatorLangageDetected = navigatorLangageDetected.split("-")[0];
  return <Navigate to={`/${navigatorLangageDetected}/${PATH.home}`} />;
};

export default AppRoutes;
