import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useItems } from '../../common/contexts/itemContext';
import { IItemsInfos } from '../../interfaces/items';
import HeaderComponent from '../../components/Header';
import { useTranslation } from 'react-i18next';
import MainContainer from '../../components/MainContainer';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_BLACK, COLOR_GRADIENT_1, COLOR_GRADIENT_2, COLOR_GREY, COLOR_WHITE } from '../../constants/cts_colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Box from '../../components/Box';
import AppText from '../../components/AppText';
import { MENU_BAR_HEIGHT } from '../../constants/cts_sizes';
import ButtonComponent from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import SectionTitle from '../../components/SectionTitle';
import { usePayment } from '../../common/contexts/paymentContext';
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

// ts error - Cannot find module '@env' or its corresponding type declarations. (but the value is received)
// @ts-ignore 
import { STRIPE } from "@env";

const ItemSingleScreen = () => {
  const publishableKey = STRIPE;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t } = useTranslation();
  const route = useRoute();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, _setLoading] = useState(false);

  // ts error - Property 'itemId' does not exist on type 'Readonly<object | undefined>'.
  // but the id of the element is found in 'itemId'
  // @ts-ignore
  const { itemId }  = route.params;

  const [ item, _setItem ] = useState<IItemsInfos>();
  const { onGetItem } = useItems();
  const { onProcessPayment, onSendConfirmOrderEmail } = usePayment();

  // get item
  useEffect(() => {
    onGetItem(itemId)
      .then((res: any) => {
        _setItem(res);
      })
      .catch((err) => alert(err))
  }, []);
  
  // initialize payment sheet
  const initializePaymentSheet = async () => {
    _setLoading(true);
    const response = await onProcessPayment({price: item?.price});
    const { clientSecret, customerId } = response.data;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Template",
      customerId: customerId,
      paymentIntentClientSecret: clientSecret,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (error) {
      _setLoading(false);
    }
  };

  // open payment popup
  // it can be opened only if the payment sheet is successfully initialized
  const handlePayment = async ({itemTitle, price}) => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`${t("payment.errorCode", {ns: "errors"})} ${error.code}`, error.message);
      _setLoading(false);
    } else {
      // order confirmation
      Alert.alert(t('orderConfirmedTitle', {ns: 'alerts'}), t('orderConfirmedMessage', {ns: 'alerts'}) + "");
      _setLoading(false);
      onSendConfirmOrderEmail({itemTitle, price});
    }
  }

  return (
    <View style={styles.mainView}>
      {/* header */}
      {/* If item exists, check if item title is smaller than 25 chars */}
      {/* If is smaller than 22 chars, insert the title */}
      {/* if is not smaller, insert the substring title */}
      {/* If item doesn't exists, insert nothing as title */}
      <HeaderComponent title={item ? item.title.length < 22 ? item.title : item.title.substring(0, 25) + "..." : ""}>
        <IconAntDesign
          style={header.backIcon}
          name='arrowleft'
          color={COLOR_WHITE}
          size={20}
          onPress={() => navigation.goBack()}
        />
      </HeaderComponent>
      
      {/* main container */}
      {
        item &&
        <> 
          <MainContainer>
            <ScrollView>
              {/* view used generally for padding */}
              <View style={main.container}>
                {/* header box */}
                <Box style={headerBox.container}>
                  {/* image */}
                  <Image
                    style={headerBox.image}
                    source={require('../../assets/images/item.png')}
                  />
                  <AppText style={headerBox.title}>{item.title} </AppText>
                  <AppText style={headerBox.price}>{item.price} Є</AppText>
                </Box>

                {/* option btns */}
                <View>
                  <ButtonComponent
                    text={t('optionBtns.description', {ns: 'itemSingleScreen'})}
                    onPress={undefined}
                  />
                </View>

                {/* description section */}
                <View>
                  <SectionTitle style={descriptionSection.title}>{t('sections.description.title', {ns: 'itemSingleScreen'})}</SectionTitle>
                  <Box style={undefined}>
                    <AppText style={descriptionSection.description}>{item.description}</AppText>
                  </Box>
                </View>
              </View>
            </ScrollView>
          </MainContainer>

          {/* buy menu container */}
          <View style={buyMenu.container}>
            <StripeProvider publishableKey={publishableKey}>
              <TouchableOpacity 
                style={buyMenu.buyBtn}
                disabled={loading}
                onPress={() => handlePayment({itemTitle: item.title, price: item.price})}
              >
                <LinearGradient
                  style={buyMenu.buyBtnGradient}
                  colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                    <AppText style={buyMenu.buyBtnText}>{t('menu.btnText', {ns: 'itemSingleScreen'})}</AppText>
                  </LinearGradient>
                </TouchableOpacity>
            </StripeProvider>
          </View>
        </>
      }
    </View>
  )
}

export default ItemSingleScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  }
});

const header = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    left: '3%',
    bottom: 20,
  }
})

const main = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
  }
});

const headerBox = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 10,
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 50,
    height: 50,
  },
  title: {
    color: COLOR_BLACK,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  price: {
    color: COLOR_GREY,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
    fontWeight: '500',
  },
});

const descriptionSection = StyleSheet.create({
  title: {
    marginVertical: 15,
  },
  description: {
    color: COLOR_GREY,
    fontSize: 13,
  },
});

const buyMenu = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: MENU_BAR_HEIGHT,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLOR_GRADIENT_2,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    
    elevation: 20,
  },
  buyBtn: {
    width: '80%',
    height: MENU_BAR_HEIGHT - 20,
    borderRadius: 3,
    overflow: 'hidden',
  },
  buyBtnGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyBtnText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

