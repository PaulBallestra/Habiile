import { Axios, AxiosError } from "axios";
import React, { useState, useCallback, createContext } from "react";
import { onCreateItemApi, onGetItemApi, onGetAllItemsApi, onDeleteItemApi, onUpdateItemApi } from "../../api/item.api";
import { IItemsInfos, IItemsContext } from "../../interfaces/items";
import { useTranslation } from "react-i18next";
import { checkEmptyInput, checkStringEquality } from "../../utils/checkInputs";
import { EMPTY_ITEM_DESCRIPTION, EMPTY_ITEM_TITLE } from "../../constants/cts_formErrors";
import { EMPTY_ITEM_PRICE, EMPTY_ITEM_STATUS } from "../../constants/cts_formErrors";

const ItemsContext = createContext(null);

export function ItemsProvider(props : any) {
  const [isLoading, _setIsLoading] = useState(false);
  const { t } = useTranslation()

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

    _setIsLoading(true);
    return  onCreateItemApi({ image_path, title, description, price  })
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error: any) => {
                if (error.response) {
                  throw new Error(error.response.data);
                } else {
                  throw new Error(error.message);
                }
              })
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              });
  }, []);

  const  onGetAllItems = useCallback(() => {
    _setIsLoading(true);
    return  onGetAllItemsApi()
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error: any) => {
                if(error.response) {
                  throw new Error(error.message.data);
                } else {
                  throw new Error(error.message);
                }
              })
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              });
  }, [])

  const onGetItem = useCallback((id : number) => {
    _setIsLoading(true);
    return  onGetItemApi(id)
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error: any) => {
                if(error.response) {
                  throw new Error(error.message.data);
                } else {
                  throw new Error(error.message);
                }
              })
  }, [])

  const onUpdateItem = useCallback((
    {id, status, title, description, price, image_path}:
    {id: number, status: string, title: string, description: string, price: string, image_path: string}
    ) => {
    if (!checkEmptyInput(status)) {
      return new Promise((resolve, reject) => {
        reject(t(`form.${EMPTY_ITEM_STATUS}`, {ns: "errors"}));
      });
    }
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
    _setIsLoading(true);
    return  onUpdateItemApi({id, status, title, description, price, image_path})
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error: any) => {
                if(error.response) {
                  throw new Error(error.message.data);
                } else {
                  throw new Error(error.message);
                }
              })
  }, [])

  const onDeleteItem = useCallback((id : number) => {
    _setIsLoading(true);
    return  onDeleteItemApi(id)
              .then((response: any) => {
                _setIsLoading(false)
                return (response)
              })
              .catch((error: any) => {
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
        onUpdateItem,
        onDeleteItem
      }}
    />
  );
}

export const useItems = () : IItemsContext => {
  const context = React.useContext(ItemsContext);
  if (!context)
    throw new Error(
      "useItems must be used in ItemProvider"
    );

  return context;
};
