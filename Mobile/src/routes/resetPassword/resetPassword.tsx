import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import PATH from "../../constants/cts_routes";
import { useUser } from "../../common/contexts/userContext";
import HeaderAuthScreen from "../../components/authScreens/HeaderAuth";
import FormContainerAuth from "../../components/authScreens/FormContainerAuth";
import { COLOR_GREY, COLOR_GREY_LIGHT, COLOR_SPECIAL } from "../../constants/cts_colors";
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MainContainerAuth from "../../components/authScreens/MainContainerAuth";
import BottomContainerAuth from "../../components/authScreens/BottomContainerAuth";
import AppText from "../../components/AppText";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [ submitted, _setSubmitted ] = useState<boolean>(false);
  const [ token, _setToken ] = useState<string>("");
  const [ email, _setEmail ] = useState<string>("");
  const [ password, _setPassword ] = useState<string>("");
  const [ repeatPassword, _setRepeatPassword ] = useState<string>("");
  const { onResetPassword } = useUser();
  const [ hidePassword, _setHidePassword ] = useState<boolean>(true);
  const [ hideRepeatPassword, _setHideRepeatPassword ] = useState<boolean>(true);

  const handleSubmit = () => {
    onResetPassword({
      new_password_token: token,
      email,
      password,
      repeatPassword,
    })
    .then(() => {
        _setSubmitted(true)
      })
    .catch(error => {
      alert(error)
    })
  }

  return (
    <ScrollView>
      {/* header */}
      <HeaderAuthScreen />

      {/* if form not submitted, show form, else show submitted info */}
      {
        !submitted &&
        (
          // main container
          <FormContainerAuth 
            mainTitle={t('mainTitle', {ns: 'resetPasswordScreen'})}
            onHandleSubmit={handleSubmit}
          >
            {/* token */}
            <View style={formStyles.inputsBox}>
              <TextInput
                style={formStyles.inputs}
                autoCapitalize="none"
                value={token}
                placeholder={'' + t('form.placeholders.token', {ns: 'resetPasswordScreen'})}
                placeholderTextColor={COLOR_GREY}
                onChangeText={inputValue => _setToken(inputValue)}
              />
              <IconFontAwesome5
                name="key"
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
                placeholder={'' + t('form.placeholders.email', {ns: 'resetPasswordScreen'})}
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
                placeholder={'' + t('form.placeholders.password', {ns: 'resetPasswordScreen'})}
                placeholderTextColor={COLOR_GREY}
                onChangeText={inputValue => _setPassword(inputValue)}
              />
              {/* toggle show password btn */}
              {
                hidePassword ? (
                  <TouchableOpacity
                    onPress={() => _setHidePassword(false)}
                  >
                    <IconFontAwesome5
                      name="eye-slash"
                      style={formStyles.inputsIcon} 
                      size={15}
                      color={COLOR_GREY}
                    />
                  </TouchableOpacity>
                ) : (
                <TouchableOpacity
                  onPress={() => _setHidePassword(true)}
                >
                  <IconFontAwesome5
                    name="eye"
                    style={formStyles.inputsIcon} 
                    size={15}
                    color={COLOR_GREY}
                  />
                </TouchableOpacity>
                )
              }
            </View>
            {/* password ends here */}

            {/* repeat password */}
            <View style={formStyles.inputsBox}>
              <TextInput
                style={formStyles.inputs}
                secureTextEntry={hideRepeatPassword} // check if user choose to show password
                autoCapitalize="none"
                value={repeatPassword}
                placeholder={'' + t('form.placeholders.repeatPassword', {ns: 'resetPasswordScreen'})}
                placeholderTextColor={COLOR_GREY}
                onChangeText={inputValue => _setRepeatPassword(inputValue)}
              />
              {/* toggle show password btn */}
              {
                hideRepeatPassword ? (
                  <TouchableOpacity
                    onPress={() => _setHideRepeatPassword(false)}
                  >
                    <IconFontAwesome5
                      name="eye-slash"
                      style={formStyles.inputsIcon} 
                      size={15}
                      color={COLOR_GREY}
                    />
                  </TouchableOpacity>
                ) : (
                <TouchableOpacity
                  onPress={() => _setHideRepeatPassword(true)}
                >
                  <IconFontAwesome5
                    name="eye"
                    style={formStyles.inputsIcon} 
                    size={15}
                    color={COLOR_GREY}
                  />
                </TouchableOpacity>
                )
              }
            </View>
            {/* repeat password ends here */}

          </FormContainerAuth>
        ) || (
          // password changed info
          <MainContainerAuth mainTitle="">
            <View style={afterSubmit.routeToLogin}>
              {/* first part */}
              <AppText style={afterSubmit.routeToLoginText}>{t('passwordChangedInfo.firstPartText', {ns: 'resetPasswordScreen'})}</AppText>
              {/* button */}
              <TouchableOpacity 
                onPress={() => navigation.push(PATH.login)} 
              >
                <AppText style={afterSubmit.routeToLoginBtnText}>{t('passwordChangedInfo.button', {ns: 'resetPasswordScreen'})}</AppText>
              </TouchableOpacity>
              {/* last part */}
              <AppText style={afterSubmit.routeToLoginText}>{t('passwordChangedInfo.lastPartText', {ns: 'resetPasswordScreen'})}</AppText>
            </View>
          </MainContainerAuth>
        )
      }

    {/* bottom container */}
    {/* inside the component is the change language btn already implemented */}
    <BottomContainerAuth>
      {/* dev - route to login */}
      <TouchableOpacity
        onPress={() => navigation.push(PATH.login)}
      >
        <Text style={bottom.redirectToLoginText}>{t('bottom.redirectToLogin', {ns: 'resetPasswordScreen'})}</Text>
      </TouchableOpacity>
    </BottomContainerAuth>

    </ScrollView>
  )
}

export default ResetPassword;

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
});

const afterSubmit = StyleSheet.create({
  routeToLogin: {
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  routeToLoginText: {
    fontWeight: '500',
    marginRight: 5,
  },
  routeToLoginBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '600',
    marginRight: 5,
  },
});

const bottom = StyleSheet.create({
  redirectToLoginText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: COLOR_SPECIAL,
  }
})