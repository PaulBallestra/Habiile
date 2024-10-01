import React, { createContext, useCallback, useContext, useState } from "react";
import { onCreateAccountApi, onLostPasswordApi, onResetPasswordApi, onSendContactMessageApi, onChangePasswordApi, onGetCurrentUserApi, onEditAccountApi, onDeleteAccountApi } from "../../api/user.api"
import { EMPTY_CONTACT_MESSAGE, EMPTY_EMAIL, EMPTY_FIRSTNAME, EMPTY_LASTNAME, EMPTY_PASSWORD, EMPTY_TOKEN, NOT_VALID_EMAIL, NOT_VALID_PASSWORD, PASSWORD_NO_MATCH } from "../../constants/cts_formErrors";
import { IUserContext } from "../../interfaces/user";
import { USER_MSG } from "../../constants/cts_contextErrors";
import { useTranslation } from "react-i18next";
import { isValidEmail, isValidPassword } from "../../utils/validations";
import { checkEmptyInput, checkStringEquality } from '../../utils/checkInputs'

const UserContext = createContext<IUserContext | null>(null)

// THE PROVIDER
export const UserProvider = (props : any) => {
  const { t } = useTranslation()
  const [ isLoading, _setIsLoading ] = useState(false)

  // create an account
  const onCreateAccount = useCallback((
    {firstName, lastName, email, phoneNumber, password, repeatPassword}:
    {firstName: string, lastName: string, email: string, phoneNumber?: string, password: string, repeatPassword: string}
  ) => {

    // form validation
    if (!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      });
    }
    
    if(!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      });
    }

    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }else {
      // check if email is valid
      if(!isValidEmail(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_EMAIL}`, {ns: "errors"}));
        });
      }
    }

    if(!checkEmptyInput(password)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_PASSWORD}`, {ns: "errors"}));
      });
    }else {
      if(!isValidPassword(password)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_PASSWORD}`, {ns: "errors"}));
        });
      }
    }

    if (!checkStringEquality(password, repeatPassword)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${PASSWORD_NO_MATCH}`, {ns: "errors"}));
      });
    }

    _setIsLoading(true);
    return  onCreateAccountApi({firstName, lastName, email, phoneNumber, password})
              .then(() => {
                  _setIsLoading(false)
              })
              .catch((error : any) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => _setIsLoading(false));
  }, []);

  // edit account
  const onEditAccount = useCallback((
    {userId, firstName, lastName, email, phoneNumber, profileImage}:
    {userId: number, firstName: string, lastName: string, email: string, phoneNumber?: string, profileImage: any}
  ) => {
    // form validation
    if(!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      });
    }
    
    if(!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      });
    }

    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }else {
      // check if email is valid
      if(!isValidEmail(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_EMAIL}`, {ns: "errors"}));
        });
      }
    }

    _setIsLoading(true);
    return  onEditAccountApi({userId, firstName, lastName, email, phoneNumber, profileImage})
              .then(() => {
                  _setIsLoading(false);
              })
              .catch((error : any) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => _setIsLoading(false));
  }, []);

  // get current user
  const onGetCurrentUser = useCallback(() => {
    _setIsLoading(true);
    return  onGetCurrentUserApi()
              .then((response) => {
                _setIsLoading(false);
                return response;
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then((response) => {
                _setIsLoading(false)
                return response;
              })
  }, [])

  // delete account
  const onDeleteAccount = useCallback((
    { email, password}: 
    {email: string, password: string}) => {

    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }else {
      // check if email is valid
      if(!isValidEmail(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_EMAIL}`, {ns: "errors"}));
        });
      }
    }

    if(!checkEmptyInput(password)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_PASSWORD}`, {ns: "errors"}));
      });
    }

    _setIsLoading(true);
    return  onDeleteAccountApi({email, password})
              .then((response) => {
                _setIsLoading(false);
                return (response)
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => _setIsLoading(false))
  }, [])

  // Lost password
  const onLostPassword = useCallback(({email}: {email: string}) => {

    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }else {
      // check if email is valid
      if(!isValidEmail(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_EMAIL}`, {ns: "errors"}));
        });
      }
    }

    _setIsLoading(true);
    return  onLostPasswordApi({ email })
              .then((response : any) => {
                _setIsLoading(false);
                return (response)
              })
              .catch((error : any) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => _setIsLoading(false))
    }, [])

  // Reset Password from email
  const onResetPassword = useCallback((
    {new_password_token, email, password, repeatPassword}:
    {new_password_token: string, email: string, password: string, repeatPassword: string}
  ) => {
    // validate form
    if(!checkEmptyInput(new_password_token)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_TOKEN}`, {ns: "errors"}));
      })
    }

    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      })
    }else {
      // check if email is valid
      if(!isValidEmail(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_EMAIL}`, {ns: "errors"}));
        })
      }
    }

    if(!checkEmptyInput(password)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_PASSWORD}`, {ns: "errors"}));
      })
    }else {
      // check if password is valid
      if(!isValidPassword(password)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_PASSWORD}`, {ns: "errors"}));
        })
      }
    }

    if(!checkStringEquality(password, repeatPassword)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${PASSWORD_NO_MATCH}`, {ns: "errors"}));
      })
    }

    _setIsLoading(true);
    return onResetPasswordApi({ new_password_token, email, password })
            .then((response : any) => {
              _setIsLoading(false)
              return (response)
            })
            .catch ((error : any) => {
              if (error.response) {
                throw new Error(error.response.data)
              } else {
                throw new Error(error.message)
              }
            })
            .then(() => _setIsLoading(false))
    }, [])

  // change password from user account settings
  const onChangePassword = useCallback((
    { userId, newPassword, repeatPassword } :
    { userId: number, newPassword: string, repeatPassword: string }
  ) => {
    // validate password
    if(!checkEmptyInput(newPassword)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_PASSWORD}`, {ns: "errors"}));
      });
    }else {
      if(!isValidPassword(newPassword)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_PASSWORD}`, {ns: "errors"}));
        });
      }
    }

    if (newPassword !== repeatPassword) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${PASSWORD_NO_MATCH}`, {ns: "errors"}));
      });
    }

    _setIsLoading(true);
    return  onChangePasswordApi({userId, newPassword})
              .then(() => {
                  _setIsLoading(false)
              })
              .catch((error) => {
                if (error.response) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
              })
              .then(() => _setIsLoading(false));
  }, [])

  // send contact message
  const onSendContactMessage = useCallback((
    {firstName, lastName, email, phoneNumber, message}:
    {firstName: string, lastName: string, email: string, phoneNumber: string, message: string}
  ) => {

    // form validation
    if(!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      });
    }
    
    if(!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      });
    }

    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }else {
      // check if email is valid
      if(!isValidEmail(email)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_EMAIL}`, {ns: "errors"}));
        });
      }
    }

    if(!checkEmptyInput(message)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_CONTACT_MESSAGE}`, {ns: "errors"}));
      });
    }

    _setIsLoading(true);
    return onSendContactMessageApi({firstName, lastName, email, phoneNumber, message})
            .then(() => {
              _setIsLoading(false)
            })
            .catch((error) => {
              if (error.response) {
                throw new Error(error.response.data);
              } else {
                throw new Error(error.message)
              }
            })
            .then(() => _setIsLoading(false));
  }, [])
  

  return (
    <UserContext.Provider 
      {...props}
      value={{
        isLoading,
        onCreateAccount,
        onLostPassword,
        onResetPassword,
        onSendContactMessage,
        onChangePassword,
        onGetCurrentUser,
        onEditAccount,
        onDeleteAccount,
      }}
    />
  )
}

export const useUser = (): IUserContext => {
  const context = useContext(UserContext)
  if (!context)
    throw new Error(USER_MSG);
  return context;
}
