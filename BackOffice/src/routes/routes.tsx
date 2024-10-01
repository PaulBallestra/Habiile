import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthentication } from "../common/contexts/authenticationContext";
import WrapperConnected from "../components/wrapper-conected";
import LoginPage from "./login/login";
import HomePage from "./dashboard/dashboard";
import AccountsList from "./accountsList/AccountsList";
import ItemsList from "./items/itemsList";
import Messages from "./messages/messages";
import Account from "./account/account";
import LostPassword from "./lostPassword/lostPassword";
import ResetPassword from "./resetPassword/resetPassword";
import PATH from "../constants/cts_routes";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import { DEFAULT_LANGUAGE } from "../constants/cts_language";
import 'remixicon/fonts/remixicon.css';
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
  }
  const { onGetUserIfIsAuthenticated, user } = useAuthentication();
  const [ checkUser, _setCheckUser ] = useState<IUserAuthenticationInfos>(initialAuthenticatedUserInfos);

  // set user authenticated infos
  useEffect(() => {
    onGetUserIfIsAuthenticated()
      .then((returnUser) => {
        if(returnUser) {
          // authenticated user
          _setCheckUser({
            ...returnUser,
            isWaitingAuthenticationResponse: false,
            isAuthenticated: true,
          })
        }else {
          // not authenticated user
          _setCheckUser({
            ...initialAuthenticatedUserInfos,
            isWaitingAuthenticationResponse: false,
            isAuthenticated: false,
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }, [user]);

  // on logout / user does not exist -> set the default initial settings to prevent bugs (page flickering)
  useEffect(() => {
    if(!user) {
      _setCheckUser({
        ...initialAuthenticatedUserInfos,
        isWaitingAuthenticationResponse: true,
        isAuthenticated: false,
      })
    }
  }, [user]);

  return (
    checkUser.isWaitingAuthenticationResponse ? <></> :
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route path="/:lang/" element={<LanguagePage />}>
          <Route element={<NotAuthenticatedRoutes checkUser={checkUser} />}>
            <Route path={PATH.login} element={<LoginPage />} />
            <Route path={PATH.lost_pwd} element={<LostPassword />} />
          </Route>
          <Route element={<ProtectedRoutes checkUser={checkUser} path={PATH.login} />}>
            <Route
              index
              element={
                <WrapperConnected>
                  <HomePage />
                </WrapperConnected>
              }
            />
            <Route path={PATH.reset_pwd} element={<ResetPassword />} />
            <Route
              path={PATH.users}
              element={
                <WrapperConnected>
                  <AccountsList />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.items}
              element={
                <WrapperConnected>
                  <ItemsList />
                </WrapperConnected>
              }
            />
            <Route
              path={PATH.messages}
              element={
                <WrapperConnected>
                  <Messages />
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
            <Route
              path={PATH.reset_pwd}
              element={
                <WrapperConnected>
                  <ResetPassword />
                </WrapperConnected>
              }
            />
          </Route>
        </Route>
        <Route path="/*" element={<RedirectToIndexLanguagePage checkUser={checkUser} />}/>
      </Routes>
    </I18nextProvider>
  );
};

const NotAuthenticatedRoutes = ({checkUser}: {checkUser: IUserAuthenticationInfos}) => {
  if(checkUser.isAuthenticated) {
    return <Navigate to={PATH.home} replace />
  }else {
    return <Outlet />
  }
}

const ProtectedRoutes = ({path, checkUser}: {path: string, checkUser: IUserAuthenticationInfos}) => {
  if(checkUser.isAuthenticated) {
    return <Outlet />
  }else {
    return <Navigate to={path} replace />
  }
}

const LanguagePage: React.FC = (): JSX.Element => {
  const { lang } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return <Outlet />;
};

const RedirectToIndexLanguagePage = ({checkUser}: {checkUser: IUserAuthenticationInfos}) => {
  let navigatorLangageDetected = navigator.language
    ? navigator.language
    : DEFAULT_LANGUAGE;
  // remove - to language string
  navigatorLangageDetected = navigatorLangageDetected.split("-")[0];
  return <Navigate to={checkUser.isAuthenticated ? `/${navigatorLangageDetected}/${PATH.home}` : `/${navigatorLangageDetected}/${PATH.login}`} />;
}

export default AppRoutes;
