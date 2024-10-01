import React from 'react';
import {AuthenticationProvider} from './authenticationContext';
import {ItemProvider} from './itemContext';
import {UserProvider} from './userContext';
import {AppProvider} from './appContext';
import {PaymentProvider} from './paymentContext';

const Providers = (props: any) => {
  return (
    <PaymentProvider>
      <AppProvider>
        <ItemProvider>
          <UserProvider>
            <AuthenticationProvider {...props} />
          </UserProvider>
        </ItemProvider>
      </AppProvider>
    </PaymentProvider>
  );
};

export default Providers;
