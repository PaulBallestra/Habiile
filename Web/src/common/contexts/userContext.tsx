import React, { createContext, useCallback, useContext, useState } from "react";
import { onCreateAccountApi, onLostPasswordApi, onResetPasswordApi, onSendContactMessageApi, onChangePasswordApi, onGetCurrentUserApi, onEditAccountApi, onDeleteAccountApi } from "../../api/user.api"
import { EMPTY_CONTACT_MESSAGE, EMPTY_EMAIL, EMPTY_FIRSTNAME, EMPTY_LASTNAME, EMPTY_PASSWORD, EMPTY_TOKEN, NOT_VALID_PHONE_NUMBER, PASSWORD_NO_MATCH } from "../../constants/cts_formErrors";
import { IUserContext } from "../../interfaces/user";
import { USER_MSG } from "../../constants/cts_contextErrors";
import { useTranslation } from "react-i18next";
import { checkEmptyInput, checkStringEquality, checkValidPhoneNumber } from "../../utils/checkInputs";

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
    if (!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      });
    }
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
    if(phoneNumber) {
      if(!checkValidPhoneNumber(phoneNumber)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_PHONE_NUMBER}`, {ns: "errors"}));
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
              .then((response) => {
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

  // edit account
  const onEditAccount = useCallback((
    {userId, lastName, firstName, email, phoneNumber, profileImage}: 
    {userId: number, lastName: string, firstName: string, email: string, phoneNumber: string, profileImage: File}
  ) => {
    if (!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }
    if(phoneNumber) {
      if(!checkValidPhoneNumber(phoneNumber)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_PHONE_NUMBER}`, {ns: "errors"}));
        });
      }
    }
    _setIsLoading(true);
    return  onEditAccountApi({userId, lastName, firstName, email, phoneNumber, profileImage})
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

  // delete account
  const onDeleteAccount = useCallback((
    { email, password}: 
    {email: string, password: string}) => {
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
  const onLostPassword = useCallback(( email : string ) => {
    if (!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
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
      if (!checkEmptyInput(new_password_token)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${EMPTY_TOKEN}`, {ns: "errors"}));
        });
      }
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
      if(!checkStringEquality(password, repeatPassword)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${PASSWORD_NO_MATCH}`, {ns: "errors"}));
        })
      }
      
      _setIsLoading(true);
      return onResetPasswordApi({ new_password_token, email, password })
              .then((response : any) => {
                console.log("repsonse: ", response)
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
    if (!checkEmptyInput(newPassword)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_PASSWORD}`, {ns: "errors"}));
      });
    }
    if(!checkStringEquality(newPassword, repeatPassword)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${PASSWORD_NO_MATCH}`, {ns: "errors"}));
      });
    }
    
    _setIsLoading(true);
    return  onChangePasswordApi({userId, newPassword})
              .then((response) => {
                  _setIsLoading(false)
              })
              .catch((error) => {
                console.log("error:", error)
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
    if (!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(message)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_CONTACT_MESSAGE}`, {ns: "errors"}));
      });
    }
    if(phoneNumber) {
      if(!checkValidPhoneNumber(phoneNumber)) {
        return new Promise((resolve, reject) => {
          reject(t(`form.${NOT_VALID_PHONE_NUMBER}`, {ns: "errors"}));
        });
      }
    }
    _setIsLoading(true);
    return onSendContactMessageApi({firstName, lastName, email, phoneNumber, message})
            .then((response) => {
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
