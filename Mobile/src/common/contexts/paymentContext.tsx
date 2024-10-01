import React, { createContext, useCallback, useContext, useState } from "react";
import { IPaymentContext } from "../../interfaces/paymentContext";
import { onProcessPaymentApi, onSendConfirmOrderEmailApi } from "../../api/payment.api";

const PaymentContext = createContext<IPaymentContext | null>(null)

// THE PROVIDER
export const PaymentProvider = (props : any) => {
  const [ isLoading, _setIsLoading ] = useState(false);

  // process payment
  const onProcessPayment = useCallback(({price}: {price: number}) => {
    _setIsLoading(true);

    return onProcessPaymentApi({price})
      .then(response => {
        _setIsLoading(false);
        return response 
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data);
        } else {
          throw new Error(err.message);
        }
      })
  }, []);

  // send confirm payment email
  const onSendConfirmOrderEmail = useCallback(({itemTitle, price}: {itemTitle: string, price: string}) => {
    _setIsLoading(true);

    return onSendConfirmOrderEmailApi({itemTitle, price})
      .then(response => {
        _setIsLoading(false);
        return response 
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data);
        } else {
          throw new Error(err.message);
        }
      })
  }, []);
  
  return (
    <PaymentContext.Provider 
      {...props}
      value={{
        onProcessPayment,
        onSendConfirmOrderEmail,
      }}
    /> 
  )
}

export const usePayment = (): IPaymentContext => {
  const context = useContext(PaymentContext)
  if (!context)
    throw new Error("usePayment must be used in PaymentProvider");
  return context;
}