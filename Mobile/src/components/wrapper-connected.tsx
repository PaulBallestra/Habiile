import React, { ReactNode } from 'react';
import {View, StyleSheet} from 'react-native';
import MenuConnectedComponent from './menu-connected';

/* 

[ WrapperConnected ] - the base / scheme of the screen when the user is connected
In this case, all the unique components + the common menu bar

---------- PROPS ----------
{ children } * type: ReactNode
all the unique components, (dom) elements

*/

const WrapperConnected = ({children}: {children: ReactNode}) => {
  return (
    <View style={styles.main}>
      {children}
      <MenuConnectedComponent />
    </View>
  );
};

export default WrapperConnected;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
