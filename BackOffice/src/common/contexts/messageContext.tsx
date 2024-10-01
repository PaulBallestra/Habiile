import React, { createContext, useCallback, useContext, useState } from "react";
import { onDeleteMessageApi, onGetAllMessagesApi, onUpdateMessageApi } from "../../api/messages.api";
import { MESSAGE_MSG } from "../../constants/cts_contextErrors";
import { IMessageContext } from "../../interfaces/message";
import { useTranslation } from "react-i18next";
import { checkEmptyInput } from "../../utils/checkInputs";
import { EMPTY_CONTACT_MESSAGE, EMPTY_CONTACT_STATUS, EMPTY_EMAIL, EMPTY_FIRSTNAME, EMPTY_LASTNAME } from "../../constants/cts_formErrors";

const MessageContext = createContext(null)

export const MessagesProvider = (props : any) => {
  const { t } = useTranslation()
  const [ isLoading, setIsLoading ] = useState(false)

  const onGetAllMessages = useCallback(() => {
    setIsLoading(true);
    return  onGetAllMessagesApi()
              .then((response) => {
                setIsLoading(false)
                return response;
              })
              .catch((error) => {
                if(error.message)
                  throw new Error(error.message.data)
                else
                  throw new Error(error.message)
              })
              .then((response) => {
                setIsLoading(false)
                return response;
              })
  }, [])

  const onDeleteMessage = useCallback((
    { id } :
    { id: number }) => {
    setIsLoading(true);
    return  onDeleteMessageApi(id) 
              .then((response) => {
                setIsLoading(false)
                return response;
              })
              .catch((error) => {
                if(error.message)
                  throw new Error(error.message.data)
                else
                  throw new Error(error.message)
              })
              .then((response) => {
                setIsLoading(false)
                return response;
              })
  }, [])

  const onUpdateMessage = useCallback((
    {id, status, email, firstName, lastName, phoneNumber, message}: 
    {id: number, status: string, email: string, firstName: string, lastName: string, phoneNumber: string, message: string}
  ) => {
    if (!checkEmptyInput(status)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_CONTACT_STATUS}`, {ns: "errors"}));
      });
    }
    if (!checkEmptyInput(email)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_EMAIL}`, {ns: "errors"}));
      });
    }
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
    if (!checkEmptyInput(message)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_CONTACT_MESSAGE}`, {ns: "errors"}));
      });
    }
    setIsLoading(true);
    return  onUpdateMessageApi({ id, status, email, firstName, lastName, phoneNumber, message })
              .then((response) => {
                setIsLoading(false)
                return response;
              })
              .catch((error) => {
                if(error.message)
                  throw new Error(error.message.data)
                else
                  throw new Error(error.message)
              })
              .then((response) => {
                setIsLoading(false)
                return response;
              })
  }, [])


  return (
    <MessageContext.Provider
      {...props}
      value={{
        isLoading,
        onGetAllMessages,
        onDeleteMessage,
        onUpdateMessage,
      }}
    />
  )
}

export const useMessage = () : IMessageContext => {
  const context = useContext(MessageContext)
  if (!context)
    throw new Error(MESSAGE_MSG);
  return context;
}