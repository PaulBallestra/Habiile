import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";
import Box from "../../components/Box";
import SectionTitle from "../../components/SectionTitle";
import AppText from "../../components/AppText";
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_SPECIAL } from "../../constants/cts_colors";

/* 

[ BasicInfosComponent ] - component that consists of a form with the account's information

---------- PROPS ----------
{ isEditingBasicInfos } * type: boolean
This variable checks if the component is in editing mode or not

{ onSaveBasicInfos } * type: (event: GestureResponderEvent) => void
Function that triggers the api request function from the parent component

{ onEditBasicInfos } * type: onEditBasicInfos: (event: GestureResponderEvent) => void
Function that toggles the edit mode (on / off) in the parrent component.

{ firstName } * type: string
the account's first name (form input value)

{ lastName } * type: string
the account's last name (form input value)

{ email } * type: string
the account's email (form input value)

{ phoneNumber } * type: string | null | undefined
the account's phone number (form input value)

{ _setFirstName } * type: React.Dispatch<React.SetStateAction<string>>
set the value state of firstName - input's text change 

{ _setLastName } * type: React.Dispatch<React.SetStateAction<string>>
set the value state of lastName - input's text change 

{ _setEmail } * type: React.Dispatch<React.SetStateAction<string>>
set the value state of email - input's text change

{ _setPhoneNumber } * type: Dispatch<SetStateAction<string | null | undefined>>
set the value state of phoneNumber - input's text change

*/

const BasicInfosComponent = (
  {isEditingBasicInfos, onSaveBasicInfos, onEditBasicInfos, firstName, lastName, email, phoneNumber, _setFirstName, _setLastName, _setEmail, _setPhoneNumber}:
  {
    isEditingBasicInfos: boolean, 
    onSaveBasicInfos: (event: GestureResponderEvent) => void, 
    onEditBasicInfos: (event: GestureResponderEvent) => void, 
    firstName: string, 
    lastName: string, 
    email: string, 
    phoneNumber: string | null | undefined, 
    _setFirstName: React.Dispatch<React.SetStateAction<string>>, 
    _setLastName: React.Dispatch<React.SetStateAction<string>>, 
    _setEmail: React.Dispatch<React.SetStateAction<string>>, 
    _setPhoneNumber: Dispatch<SetStateAction<string | null | undefined>> }
) => {
  const { t } = useTranslation();

  return (
    <View>
      {/* basic infos - title and edit/save btn */}
      <View style={top.container}>
        <SectionTitle>{t("sections.basicInfos.title", {ns: "accountScreen"})}</SectionTitle>
        {/* check if user is in the edit infos mode */}
        {
          isEditingBasicInfos ? (
            // save btn
            <TouchableOpacity
              onPress={onSaveBasicInfos}
            >
              <AppText style={top.btnText}>{t("sections.basicInfos.saveBtn", {ns: "accountScreen"})}</AppText>
            </TouchableOpacity>
          ) : (
            // edit btn
            <TouchableOpacity
              onPress={onEditBasicInfos}
            >
              <AppText style={top.btnText}>{t("sections.basicInfos.editBtn", {ns: "accountScreen"})}</AppText>
            </TouchableOpacity>
          )
        }
      </View>
      {/* basic infos - box/form */}
      <Box style={form.box}>
        {/* last name */}
        <Text style={form.labelsFirst}>{t('sections.basicInfos.form.texts.lastName', {ns: 'accountScreen'})}</Text>
        <TextInput
          style={form.inputs}
          editable={isEditingBasicInfos} // give the possibility to edit if the form is on edit mode
          value={lastName}
          placeholder={'' + t('sections.basicInfos.form.placeholders.lastName', {ns: 'accountScreen'})}
          placeholderTextColor={COLOR_GREY}
          onChangeText={inputValue => _setLastName(inputValue)}
        />
        {/* first name */}
        <Text style={form.labels}>{t('sections.basicInfos.form.texts.firstName', {ns: 'accountScreen'})}</Text>
        <TextInput
          style={form.inputs}
          editable={isEditingBasicInfos} // give the possibility to edit if the form is on edit mode
          value={firstName}
          placeholder={'' + t('sections.basicInfos.form.placeholders.firstName', {ns: 'accountScreen'})}
          placeholderTextColor={COLOR_GREY}
          onChangeText={inputValue => _setFirstName(inputValue)}
        />
        {/* email */}
        <Text style={form.labels}>{t('sections.basicInfos.form.texts.email', {ns: 'accountScreen'})}</Text>
        <TextInput
          style={form.inputs}
          editable={isEditingBasicInfos} // give the possibility to edit if the form is on edit mode
          autoCapitalize="none"
          value={email}
          placeholder={'' + t('sections.basicInfos.form.placeholders.email', {ns: 'accountScreen'})}
          placeholderTextColor={COLOR_GREY}
          onChangeText={inputValue => _setEmail(inputValue)}
        />
        {/* phone number */}
        <Text style={form.labels}>{t('sections.basicInfos.form.texts.phoneNumber', {ns: 'accountScreen'})}</Text>
        <TextInput
          style={form.inputs}
          editable={isEditingBasicInfos} // give the possibility to edit if the form is on edit mode
          keyboardType="numeric"
          value={"" + phoneNumber}
          placeholder={'' + t('sections.basicInfos.form.placeholders.phoneNumber', {ns: 'accountScreen'})}
          placeholderTextColor={COLOR_GREY}
          onChangeText={inputValue => _setPhoneNumber(inputValue)}
        />
      </Box>
    </View>
  )
}

export default BasicInfosComponent;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const top = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginVertical: 15,
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
