import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useApp } from "../../common/contexts/appContext";
import { COLOR_GRADIENT_2, COLOR_SPECIAL, COLOR_WHITE } from "../../constants/cts_colors";
import { languages } from "../../constants/cts_languages";

/*

[ BottomContainerAuth ] - is the footer of the auth screens (login, signup, forgot password...)
It consists of a container with all general elements (select dropdown for change the language in this case) that will appear in all the auth screens

--------- PROPS ----------
{ children } * type: ReactNode 
Insert unique (dom) elements for the screens we want
  
*/

const BottomContainerAuth = ({children}: {children?: ReactNode}) => {
  const {i18n} = useTranslation();
  const { onSendLanguage } = useApp();

  // change language function
  const changeLanguage = (lang) => {
    onSendLanguage(lang)
      .then(() => i18n.changeLanguage(lang));
  }

  return (
    // bottom container
    <View style={bottom.container}>
      {/* change language */}
      <SelectDropdown
        defaultButtonText="Change language"
        data={languages}
        onSelect={(lang) => {
          changeLanguage(lang.code)
        }}
        buttonTextAfterSelection={(lang) => {
          return lang.nativeName
        }}
        rowTextForSelection={(lang) => {
          return lang.nativeName
        }}
        buttonStyle={bottom.changeLangBtn}
        buttonTextStyle={bottom.changeLangBtnText}
      />
      <View>{children}</View>
    </View>
  );
}

export default BottomContainerAuth;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/


const bottom = StyleSheet.create({
  container: {
    marginTop: '25%',
    alignItems: 'center',
  },
  changeLangBtn: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: COLOR_GRADIENT_2,
    marginBottom: 20,
  },
  changeLangBtnText: {
    color: COLOR_WHITE,
    fontWeight: '500',
  },
  redirectToSignUp: {
    flexDirection: "row",
    marginBottom: 20,
  },
  redirectToSignUpText: {
    fontWeight: '500',
  },
  redirectToSignUpBtnText: {
    color: COLOR_SPECIAL,
    fontWeight: '600',
  },
});