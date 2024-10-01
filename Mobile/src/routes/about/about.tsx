import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

/* 

[ AboutScreen ] - the screen that includes all the company information

*/

const AboutScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.mainScrollView}>
      <View>
        {/* main title */}
        <Text>{t("mainTitle", {ns: "aboutScreen"})}</Text>
        {/* main content */}
        <View>

        </View>
      </View>
    </ScrollView>
  )
}

export default AboutScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
  }
});