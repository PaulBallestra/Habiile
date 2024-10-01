import React, { useState, useCallback, createContext } from "react";
import { onGetAllItemsApi, onGetItemApi, onCreateItemApi } from "../../api/item.api";
import { EMPTY_ITEM_DESCRIPTION, EMPTY_ITEM_IMAGE, EMPTY_ITEM_PRICE, EMPTY_ITEM_TITLE } from "../../constants/cts_formErrors";
import { IItemsContext, IItemsInfos } from "../../interfaces/items";
import { useTranslation } from 'react-i18next';
import { checkEmptyInput } from '../../utils/checkInputs'

const ItemsContext = createContext<IItemsContext | null>(null);

export const ItemProvider = (props : any) => {
  const [isLoading, _setIsLoading] = useState(false);
  const { t } = useTranslation();

  const onCreateItem = useCallback(({title, description, image_path, price} : IItemsInfos) => {
    if (!checkEmptyInput(title)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_ITEM_TITLE}`, {ns: "errors"}));
      });
    }

    if (!checkEmptyInput(description)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_ITEM_DESCRIPTION}`, {ns: "errors"}));
      });
    }

    if (!checkEmptyInput(price)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_ITEM_PRICE}`, {ns: "errors"}));
      });
    }

    // if(! image_path) {
    //   return new Promise((resolve, reject) => {
    //     reject(t(`form.${EMPTY_ITEM_IMAGE}`, {ns: "errors"}));
    //   });
    // }

    _setIsLoading(true);
    return  onCreateItemApi({ image_path, title, description, price  })
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                if (error.response) {
                  throw new Error(error.response.data);
                } else {
                  throw new Error(error.message);
                }
              })
              .then(() => _setIsLoading(false));
  }, []);


  const  onGetAllItems = useCallback(() => {
    _setIsLoading(true);
    return  onGetAllItemsApi()
              .then((response) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error) => {
                if(error.response) {
                  throw new Error(error.message.data);
                } else {
                  throw new Error(error.message);
                }
              })
              .then((response) => {
                _setIsLoading(false)
                return (response)
              });
  }, [])

  const onGetItem = useCallback((id : number) => {
    _setIsLoading(true);
    return  onGetItemApi(id)
              .then((response) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error) => {
                if(error.response) {
                  throw new Error(error.message.data);
                } else {
                  throw new Error(error.message);
                }
              })
  }, [])

  return (
    <ItemsContext.Provider
      {...props}
      value={{
        isLoading,
        // function
        onCreateItem,
        onGetAllItems,
        onGetItem,
      }}
    />
  );
}

export const useItems = (): IItemsContext => {
  const context = React.useContext(ItemsContext);
  if (!context)
    throw new Error(
      "useItems must be used in ItemProvider"
    );

  return context;
};