import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONT_FAMILY } from "../constants/cts_fontFamily";

/*

[ AppText ] - A component used on the app as the main text instead of <Text> react native component,
this applies the global font family for the text.


---------- PROPS ----------
{ children } * type: ReactNode
the text of the component

{ style } * type: object
an object of the styles applied to the text in addition to the font family

*/

const AppText = ({children, style = {}}) => {
  const textStyles = StyleSheet.create({
    text: {
      ...style,
      fontFamily: FONT_FAMILY,
    }
  });
  return <Text style={textStyles.text}>{children}</Text>
}

export default AppText;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/
