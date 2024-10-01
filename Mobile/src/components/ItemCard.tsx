import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT } from "../constants/cts_colors";
import { IItemsInfos } from "../interfaces/items";
import AppText from "./AppText";
import Box from "./Box";
import ButtonComponent from "./Button";
import PATH from "../constants/cts_routes";
import { useTranslation } from "react-i18next";
const itemImage = require("../assets/images/item.png");

/* 

[ ItemCard ] - a card that extends Box component and displays an item's infos

---------- PROPS ----------
{ item } * type: IItemsInfos
an object (interface) of the infos of an item

*/

const ItemCard = ({item} : {item : IItemsInfos}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  return (
    <Box key={`item-${item.id}`} style={undefined}>
      {/* top */}
      <View style={itemBox.top}>
        {/* image */}
        <Image 
          style={itemBox.image}
          source={itemImage}
        />
        {/* title */}
        <AppText style={itemBox.title}>{item.title}</AppText>
      </View>
      {/* description */}
      <AppText style={itemBox.description}>{item.description.length < 97 ? item.description : item.description.substring(0,100) + "..."}</AppText>
      {/* bottom */}
      <View style={itemBox.bottom}>
        {/* price */}
        <AppText style={itemBox.price}>{item.price} Є</AppText>
        {/* view more btn */}
        <ButtonComponent 
          text={t('sections.jobs.box.viewMoreBtn', {ns: 'homeScreen'})} 
          onPress={() => navigation.push(PATH.item_single, {itemId: item.id})}
        />
      </View>
    </Box>
  )
}

export default ItemCard;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const itemBox = StyleSheet.create({
  top: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    borderColor: COLOR_GREY_LIGHT,
    borderWidth: 0.5,
    borderRadius: 1,
    width: 50,
    height: 50,
    flex: 1,
    marginRight: 15,
  },
  title: {
    flex: 5,
    fontSize: 17,
    color: COLOR_BLACK,
  },
  description: {
    marginTop: 15,
    color: COLOR_GREY,
    fontSize: 12,
    fontWeight: '500',
  },
  bottom: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR_BLACK,
  },
});