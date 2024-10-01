import React, { createContext, SetStateAction, useCallback, useContext, useState } from "react";
import { APP_MSG } from "../../constants/cts_contextErrors";
import { onSendLanguageApi } from "../../api/language.api";
import { IAppContext } from "../../interfaces/appContext";

const AppContext = createContext(null)

export const AppProvider = (props : any) => {
  const [ isLoading, _setIsLoading ] = useState(false);
  const [ language, _setLanguage ] = useState<SetStateAction<undefined> | string>();

  const onSendLanguage = useCallback( async (lang: string) => {
    _setIsLoading(true);
    return  onSendLanguageApi(lang)
              .then((response: any) => {
                _setIsLoading(false)
                _setLanguage(lang)
                return (response)
              })
              .catch((error: any) => {
                if(error.response) {
                  throw new Error(error.message.data);
                } else {
                  throw new Error(error.message);
                }
              })
              .then(() => _setIsLoading(false));
  }, [])

  return (
    <AppContext.Provider 
      {...props}
      value={{
        isLoading,
        language,
        // function
        onSendLanguage,
      }}
    /> 
  )
}

export const useApp = (): IAppContext => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error(APP_MSG);
  return context;
}
