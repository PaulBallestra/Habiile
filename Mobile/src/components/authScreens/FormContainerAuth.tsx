import React, { ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity, GestureResponderEvent } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR_BLACK, COLOR_GRADIENT_1, COLOR_GRADIENT_2, COLOR_WHITE } from "../../constants/cts_colors";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MainContainerAuth from "./MainContainerAuth";

/*

[ FormContainerAuth ] - A component that extends MainContainerAuth component, a container that holds all the content
This component includes the inputs of the form and a submit button in addition of what contains the main container

---------- PROPS ----------
{ children } * type: ReactNode
all the (dom) elements of the form (inputs, labels...)

{ mainTitle } * type: string
the title of the main container

{ onHandleSubmit } * type: ((event: GestureResponderEvent) => void)
functin that listen of the press event of the submit btn, trigger the function of the parrent component.

*/

const FormContainerAuth = ({children, mainTitle, onHandleSubmit}: {children: ReactNode, mainTitle: string, onHandleSubmit: ((event: GestureResponderEvent) => void)}) => {
  return (
      <MainContainerAuth
        mainTitle={mainTitle}
      >

        <View>{children}</View>

        {/* submit btn */}
        <View style={formStyles.submitBtnIosShadow}>
          <TouchableOpacity
            style={formStyles.submitBtn}
            onPress={onHandleSubmit}
          >
            <LinearGradient
              style={formStyles.submitBtnGradient}
              colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <IconAntDesign
                name="arrowright"
                size={25}
                color={COLOR_WHITE}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* submit btn ends here */}
        
      </MainContainerAuth>
  )
}

export default FormContainerAuth;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const formStyles = StyleSheet.create({
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