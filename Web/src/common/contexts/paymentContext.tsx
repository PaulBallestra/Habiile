import React, { createContext, useCallback, useContext, useState } from "react";
import { IPaymentContext } from "../../interfaces/paymentContext";
import { onProcessPaymentApi } from "../../api/payment.api";

const PaymentContext = createContext<IPaymentContext | null>(null)

// THE PROVIDER
export const PaymentProvider = (props : any) => {
  const [ isLoading, _setIsLoading ] = useState(false);

  // process payment
  const onProcessPayment = useCallback(({price}: {price: number}) => {
    _setIsLoading(true);

    return onProcessPaymentApi({price})
      .then(response => response)
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data);
        } else {
          throw new Error(err.message);
        }
      })
      .then((response) => {
        _setIsLoading(false)
        return (response.data) ? response.data: null
      });
  }, []);

  return (
    <PaymentContext.Provider 
      {...props}
      value={{
        onProcessPayment,
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