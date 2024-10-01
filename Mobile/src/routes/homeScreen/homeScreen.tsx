import React, { useEffect, useState } from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import HeaderComponent from '../../components/Header';
import MainContainer from '../../components/MainContainer';
import { IItemsInfos } from '../../interfaces/items';
import { useItems } from '../../common/contexts/itemContext';
import ItemCard from '../../components/ItemCard';
import SectionTitle from '../../components/SectionTitle';

const HomeScreen = () => {
  const {t} = useTranslation();
  const [items, _setItems] = useState<IItemsInfos[]>([]);
  const { onGetAllItems } = useItems();

  useEffect(() => {
    onGetAllItems()
      .then((res) => {
        _setItems(res);
      })
      .catch((err) => alert(err))
  }, []);

  return (
    <View>
      {/* header */}
      <HeaderComponent title={t("titles.home", {ns: "header"})} children={null} />

      {/* Main */}
      <MainContainer>
        <ScrollView>
          {/* products section */}
          <View style={productsStyles.container}>
            <SectionTitle style={productsStyles.title}>{t('sections.jobs.title', {ns: 'homeScreen'})}</SectionTitle>
            {
              items &&
              items.map((item) => {
                return <ItemCard key={item.id} item={item} />
              })
            }
          </View>
        </ScrollView>
      </MainContainer>

    </View>
  )
};

export default HomeScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const productsStyles = StyleSheet.create({
  container: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
  },
});