import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { COLOR_GRADIENT_1, COLOR_GRADIENT_2 } from "../../constants/cts_colors";

/*

[ HeaderAuthScreen ] - the header of the auth screens (login, signup, forgot password...)
  
*/

const HeaderAuthScreen = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.headerImage}
        source={require('../../assets/images/headerAuth/auth_header_image.png')}
      />
      {/* bg / filter */}
      <LinearGradient colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]} style={styles.filter} />
      {/* logo */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo_white.png')}
        />
      </View>
    </View>
  )
}

export default HeaderAuthScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 300,
    zIndex: -1,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  filter: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.90,
    zIndex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  logo:{
   height: 110,
   resizeMode: 'contain',
  },
});