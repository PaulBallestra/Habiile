import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLOR_WHITE, COLOR_GRADIENT_1, COLOR_GRADIENT_2 } from "../constants/cts_colors";

/* 

[ ButtonComponent ] - is a general button design

---------- PROPS ----------
{ text } * type: string
the text of the button

{ onPress } * type: (event: GestureResponderEvent) => void) | undefined
function that listen for a press event. if the button is pressed, trigger the function of the parrent component.

*/

const ButtonComponent = ({text, onPress}: {text: string | null, onPress: ((event: GestureResponderEvent) => void) | undefined }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <LinearGradient
        style={styles.btnGradient}
        colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.btnText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonComponent;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  btnGradient: {
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  btnText: {
    width: '100%',
    color: COLOR_WHITE,
    fontWeight: '600',
    fontSize: 10,
  },
})

