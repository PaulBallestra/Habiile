import { useNavigation, useRoute } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLOR_GRADIENT_2, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_SPECIAL, COLOR_WHITE } from "../constants/cts_colors";
import PATH from "../constants/cts_routes";
import { MENU_BAR_HEIGHT } from "../constants/cts_sizes";
import { languages } from "../constants/cts_languages";
import { useApp } from "../common/contexts/appContext";
import { useTranslation } from "react-i18next";

/* 
[ MenuConnectedComponent ] - the menu bar / footer of the screen when the user is connected
*/

// configs applied to the icons
const MENU_ICONS = {
  size: 20,
  color: COLOR_GREY_LIGHT,
  colorActive: COLOR_SPECIAL, // for the icon corresponding to the current route
}

const MenuConnectedComponent = () => {
  const {i18n} = useTranslation();
  const { onSendLanguage } = useApp();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const currentRoute = route.name;

  // change language function
  const changeLanguage = (lang) => {
    onSendLanguage(lang)
      .then(() => i18n.changeLanguage(lang));
  }

  return (
    <View style={menu.container}>

      {/* home button */}
      <TouchableOpacity>
        <IconFontAwesome5
          name="home"
          size={MENU_ICONS.size}
          color={currentRoute === PATH.home ? MENU_ICONS.colorActive : MENU_ICONS.color}
          onPress={() => navigation.push(PATH.home)}
        />
      </TouchableOpacity>

      {/* contact btn */}
      <TouchableOpacity>
        <IconFontAwesome
          name="envelope"
          size={MENU_ICONS.size}
          color={currentRoute === PATH.contact ? MENU_ICONS.colorActive : MENU_ICONS.color}
          onPress={() => navigation.push(PATH.contact)}
        />
      </TouchableOpacity>

      {/* account btn */}
      <TouchableOpacity>
        <IconFontAwesome5
          name="user-circle"
          size={MENU_ICONS.size}
          color={currentRoute === PATH.account ? MENU_ICONS.colorActive : MENU_ICONS.color}
          onPress={() => navigation.push(PATH.account)}
        />
      </TouchableOpacity>

      {/* change language btn */}
      <TouchableOpacity>
        {/* change language */}
        <SelectDropdown
          renderDropdownIcon={() => {
            return <IconFontAwesome
              name="language"
              size={MENU_ICONS.size}
              color={COLOR_GREY}
            />
          }}
          defaultButtonText="LANGUAGE"
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
          buttonTextStyle={menu.changeLangBtnText}
          buttonStyle={menu.changeLangBtn}
        />
      </TouchableOpacity>
    </View>
  )
}

export default MenuConnectedComponent;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const menu = StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: MENU_BAR_HEIGHT,
    shadowColor: COLOR_GRADIENT_2,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    
    elevation: 20,
  },
  changeLangBtnText: {
    color: COLOR_GREY,
  },
  changeLangBtn: {
    height: MENU_BAR_HEIGHT - 20,
    borderRadius: 3,
  }
});
