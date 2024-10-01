import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, TouchableOpacity, TextInput, GestureResponderEvent } from "react-native";
import AppText from "../../components/AppText";
import Box from "../../components/Box";
import SectionTitle from "../../components/SectionTitle";
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_SPECIAL } from "../../constants/cts_colors";

/* 

[ DeleteAccountComponent ] - form that is shown / hidden depending of the value of isDeletingAccount variable

---------- PROPS ----------
{ isDeletingAccount } * type: boolean
Variable that decides to show or hide the form

{ openDeleteAccountForm } * type: (event: GestureResponderEvent) => void
Function that changes the value of the isDeletingAccount variable to true. That triggers the component to show.

{ deleteAccountFormEmail } * type: (event: GestureResponderEvent) => string
the value of the form email input - (used to check if this is the correct account's email)

{ deleteAccountFormPassword } * type: (event: GestureResponderEvent) => string
the value of the form password input - (used to check if this is the correct account's password)

{ _setDeleteAccountFormEmail } * type: React.Dispatch<React.SetStateAction<string>>
set the value state of email variable - input's text change

{ _setDeleteAccountFormPassword } * type: Dispatch<SetStateAction<string | null | undefined>>
set the value state of password variable - input's text change

*/

const DeleteAccountComponent = ({isDeletingAccount, handleDeleteAccount, openDeleteAccountForm, deleteAccountFormEmail, deleteAccountFormPassword, _setDeleteAccountFormEmail, _setDeleteAccountFormPassword}: 
  {
    isDeletingAccount: boolean,
    handleDeleteAccount: (event: GestureResponderEvent) => void, 
    openDeleteAccountForm: (event: GestureResponderEvent) => void,
    deleteAccountFormEmail: string, 
    deleteAccountFormPassword: string, 
    _setDeleteAccountFormEmail: React.Dispatch<React.SetStateAction<string>>, 
    _setDeleteAccountFormPassword: React.Dispatch<React.SetStateAction<string>>,
  }
  ) => {
  const { t } = useTranslation();

  return (
    <View>
      <View>
        <View style={top.container}>
          <SectionTitle>{t('sections.deleteAccount.title', {ns: 'accountScreen'})}</SectionTitle>
            {/* check if user is in changing password mode */}
            {
              isDeletingAccount ? (
                // confirm delete account btn
                <TouchableOpacity
                  onPress={handleDeleteAccount}
                >
                  <AppText style={top.btnText}>{t('sections.deleteAccount.confirmDeleteBtn', {ns: 'accountScreen'})}</AppText>
                </TouchableOpacity>
              ) : (
                // open form btn
                <TouchableOpacity
                  onPress={openDeleteAccountForm}
                >
                  <AppText style={top.btnText}>{t('sections.deleteAccount.deleteBtn', {ns: 'accountScreen'})}</AppText>
                </TouchableOpacity>
              )
            }
        </View>
        
        {/* delete account form */}
        {/* check if user clicked on delete account btn */}
        {
          isDeletingAccount &&
          <Box style={form.box}>
            {/* delete account - form email */}
            <AppText style={form.labelsFirst}>{t('sections.deleteAccount.form.texts.email', {ns: 'accountScreen'})}</AppText>
            <TextInput
              style={form.inputs}
              autoCapitalize="none"
              value={deleteAccountFormEmail}
              placeholder={'' + t('sections.deleteAccount.form.placeholders.email', {ns: 'accountScreen'})}
              placeholderTextColor={COLOR_GREY}
              onChangeText={inputValue => _setDeleteAccountFormEmail(inputValue)}
            />
            {/* delete account - form password */}
            <AppText style={form.labels}>{t('sections.deleteAccount.form.texts.password', {ns: 'accountScreen'})}</AppText>
            <TextInput
              secureTextEntry
              style={form.inputs}
              autoCapitalize="none"
              value={deleteAccountFormPassword}
              placeholder={'' + t('sections.deleteAccount.form.placeholders.password', {ns: 'accountScreen'})}
              placeholderTextColor={COLOR_GREY}
              onChangeText={inputValue => _setDeleteAccountFormPassword(inputValue)}
            />
          </Box>
        }
      </View>
    </View>
  );
}

export default DeleteAccountComponent;

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