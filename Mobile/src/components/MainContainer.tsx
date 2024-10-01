import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { HEADER_HEIGHT, MENU_BAR_HEIGHT } from "../constants/cts_sizes";

/* 

[ MainContainer ] - container that depends on the header and footer's height
The main screen content is placed here. 
MainContainer takes into account the position of the content from the top of the screen and the bottom of the screen to not collade with the header an footer

---------- PROPS ----------
{ children } * type: ReactNode
All the (dom) elements, all the content of the screen

*/

const MainContainer = ({children}: {children: ReactNode}) => {
  return (
    <View style={main.container}>
      {children}
    </View>
  )
}

export default MainContainer;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const main = StyleSheet.create({
  container: {
    marginTop: HEADER_HEIGHT,
    marginBottom: MENU_BAR_HEIGHT, // (footer) menu height
  }
});