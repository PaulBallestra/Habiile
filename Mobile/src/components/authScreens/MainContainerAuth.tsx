import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { COLOR_BLACK, COLOR_WHITE } from "../../constants/cts_colors";
import AppText from "../AppText";

/*

[ MainContainerAuth ] - the body of the main container, a title and a box with the main content of the auth screens (login, signup, forgot password...)
this container has a top margin that is related to the HeaderAuth component


--------- PROPS ----------
{ children } * type: ReactNode 
Receives the (dom) elements from the children components

{ mainTitle } * type: string
Receives the title of the main container

*/

const MainContainerAuth = ({children, mainTitle = ""}: {children: ReactNode, mainTitle: string}) => {
  return (
      //main container
      <View 
        style={[styles.container]}
      >
        {/* main title */}
        <AppText style={styles.mainTitle}>
          {mainTitle}
        </AppText>
        {/* main box */}
        <View style={styles.box}>
          {children}
        </View>
      </View>
  );
}

export default MainContainerAuth;

const styles = StyleSheet.create({
  container: {
    marginTop: 170,
    marginBottom: 40,
  },
  mainTitle: {
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 28,
    fontWeight: "500",
  },
  box: {
    position: 'relative',
    backgroundColor: COLOR_WHITE,
    width: '94%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    padding: 20,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});