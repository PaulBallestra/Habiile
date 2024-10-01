import React, { createContext, useCallback, useContext, useState } from "react";
import { onLostPasswordApi, onResetPasswordApi,
        onChangePasswordApi, onGetCurrentUserApi,
        onEditAccountApi, onDeleteAccountApi,
        onGetAllUsersByAdminApi, onUpdateUserByAdminApi, 
        onDeleteAccountByAdminApi, onCreateAccountByAdminApi} from "../../api/user.api"
import { EMPTY_EMAIL, EMPTY_FIRSTNAME, EMPTY_LASTNAME, EMPTY_PASSWORD, EMPTY_ROLE, EMPTY_TOKEN, PASSWORD_NO_MATCH } from "../../constants/cts_formErrors";
import { IUserContext } from "../../interfaces/user";
import { USER_MSG } from "../../constants/cts_contextErrors";
import { useTranslation } from "react-i18next";
import { checkEmptyInput, checkStringEquality } from "../../utils/checkInputs";


const UserContext = createContext<IUserContext | null>(null)

// THE PROVIDER
export const UserProvider = (props : any) => {
  const { t } = useTranslation()
  const [ isLoading, setIsLoading ] = useState(false)

  // get current user
  const onGetCurrentUser = useCallback(() => {
    setIsLoading(true);
    return  onGetCurrentUserApi()
              .then((response) => {
                setIsLoading(false);
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
                setIsLoading(false)
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

    setIsLoading(true);
    return  onEditAccountApi({userId, lastName, firstName, email, phoneNumber, profileImage})
              .then((response) => {
                setIsLoading(false);
                return (response)
              })
              .catch((error) => {
                if (error.response) {
                 throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => setIsLoading(false))
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
    setIsLoading(true);
    return  onDeleteAccountApi({email, password})
              .then((response) => {
                setIsLoading(false);
                return (response)
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => setIsLoading(false))
  }, [])

  // Lost password
  const onLostPassword = useCallback(( email : string ) => {
    if (!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }
    setIsLoading(true);
    return  onLostPasswordApi({ email })
              .then((response : any) => {
                setIsLoading(false);
                return (response)
              })
              .catch((error : any) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => setIsLoading(false))
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
      setIsLoading(true);
      return onResetPasswordApi({ new_password_token, email, password })
              .then((response : any) => {
                console.log("repsonse: ", response)
                setIsLoading(false)
                return (response)
              })
              .catch ((error : any) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => setIsLoading(false)) 
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
      })
    }

    setIsLoading(true);
    return  onChangePasswordApi({userId, newPassword})
              .then((response) => {
                  setIsLoading(false)
              })
              .catch((error) => {
                console.log("error:", error)
                if (error.response) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
              })
              .then(() => setIsLoading(false));
  }, [])

  // Get list of users 
  const onGetAllUsersAdmin = useCallback(() => {
    setIsLoading(true);
    return  onGetAllUsersByAdminApi()
              .then((response) => {
                setIsLoading(false)
                return (response)
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then((response) => { 
                setIsLoading(false)
                return response;
              })
  }, [])

  // Update given user (Available for admins only)
  const onUpdateAccountByAdmin = useCallback((
    { email, firstName, lastName, phoneNumber, roleName, password, id } :
    { email: string, firstName: string, lastName: string, phoneNumber? : string, roleName: string, password: string, id: number }
  ) => {
    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      })
    }
    if(!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      })
    }
    if(!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      })
    }
    if(!checkEmptyInput(roleName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_ROLE}`, {ns: "errors"}));
      })
    }
    setIsLoading(true);
    return onUpdateUserByAdminApi({ email, firstName, lastName, phoneNumber, roleName, password, id })
              .then((response) => {
                setIsLoading(false)
                return response;
              })
              .catch ((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
  }, [])

  // delete user account (Available for admins only)
  const onDeleteAccountByAdmin = useCallback(( 
    { id } :
    { id: number }
  ) => {
    setIsLoading(true);
    return  onDeleteAccountByAdminApi({ id })
              .then((response) => {
                setIsLoading(false);
                return (response)
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then(() => setIsLoading(false))
  }, [])

  // Create a user account (Available for admins only)
  const onCreateAccountByAdmin = useCallback(( 
    { email, firstName, lastName, phoneNumber, roleName } :
    { email: string, firstName: string, lastName: string, phoneNumber? : string, roleName: string }
  ) => {
    if(!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      })
    }
    if(!checkEmptyInput(firstName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_FIRSTNAME}`, {ns: "errors"}));
      })
    }
    if(!checkEmptyInput(lastName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_LASTNAME}`, {ns: "errors"}));
      })
    }
    if(!checkEmptyInput(roleName)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_ROLE}`, {ns: "errors"}));
      })
    }
    setIsLoading(true);
    return  onCreateAccountByAdminApi({firstName, lastName, email, phoneNumber, roleName })
              .then((response) => {
                setIsLoading(false);
                return (response)
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data)
                } else {
                  throw new Error(error.message)
                }
              })
              .then((response) => {
                setIsLoading(false)
                return (response)
              })
  }, [])

  return (
    <UserContext.Provider 
      {...props}
      value={{
        isLoading,
        onLostPassword,
        onResetPassword,
        onChangePassword,
        onGetCurrentUser,
        onGetAllUsersAdmin,
        onEditAccount,
        onUpdateAccountByAdmin,
        onDeleteAccount,
        onDeleteAccountByAdmin,
        onCreateAccountByAdmin,
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
