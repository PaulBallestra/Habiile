import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../../common/contexts/userContext";
import Box from "../../components/Box";
import HeaderComponent from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import { CONTACT_MESSAGE_SENT } from "../../constants/cts_alerts";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BLACK, COLOR_GRADIENT_1, COLOR_GRADIENT_2, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_WHITE } from "../../constants/cts_colors";
import LinearGradient from "react-native-linear-gradient";

const ContactScreen = () => {
  const { t } = useTranslation();
  const [ lastName, _setLastName ] = useState<string>("");
  const [ firstName, _setFirstName ] = useState<string>("");
  const [ email, _setEmail ] = useState<string>("");
  const [ phoneNumber, _setPhoneNumber ] = useState<string>("");
  const [ message, _setMessage ] = useState<string>("");
  const { onSendContactMessage } = useUser();

  // after contact button pressed
  const handlePressContact = () => {
    onSendContactMessage({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    })
    .then(() => {
      _setLastName("");
      _setFirstName("");
      _setEmail("");
      _setPhoneNumber("");
      _setMessage("");
      alert(CONTACT_MESSAGE_SENT);
    })
    .catch(error => alert(error))
  }

  return (
    <View>
      {/* header */}
      <HeaderComponent title={t("titles.contact", {ns: "header"})} children={null} />

      {/* Main */}
      <MainContainer>
        {/* view used generally for padding */}
        <View style={main.container}>
          <ScrollView>
            <Box style={formStyles.box}>
              {/* form */}
              <View>
                {/* last name */}
                <View style={formStyles.inputsBox}>
                  <TextInput
                    style={formStyles.inputs}
                    value={lastName}
                    placeholder={'' + t('form.placeholders.lastName', {ns: 'contactScreen'})}
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
                    placeholder={'' + t('form.placeholders.firstName', {ns: 'contactScreen'})}
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
                    placeholder={'' + t('form.placeholders.email', {ns: 'contactScreen'})}
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
                    placeholder={'' + t('form.placeholders.phoneNumber', {ns: 'contactScreen'})}
                    placeholderTextColor={COLOR_GREY_LIGHT}
                    onChangeText={inputValue => _setPhoneNumber(inputValue)}
                  />
                  <IconMaterialCommunityIcons 
                    name="cellphone"
                    style={formStyles.inputsIcon} 
                    size={15}
                    color={COLOR_GREY}
                  />
                </View>
                {/* message */}
                <View style={formStyles.inputsBox}>
                  <TextInput
                    style={formStyles.inputs}
                    multiline={true}
                    value={message}
                    placeholder={'' + t('form.placeholders.message', {ns: 'contactScreen'})}
                    placeholderTextColor={COLOR_GREY}
                    onChangeText={inputValue => _setMessage(inputValue)}
                  />
                  <IconAntDesign
                    name="message1"
                    style={formStyles.inputsIcon} 
                    size={15}
                    color={COLOR_GREY}
                  />
                </View>
                {/* submit btn */}
                <View style={formStyles.submitBtnIosShadow}>
                  <TouchableOpacity
                    style={formStyles.submitBtn}
                    onPress={handlePressContact}
                  >
                    <LinearGradient
                      style={formStyles.submitBtnGradient}
                      colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <IconFontAwesome
                        name="send-o"
                        size={25}
                        color={COLOR_WHITE}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                {/* submit btn ends here */}
              </View>
              {/* form ends here */}
              
            </Box>
          </ScrollView>
        </View>
      </MainContainer>
    </View>
  )
}

export default ContactScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const main = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
  },
});

const formStyles = StyleSheet.create({
  box: {
    marginTop: 15,
    marginBottom: 50,
    borderRadius: 10,
  },
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
  // ios submit btn shadow
  submitBtnIosShadow: {
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  submitBtn: {
    width: 65,
    height: 65,
    alignSelf: 'center',
    transform: [{translateY: 50}],
    borderRadius: 50,
    borderColor: COLOR_WHITE,
    borderWidth: 5,
    overflow: 'hidden',
    // android submit btn shadow
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  submitBtnGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
});