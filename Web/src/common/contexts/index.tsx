import React from "react";
import { AppProvider } from "./appContext";
import { AuthenticationProvider } from "./authenticationContext";
import { UserProvider } from "./userContext";
import { ItemsProvider } from "./itemContext";
import { PaymentProvider } from "./paymentContext";

const Providers = (props: any) => {
  return (
    <PaymentProvider>
      <UserProvider>
        <AppProvider>
          <ItemsProvider>
            <AuthenticationProvider {...props} />
          </ItemsProvider>
        </AppProvider>
      </UserProvider>
    </PaymentProvider>
  )
}

export default Providers;