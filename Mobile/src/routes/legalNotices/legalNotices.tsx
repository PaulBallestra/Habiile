import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

const LegalNoticesScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.mainScrollView}>
      <View>
        {/* main title */}
        <Text>{t("mainTitle", {ns: "legalNoticesScreen"})}</Text>
        {/* main content */}
        <View>

        </View>
      </View>
    </ScrollView>
  )
}

export default LegalNoticesScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
  }
});