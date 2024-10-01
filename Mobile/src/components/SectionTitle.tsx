import React, { ReactNode } from "react";
import { COLOR_BLACK } from "../constants/cts_colors";
import AppText from "./AppText";
import { StyleSheet } from "react-native";

/* 

[ SectionTitle ] - general styles for the app section titles

---------- PROPS ----------
{ children } * type: ReactNode
the text of the section's title

{ style } * type: object
object with the additional styles of the title

*/

const SectionTitle = ({children, style={}}: {children: ReactNode, style?: object | undefined}) => {
  return (
    <AppText style={{...styles.title, ...style}}>{children}</AppText>
  )
}

export default SectionTitle;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  title: {
    color: COLOR_BLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
});