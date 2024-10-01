import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { COLOR_GRADIENT_1, COLOR_GRADIENT_2, COLOR_SPECIAL, COLOR_WHITE } from '../constants/cts_colors';
import AppText from './AppText';
import LinearGradient from 'react-native-linear-gradient';
import { HEADER_HEIGHT } from '../constants/cts_sizes';

/* 

[ HeaderComponent ] - is the header of the app when user is connected

---------- PROPS ----------
{ title } * type: string
the title of the screen

{ children } * type: ReactNode
the additional elements (ex: back icon, menu icon, share icon, search icon...)

*/

const HeaderComponent = ({title, children}: {title: string, children?: ReactNode}) => {

  return (
    <LinearGradient colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]} style={header.container}>
      <AppText style={header.title}>{title}</AppText>
      {children}
    </LinearGradient>
  );
};

export default HeaderComponent;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const header = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: COLOR_SPECIAL,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  title: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '500',
  }
});

