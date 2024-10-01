import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PATH from '../../constants/cts_routes';
import {useAuthentication} from '../../common/contexts/authenticationContext';
import HeaderAuthScreen from '../../components/authScreens/HeaderAuth';
import {
  COLOR_BLACK,
  COLOR_GREY,
  COLOR_GREY_LIGHT,
  COLOR_SPECIAL,
} from '../../constants/cts_colors';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FormContainerAuth from '../../components/authScreens/FormContainerAuth';
import BottomContainerAuth from '../../components/authScreens/BottomContainerAuth';
import AppText from '../../components/AppText';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {t} = useTranslation();
  const [email, _setEmail] = useState<string>('');
  const [password, _setPassword] = useState<string>('');
  const [redirectToHome, _setRedirectToHome] = useState<boolean>(false);
  const {onLogin} = useAuthentication();
  const [hidePassword, _setHidePassword] = useState<boolean>(true);

  // after login pressed
  const handleSubmit = () => {
    onLogin({
      email,
      password,
    })
      .then(() => _setRedirectToHome(true))
      .catch(error => alert(error));
  };

  // after login, redirect to home
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
        mainTitle={t('mainTitle', {ns: 'loginScreen'})}
        onHandleSubmit={handleSubmit}>
        {/* email */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            autoCapitalize="none"
            value={email}
            placeholder={'' + t('form.placeholders.email', {ns: 'loginScreen'})}
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
        {/* password */}
        <View style={formStyles.inputsBox}>
          <TextInput
            style={formStyles.inputs}
            secureTextEntry={hidePassword} // check if user choose to show password
            autoCapitalize="none"
            value={password}
            placeholder={
              '' + t('form.placeholders.password', {ns: 'loginScreen'})
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
        {/* forgot password btn */}
        <TouchableOpacity
          style={formStyles.forgotPasswordBtn}
          onPress={() => navigation.push(PATH.lost_pwd)}>
          <Text style={formStyles.forgotPasswordBtnText}>
            {t('form.routeToLostPassword', {ns: 'loginScreen'})}
          </Text>
        </TouchableOpacity>
      </FormContainerAuth>

      {/* bottom */}
      {/* inside the component is the change language btn already implemented */}
      <BottomContainerAuth>
        {/* redirect to sign up */}
        <View style={bottom.redirectToSignUp}>
          {/* text */}
          <AppText style={bottom.redirectToSignUpText}>
            {t('form.routeToSignup.text', {ns: 'loginScreen'})}
          </AppText>
          {/* button */}
          <TouchableOpacity onPress={() => navigation.push(PATH.signup)}>
            <AppText style={bottom.redirectToSignUpBtnText}>
              {t('form.routeToSignup.button', {ns: 'loginScreen'})}
            </AppText>
          </TouchableOpacity>
        </View>
      </BottomContainerAuth>
    </ScrollView>
  );
};

export default LoginScreen;

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
  forgotPasswordBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '500',
    fontSize: 13,
  },
});

const bottom = StyleSheet.create({
  redirectToSignUp: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  redirectToSignUpText: {
    fontWeight: '500',
    marginRight: 5,
    color: COLOR_BLACK,
  },
  redirectToSignUpBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '600',
  },
});
