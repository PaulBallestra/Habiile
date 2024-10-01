import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  onLoginApi,
  onAutoLoginApi,
  onLogoutApi,
} from '../../api/authentication.api';
import {IAuthenticationContext} from '../../interfaces/authenticationContext';
import {AUTHENTICATION_MSG} from '../../constants/cts_contextErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instanceAxios} from '../../utils/axios-api';
import {useTranslation} from 'react-i18next';
import {
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  NOT_VALID_EMAIL,
  NOT_VALID_PASSWORD,
} from '../../constants/cts_formErrors';
import {isValidEmail, isValidPassword} from '../../utils/validations';
import {checkEmptyInput} from '../../utils/checkInputs';

const AuthenticationContext = createContext<IAuthenticationContext | null>(
  null,
);

// THE PROVIDER
export const AuthenticationProvider = (props: any) => {
  const {t} = useTranslation();
  const [user, _setUser] = useState(null);
  const [token, _setToken] = useState<string | null>(null);
  const [isLoading, _setIsLoading] = useState(false);
  const [isWaitingAutoLogin, _setIsWaitingAutoLogin] = useState(true);

  // login
  const onLogin = useCallback(
    ({email, password}: {email: string; password: string}) => {
      if (!checkEmptyInput(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${EMPTY_EMAIL}`, {ns: 'errors'}));
        });
      } else {
        // check if email is valid
        if (!isValidEmail(email)) {
          return new Promise((resolve, reject) => {
            reject(t(`form.${NOT_VALID_EMAIL}`, {ns: 'errors'}));
          });
        }
      }

      if (!checkEmptyInput(password)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${EMPTY_PASSWORD}`, {ns: 'errors'}));
        });
      } else {
        // check if password is valid
        if (!isValidPassword(password)) {
          return new Promise((resolve, reject) => {
            reject(t(`form.${NOT_VALID_PASSWORD}`, {ns: 'errors'}));
          });
        }
      }

      _setIsLoading(true);
      return onLoginApi({email, password})
        .then(returnUser => {
          _setUser(returnUser.user);
          _setToken(returnUser.token);
        })
        .catch(err => {
          console.log('error:', err);
          if (err.response) {
            throw new Error(err.response.data);
          } else {
            throw new Error(err.message);
          }
        })
        .then(() => _setIsLoading(false));
    },
    [],
  );

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

  // set user token
  useEffect(() => {
    const setUserToken = async () => {
      try {
        let storageToken = await AsyncStorage.getItem('token');
        if (storageToken != null) {
          _setToken(storageToken);
        }
      } catch (error) {
        alert(error);
      }
    };
    setUserToken();
  }, []);

  // if token found, auto login every time user changes the route
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        instanceAxios.defaults.headers.common.Authorization = token;
        await AsyncStorage.setItem('token', token);
        onAutoLogin();
      }
    };
    checkToken();
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
      }}
    />
  );
};

export const useAuthentication = (): IAuthenticationContext => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(AUTHENTICATION_MSG);
  }
  return context;
};
