import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { COLOR_BLACK, COLOR_WHITE } from "../constants/cts_colors";

/* 

[ Box ] - is a general box design
if it is needed, it could be added additional style with the style prop

---------- PROPS ----------
{ children } * type: ReactNode
the (dom) elements, content inside the box

{ style } * type: object
an object of the additional styles applied to the component

*/

const Box = ({children, style={}}: {children: ReactNode, style: object | undefined}) => {
  return (
    <View style={[styles.box, style]}>
      {children}
    </View>
  );
}

export default Box;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLOR_WHITE,
    padding: 15,
    borderRadius: 3,
    marginBottom: 15,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
});

