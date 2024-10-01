import React from "react";
import { AppProvider } from "./appContext";
import { AuthenticationProvider } from "./authenticationContext";
import { UserProvider } from "./userContext";
import { MessagesProvider } from "./messageContext";
import {ItemsProvider } from "./itemContext";

const Providers = (props: any) => {
  return (
    <UserProvider>
      <AppProvider>
        <MessagesProvider>
          <ItemsProvider>
            <AuthenticationProvider {...props} />
          </ItemsProvider>
        </MessagesProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default Providers;