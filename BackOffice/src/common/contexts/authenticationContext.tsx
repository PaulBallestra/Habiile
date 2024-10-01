import React, { createContext, useCallback, useContext, useState, useEffect } from "react";
import { onLoginApi, onAutoLoginApi, onLogoutApi, onGetUserIfAuthenticatedApi } from "../../api/authentication.api"
import { instanceAxios } from "../../utils/axios-api";
import { IAuthenticationContext } from "../../interfaces/authenticationContext"
import { AUTHENTICATION_MSG } from "../../constants/cts_contextErrors";
import { checkEmptyInput } from "../../utils/checkInputs";
import { useTranslation } from "react-i18next";
import { EMPTY_EMAIL, EMPTY_PASSWORD } from "../../constants/cts_formErrors";
import { TOKEN_USER_AUTHENTICATED } from "../../constants/cts_user";

const AuthenticationContext = createContext<IAuthenticationContext | null>(null)

// THE PROVIDER
export const AuthenticationProvider = (props : any) => {
  const { t } = useTranslation()
  const [ user, _setUser ] = useState(null);
  const [ token, _setToken ] = useState<string | null>(null);
  const [ isLoading, _setIsLoading ] = useState(false);
  const [ isWaitingAutoLogin, _setIsWaitingAutoLogin ] = useState(true);

  // login
  const onLogin = useCallback((
    {email, password}:
    {email: string, password: string}
  ) => {
    if (!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(password)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_PASSWORD}`, {ns: "errors"}));
      });
    }
    _setIsLoading(true);
    return onLoginApi({email, password})
      .then((returnUser) => {
        _setUser(returnUser.user);
        _setToken(returnUser.token);
      })
      .catch((err) => {
        console.log("error:", err)
        if(err.response) {
          throw new Error(err.response.data)
        }else {
          throw new Error(err.message)
        }
      })
      .then(() => _setIsLoading(false));
  }, []);

  // auto login function
  const onAutoLogin = useCallback(async () => {
    const returnUser = await onAutoLoginApi();
    if (returnUser && returnUser.user) {
      _setUser(returnUser.user);
      _setToken(returnUser.token);
    }
    _setIsWaitingAutoLogin(false);
  }, []);

  // logout
  const onLogout = useCallback(() => {
    _setIsLoading(true);
    return onLogoutApi()
      .then(returnUser => {
        _setUser(returnUser.user);
        _setToken(returnUser.token);
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data);
        } else {
          throw new Error(err.message);
        }
      })
      .then(() => _setIsLoading(false));
  }, []);

  // check if the user / admin is authenticated
  const onGetUserIfIsAuthenticated = useCallback(() => {
    const localStorageToken = localStorage.getItem(TOKEN_USER_AUTHENTICATED);
    if(localStorageToken) {
      const authenticatedToken = localStorageToken;
      instanceAxios.defaults.headers.common["Authorization"] = authenticatedToken;
    }
    return onGetUserIfAuthenticatedApi()
      .then((response) => {
        if(response.user) {
          return response.user;
        }else {
          return null;
        }
      })
      .catch((err) => {
        throw err;
      })
  }, []);

  // set user token
  useEffect(() => {
    if (localStorage.getItem(TOKEN_USER_AUTHENTICATED)) {
      _setToken(localStorage.getItem(TOKEN_USER_AUTHENTICATED));
    }
  }, []);

  // if token found, auto login every time user changes the route
  useEffect(() => {
    if (token) {
      instanceAxios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem(TOKEN_USER_AUTHENTICATED, token);
      onAutoLogin();
    }
  }, [token, onAutoLogin]);

  return (
    <AuthenticationContext.Provider 
      {...props}
      value={{
        user,
        isLoading,
        isWaitingAutoLogin,
        onLogin,
        onAutoLogin,
        onLogout,
        onGetUserIfIsAuthenticated,
      }}
    /> 
  )
}

export const useAuthentication = (): IAuthenticationContext => {
  const context = useContext(AuthenticationContext)
  if (!context)
    throw new Error(AUTHENTICATION_MSG);
  return context;
}


