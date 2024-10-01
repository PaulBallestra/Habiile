import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import HeaderComponent from './Header';
import {useStripe} from '@stripe/stripe-react-native';
import { usePayment } from '../common/contexts/paymentContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from './AppText';
import { STRIPE } from '@env';

const CheckoutScreen = () => {
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const { onProcessPayment } = usePayment();
  const publishableKey = STRIPE;

  // GET DATA FROM PAYMENT ROUTE :
  const handlePayment = async () => {
    setIsLoading(true);
    onProcessPayment({price: 9.99, token: AsyncStorage.getItem("token")})
    .then((response) => {
      console.log("payed");
      
      // const clientSecret = "1";
      // const initSheet = await stripe.initPaymentSheet({
      //   merchantDisplayName: 'Template',
      //   defaultBillingDetails: {
      //     address: {
      //       country: 'FR',
      //     },
      //   },
      //   paymentIntentClientSecret: clientSecret,
      //   style: 'alwaysLight',
      // });
      // setIsLoading(false);
      // if (initSheet.error) {
      //   return console.log(initSheet.error.message);
      // }

      // const presentSheet = await stripe.presentPaymentSheet();
      // if (presentSheet.error) {
      //   return console.log(presentSheet.error.message);
      // }

      setIsLoading(false);
      // TODO Voir comment sécuriser ca
      // const confirm = await axios.post(
      //   `${env.api.endpoint}/payments/confirm`,
      //   {
      //     slotId: route.params.id,
      //   },
      //   {
      //     headers: {
      //       authorization: token,
      //     },
      //   },
      // );
      // setIsLoading(false);

      // if (confirm.data.data === true) {
      //   navigation.navigate('AppointmentConfirmation', {
      //     id: route.params.id,
      //   });
      // } else {
      //   Alert.alert(
      //     'Attention',
      //     'Une erreur est survenue. Merci de contact le support client',
      //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      //   );
      // }
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error.message);
    })
  };

  return (
    <View>
      <HeaderComponent title={"Paiment"} />
      <View>
        {/* <StripeProvider publishableKey={publishableKey}> */}
          <TouchableOpacity onPress={handlePayment}>
            <AppText>Paiement</AppText>
          </TouchableOpacity>
        {/* </StripeProvider> */}
      </View>
    </View>
  );
};

export default CheckoutScreen;