import React, { createContext, useContext, useState, SetStateAction, useCallback } from "react";
import { APP_MSG } from "../../constants/cts_contextErrors";
import { IAppContext } from '../../interfaces/appContext' 

const AppContext = createContext(null)

export const AppProvider = (props : any) => {
  const [ isLoading, _setIsLoading ] = useState<boolean>(false);

  return (
    <AppContext.Provider 
      {...props}
      value={{
        isLoading,
        // function
      }}
    /> 
  )
}

export const useApp = () : IAppContext => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error(APP_MSG);
  return context;
}
