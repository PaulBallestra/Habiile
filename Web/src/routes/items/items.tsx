import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import { useItems } from "../../common/contexts/itemContext";
import { IItemsInfos } from "../../interfaces/items";
import styled from "styled-components";
import ItemCard from "../../components/ItemCard";
import MainContainer from "../../components/MainContainer";
import { useTranslation } from "react-i18next";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from "../../components/PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY ? process.env.REACT_APP_STRIPE_KEY : '')

const Items = ({stripeClientSecret, _setStripeClientSecret} : 
  {stripeClientSecret: string, _setStripeClientSecret: Dispatch<SetStateAction<string>>}) => {
  const { t } = useTranslation();
  const [items, _setItems ] = useState<IItemsInfos[]>([])
  const { onGetAllItems } = useItems();

  const options = {
    // passing the client secret obtained from the server
    clientSecret: stripeClientSecret,
  };

  useEffect(() =>{
    onGetAllItems()
      .then((response: any) => {
        _setItems(response)
      })
      .catch((error: any) => alert(error))
  }, [])

  return(
    <Wrapper>
      {/* main container */}
      <MainContainer 
        about={<h1>{t("mainTitle", {ns: "itemsPage"})}</h1>} 
      >
        {/* items container */}
        <ItemsContainer>
          {
            items.map((item) => {
              return <ItemCard item={item} price={parseFloat(item.price)} key={item.id} _setStripeClientSecret={_setStripeClientSecret} />
            })
          }
        </ItemsContainer>
      </MainContainer>
      <div className={stripeClientSecret.length > 0 ? 'paymentForm' : ''}>
        {
          stripeClientSecret.length > 0 &&
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm _setStripeClientSecret={_setStripeClientSecret}/> 
          </Elements>
        }
      </div>
    </Wrapper>
  )
}

export default Items;


/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  .paymentForm {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
  }
`

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
  justify-content: space-between;

  // ========= MEDIA QUERIES - ItemsContainer ============
  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 49.75%);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(1, 100%);
  }
`