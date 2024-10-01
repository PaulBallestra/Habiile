/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppRoutes from './routes/routes';
import Providers from './common/contexts';
import * as Sentry from '@sentry/react-native';


Sentry.init({
  dsn: env.sentryApi,
  tracesSampleRate: 1.0,
  integrations: [new Sentry.ReactNativeTracing()],
});

const App = () => {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
};

export default App;
