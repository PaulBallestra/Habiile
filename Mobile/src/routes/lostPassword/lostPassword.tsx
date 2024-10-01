import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../../common/contexts/userContext";
import FormContainerAuth from "../../components/authScreens/FormContainerAuth";
import HeaderAuthScreen from "../../components/authScreens/HeaderAuth";
import { COLOR_GREY, COLOR_GREY_LIGHT, COLOR_SPECIAL } from "../../constants/cts_colors";
import PATH from "../../constants/cts_routes";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MainContainerAuth from "../../components/authScreens/MainContainerAuth";
import BottomContainerAuth from "../../components/authScreens/BottomContainerAuth";

const LostPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t } = useTranslation();
  const [ email, _setEmail ] = useState<string>("");
  const [ submitted, _setSubmitted ] = useState<boolean>(false);
  const { onLostPassword } = useUser();

  const handleSubmit = () => {
    onLostPassword({email})
    .then(() => {
        _setSubmitted(true)
        // after a few seconds, redirect to reset pwd screen
        setTimeout(() => {
          navigation.push(PATH.reset_pwd);
        }, 2000);
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
        // form container
        <FormContainerAuth 
          mainTitle={t("mainTitle", {ns: "lostPasswordScreen"})}
          onHandleSubmit={handleSubmit}
        >
          {/* email input box */}
          <View style={formStyles.inputsBox}>
            <TextInput
              style={formStyles.inputs}
              autoCapitalize="none"
              value={email}
              placeholder={'' + t('form.placeholders.email', {ns: 'lostPasswordScreen'})}
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
          {/* route to login */}
          <TouchableOpacity
            style={formStyles.routeToLoginBtn}
            onPress={() => navigation.push(PATH.login)}
          >
            <Text style={formStyles.routeToLoginBtnText}>{t('form.routeToLogin', {ns: 'lostPasswordScreen'})}</Text>
          </TouchableOpacity>
        </FormContainerAuth>
        ) || (
          <MainContainerAuth mainTitle="">
            <Text>{t("formSubmittedInfo", {ns: "lostPasswordScreen"})} {email}</Text>
          </MainContainerAuth>
        )
      }


      {/* bottom container */}
      {/* inside the component is the change language btn already implemented */}
      <BottomContainerAuth />
    </ScrollView>
  )
}

export default LostPasswordScreen;

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
    alignSelf: 'flex-start',
  },
  routeToLoginBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '500',
    fontSize: 13,
  },
});