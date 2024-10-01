import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import PATH from '../constants/cts_routes';
import WrapperConnected from '../components/wrapper-connected';
// login / signup
import LoginScreen from './login/login';
import SignupScreen from './signup/signup';
import LostPasswordScreen from './lostPassword/lostPassword';
import ResetPassword from './resetPassword/resetPassword';
// home
import HomeScreen from './homeScreen/homeScreen';
// account
import AccountScreen from './account/account';
// items / products
import ItemsScreen from './items/items';
import ItemSingleScreen from './items/itemSingle';
// contact
import ContactScreen from './contact/contact';
// about and legals
import AboutScreen from './about/about';
import LegalNoticesScreen from './legalNotices/legalNotices';
import CheckoutScreen from '../components/CheckoutScreen';

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}
      >
        {/* login */}
        <Stack.Screen name={PATH.login} component={LoginScreen} />
        <Stack.Screen name={PATH.lost_pwd} component={LostPasswordScreen} />
        <Stack.Screen name={PATH.reset_pwd} component={ResetPassword} />
        {/* signup */}
        <Stack.Screen name={PATH.signup} component={SignupScreen} />
        {/* home */}
        <Stack.Screen name={PATH.home}>
          {() => (
            <WrapperConnected>
              <HomeScreen />
            </WrapperConnected>
          )}
        </Stack.Screen>
        {/* account */}
        <Stack.Screen name={PATH.account}>
          {() => (
            <WrapperConnected>
              <AccountScreen />
            </WrapperConnected>
          )}
        </Stack.Screen>
        {/* items */}
        <Stack.Screen name={PATH.items}>
          {() => (
            <WrapperConnected>
              <ItemsScreen />
            </WrapperConnected>
          )}
        </Stack.Screen>
        {/* item single */}
        <Stack.Screen name={PATH.item_single}>
          {() => (
            <ItemSingleScreen />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={PATH.checkout_screen}
          options={{headerShown: false}}
        >
          {() => (
            <CheckoutScreen />
          )}
        </Stack.Screen>
        {/* contact */}
        <Stack.Screen name={PATH.contact}>
          {() => (
            <WrapperConnected>
              <ContactScreen />
            </WrapperConnected>
          )}
        </Stack.Screen>
        {/* about */}
        <Stack.Screen name={PATH.about}>
          {() => (
            <WrapperConnected>
              <AboutScreen />
            </WrapperConnected>
          )}
        </Stack.Screen>
        {/* legal notices */}
        <Stack.Screen name={PATH.legals}>
          {() => (
            <WrapperConnected>
              <LegalNoticesScreen />
            </WrapperConnected>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
