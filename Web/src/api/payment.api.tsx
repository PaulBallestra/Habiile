import { instanceAxios } from "../utils/axios-api";

// process payment
export const onProcessPaymentApi = ({price}: {price: number}) => {

  return  instanceAxios
          .post("/payments/process", {price}, {})
          .then((response) => (response.data) ? response.data : null);
}