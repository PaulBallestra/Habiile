import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useItems } from "../../common/contexts/itemContext";
import { IItemsInfos } from "../../interfaces/items";
import ItemCard from "../../components/ItemCard";

const ItemsScreen = () => {
  const [ items, _setItems ] = useState<IItemsInfos[]>([]);
  const { onGetAllItems } = useItems();

  useEffect(() =>{
    onGetAllItems()
      .then((itemsResponse: any) => {
        _setItems(itemsResponse)
      })
      .catch((error: any) => alert(error))
  }, [])

  return (
    <ScrollView style={styles.mainScrollView}>
      <View>
        {
          items.map((item) => {
            return <ItemCard item={item} key={"item-" + item.id} />
          })
        }
      </View>
    </ScrollView>
  )
}

export default ItemsScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
  }
});