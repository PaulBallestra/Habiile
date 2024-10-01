import { instanceAxios } from "../utils/axios-api";

// process payment
export const onProcessPaymentApi = ({price}: {price: number}) => {

  return  instanceAxios
          .post("/payments/process", {price}, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => (response.data) ? response.data : null);
}

// process payment
export const onSendConfirmOrderEmailApi = ({itemTitle, price}) => {

  return  instanceAxios
          .post("/payments/send-confirm-order-email", {itemTitle, price})
          .then((response) => (response.data) ? response.data : null);
}