import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PATH from '../../constants/cts_routes';
import {useAuthentication} from '../../common/contexts/authenticationContext';
import {useUser} from '../../common/contexts/userContext';
import {useApp} from '../../common/contexts/appContext';
import HeaderAuthScreen from '../../components/authScreens/HeaderAuth';
import FormContainerAuth from '../../components/authScreens/FormContainerAuth';
import {
  COLOR_BLACK,
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  COLOR_SPECIAL,
} from '../../constants/cts_colors';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppText from '../../components/AppText';
import BottomContainerAuth from '../../components/authScreens/BottomContainerAuth';

const SignupScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {t, i18n} = useTranslation();
  const [lastName, _setLastName] = useState<string>('');
  const [firstName, _setFirstName] = useState<string>('');
  const [email, _setEmail] = useState<string>('');
  const [phoneNumber, _setPhoneNumber] = useState<string>();
  const [password, _setPassword] = useState<string>('');
  const [repeatPassword, _setRepeatPassword] = useState<string>('');
  const [redirectToHome, _setRedirectToHome] = useState<boolean>(false);
  const {onCreateAccount} = useUser();
  const {onLogin} = useAuthentication();
  const {onSendLanguage} = useApp();
  const [hidePassword, _setHidePassword] = useState<boolean>(true);
  const [hideRepeatPassword, _setHideRepeatPassword] = useState<boolean>(true);

  // change language function
  const changeLanguage = lang => {
    onSendLanguage(lang).then(() => i18n.changeLanguage(lang));
  };

  // after sign up pressed
  const handleSubmit = () => {
    onCreateAccount({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      repeatPassword,
    })
      .then(() => {
        onLogin({email, password}).then(() => {
          _setRedirectToHome(true);
        });
      })
      .catch(err => {
        alert(err);
      });
  };

  // after signup, redirect to home
  useEffect(() => {
    if (redirectToHome) {
      return navigation.push(PATH.home);
    }
  }, [redirectToHome]);

  return (
    <ScrollView>
      {/* header */}
      <HeaderAuthScreen />

      {/* main container */}
      <FormContainerAuth
        mainTitle={t('mainTitle', {ns: 'signupScreen'})}
        onHandleSubmit={handleSubmit}>
        {/* last name */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            value={lastName}
            placeholder={
              '' + t('form.placeholders.lastName', {ns: 'signupScreen'})
            }
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setLastName(inputValue)}
          />
          <IconFontAwesome
            name="user-o"
            style={formStyles.inputsIcon}
            size={15}
            color={COLOR_GREY}
          />
        </View>
        {/* first name */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            value={firstName}
            placeholder={
              '' + t('form.placeholders.firstName', {ns: 'signupScreen'})
            }
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setFirstName(inputValue)}
          />
          <IconFontAwesome
            name="user-o"
            style={formStyles.inputsIcon}
            size={15}
            color={COLOR_GREY}
          />
        </View>
        {/* email */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            autoCapitalize="none"
            value={email}
            placeholder={
              '' + t('form.placeholders.email', {ns: 'signupScreen'})
            }
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setEmail(inputValue)}
          />
          <IconFontAwesome
            name="envelope-o"
            style={formStyles.inputsIcon}
            size={15}
            color={COLOR_GREY}
          />
        </View>
        {/* phone number */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            keyboardType="numeric"
            value={phoneNumber}
            placeholder={
              '' + t('form.placeholders.phoneNumber', {ns: 'signupScreen'})
            }
            placeholderTextColor={COLOR_GREY_LIGHT}
            onChangeText={inputValue => _setPhoneNumber(inputValue)}
          />
          <IconFontAwesome
            name="mobile-phone"
            style={formStyles.inputsIcon}
            size={25}
            color={COLOR_GREY}
          />
        </View>

        {/* password */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            secureTextEntry={hidePassword} // check if user choose to show password
            autoCapitalize="none"
            value={password}
            placeholder={
              '' + t('form.placeholders.password', {ns: 'signupScreen'})
            }
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setPassword(inputValue)}
          />
          {/* toggle show password btn */}
          {hidePassword ? (
            <TouchableOpacity onPress={() => _setHidePassword(false)}>
              <IconFontAwesome5
                name="eye-slash"
                style={formStyles.inputsIcon}
                size={15}
                color={COLOR_GREY}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => _setHidePassword(true)}>
              <IconFontAwesome5
                name="eye"
                style={formStyles.inputsIcon}
                size={15}
                color={COLOR_GREY}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* password ends here */}

        {/* repeat password */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            secureTextEntry={hideRepeatPassword} // check if user choose to show password
            autoCapitalize="none"
            value={repeatPassword}
            placeholder={
              '' +
              t('form.placeholders.repeatPassword', {ns: 'resetPasswordScreen'})
            }
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setRepeatPassword(inputValue)}
          />
          {/* toggle show password btn */}
          {hideRepeatPassword ? (
            <TouchableOpacity onPress={() => _setHideRepeatPassword(false)}>
              <IconFontAwesome5
                name="eye-slash"
                style={formStyles.inputsIcon}
                size={15}
                color={COLOR_GREY}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => _setHideRepeatPassword(true)}>
              <IconFontAwesome5
                name="eye"
                style={formStyles.inputsIcon}
                size={15}
                color={COLOR_GREY}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* repeat password end here */}

        {/* forgot password btn */}
        <TouchableOpacity
          style={formStyles.routeToLoginBtn}
          onPress={() => navigation.push(PATH.login)}>
          <AppText style={formStyles.routeToLoginBtnText}>
            {t('form.routeToLogin', {ns: 'signupScreen'})}
          </AppText>
        </TouchableOpacity>
      </FormContainerAuth>

      {/* inside the component is the change language btn already implemented */}
      <BottomContainerAuth>
        {/* redirect to sign up */}
        <View style={bottom.redirectToLogin}>
          {/* text */}
          <AppText style={bottom.redirectToLoginText}>
            {t('form.redirectToLogin.text', {ns: 'signupScreen'})}
          </AppText>
          {/* button */}
          <TouchableOpacity onPress={() => navigation.push(PATH.login)}>
            <AppText style={bottom.redirectToLoginBtnText}>
              {t('form.redirectToLogin.button', {ns: 'signupScreen'})}
            </AppText>
          </TouchableOpacity>
        </View>
      </BottomContainerAuth>
    </ScrollView>
  );
};

export default SignupScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const formStyles = StyleSheet.create({
  inputsBox: {
    marginTop: 25,
  },
  inputs: {
    borderBottomColor: COLOR_GREY_LIGHT,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  inputsIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15,
  },
  routeToLoginBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  routeToLoginBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '500',
    fontSize: 13,
  },
});

const bottom = StyleSheet.create({
  redirectToLogin: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  redirectToLoginText: {
    fontWeight: '500',
    marginRight: 5,
    color: COLOR_BLACK,
  },
  redirectToLoginBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '600',
  },
});
