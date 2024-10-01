// api
interface IProcessPaymentApiData {
  data: {
    clientSecret: "",
    customerId: "",
  };
}

// contexts
export interface IPaymentContext {
  onProcessPayment: ({}) => Promise<IProcessPaymentApiData>;
  onSendConfirmOrderEmail: ({itemTitle, price}: {itemTitle: string, price: string}) => Promise<object>;
}