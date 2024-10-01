import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, StyleSheet, View, TouchableOpacity, GestureResponderEvent } from "react-native";
import AppText from "../../components/AppText";
import Box from "../../components/Box";
import SectionTitle from "../../components/SectionTitle";
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_SPECIAL } from "../../constants/cts_colors";

/* 

[ ChangePasswordComponent ] - form that is shown / hidden depending of the value of isChangingPassword variable

---------- PROPS ----------
{ isChangingPassword } * type: boolean
Variable that decides to show or hide the form

{ onSaveBasicInfos } * type: (event: GestureResponderEvent) => void
Function that triggers the api request function from the parent component

{ onEditBasicInfos } * type: onEditBasicInfos: (event: GestureResponderEvent) => void
Function that toggles the edit mode (on / off) in the parrent component.

{ password } * type: string
the account's new password (form input value)

{ repeatPassword } * type: string | null | undefined
the account's new repeated password (form input value)

{ _setPassword } * type: React.Dispatch<React.SetStateAction<string>>
set the value state of password - input's text change

{ _setRepeatPassword } * type: Dispatch<SetStateAction<string | null | undefined>>
set the value state of repeatPassword - input's text change

{ openChangePasswordForm } * type: (event: GestureResponderEvent) => void
Function that sets the value of isChangingPassword variable at true. (on the parrent component)

{ handleChangePassword } * type: (event: GestureResponderEvent) => void
Function that triggers an api change password request. (on the parent component)

*/

const ChangePasswordComponent = ({isChangingPassword, password, repeatPassword, _setPassword, _setRepeatPassword, openChangePasswordForm, handleChangePassword}: 
  {
    isChangingPassword: boolean, 
    password: string, 
    repeatPassword: string, 
    _setPassword: React.Dispatch<React.SetStateAction<string>>,
    _setRepeatPassword: React.Dispatch<React.SetStateAction<string>>, 
    openChangePasswordForm: (event: GestureResponderEvent) => void, 
    handleChangePassword: (event: GestureResponderEvent) => void,
  }
  ) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={top.container}>
        <SectionTitle>{t('sections.changePassword.title', {ns: 'accountScreen'})}</SectionTitle>
          {/* check if user is in changing password mode */}
          {
            isChangingPassword ? (
              // save btn
              <TouchableOpacity
                onPress={handleChangePassword}
              >
                <AppText style={top.btnText}>{t('sections.changePassword.saveBtn', {ns: 'accountScreen'})}</AppText>
              </TouchableOpacity>
            ) : (
              // open form btn
              <TouchableOpacity
                onPress={openChangePasswordForm}
              >
                <AppText style={top.btnText}>{t('sections.changePassword.changeBtn', {ns: 'accountScreen'})}</AppText>
              </TouchableOpacity>
            )
          }
      </View>
      
      {/* show change password form if user clicked on (change) btn */}
      {
        isChangingPassword && 
        <Box style={form.box}>
          {/* password */}
          <Text style={form.labelsFirst}>{t('sections.changePassword.form.texts.password', {ns: 'accountScreen'})}</Text>
          <TextInput
            style={form.inputs}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            placeholder={'' + t('sections.changePassword.form.placeholders.password', {ns: 'accountScreen'})}
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setPassword(inputValue)}
          />
          {/* repeat password */}
          <Text style={form.labels}>{t('sections.changePassword.form.texts.repeatPassword', {ns: 'accountScreen'})}</Text>
          <TextInput
            style={form.inputs}
            secureTextEntry
            autoCapitalize="none"
            value={repeatPassword}
            placeholder={'' + t('sections.changePassword.form.placeholders.repeatPassword', {ns: 'accountScreen'})}
            placeholderTextColor={COLOR_GREY}
            onChangeText={inputValue => _setRepeatPassword(inputValue)}
          />
        </Box>
      }
    </View>
    
  );
}

export default ChangePasswordComponent;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const top = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnText: {
    color: COLOR_SPECIAL,
  },
})

const form = StyleSheet.create({
  box: {
    borderRadius: 10,
  },
  labels: {
    marginTop: 10,
    color: COLOR_GREY,
    fontSize: 12,
  },
  labelsFirst: { // no top margin for the first label
    color: COLOR_GREY,
    fontSize: 12,
  },
  inputs: {
    color: COLOR_BLACK,
    borderBottomColor: COLOR_GREY_LIGHT,
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
});