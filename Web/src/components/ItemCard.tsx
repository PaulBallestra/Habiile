import React, {Dispatch, SetStateAction} from "react"
import styled from "styled-components";
import { IItemsInfos } from "../interfaces/items"
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_LIGHT, COLOR_WHITE } from "../constants/cts_colors";
import Button from "./Button";
import itemImage from "../assets/images/item.png";
import { useTranslation } from "react-i18next";
import { usePayment } from "../common/contexts/paymentContext";

export const ItemCard = ( {item, price, _setStripeClientSecret} :  {item : IItemsInfos, price: number, _setStripeClientSecret : Dispatch<SetStateAction<string>>} ) => {
  const { t } = useTranslation();
  const { onProcessPayment } = usePayment();

  const handlePayment = () => {
    onProcessPayment({price})
      .then((resp : any) => {
        console.log("payed resp:", resp)
        _setStripeClientSecret(resp.clientSecret ? resp.clientSecret : '')
      })
      .catch(err => console.error(err))
  }

  return (
    <Wrapper>
     {/* top */}
      <Content>
        <Header>
          {/* image */}
          <Image src={itemImage} alt="job" />
          {/* title */}
          <Title>{item.title}</Title>
        </Header>
        {/* description */}
        <Description>{item.description}</Description>
      </Content>
      {/* bottom */}
      <Bottom>
        {/* price */}
        <Price>{item.price} Є</Price>
        {/* view more btn */}
        <Button 
          text={t("itemsButton", {ns: "itemsPage"})}
          onClick={handlePayment}
        />
      </Bottom>
    </Wrapper>
  )
}

export default ItemCard; 


/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  margin-top: 5px;
  background-color: ${COLOR_WHITE};
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Content = styled.div`

`

const Header = styled.div`
  display: flex;

  // ========= MEDIA QUERIES - Header ============
  @media (max-width: 570px) {
    flex-direction: column;
    align-items: center;
  } 
`
const Image = styled.img`
  border-color: ${COLOR_GREY_LIGHT};
  border-width: 0.5;
  border-radius: 1;
  width: 50px;
  height: 50px;
  margin-right: 15px;

  // ========= MEDIA QUERIES - Image ============
  @media (max-width: 570px) {
    margin-right: 0;
  } 
`
const Title = styled.h2`
  font-size: 17px;
  color: ${COLOR_BLACK};

  // ========= MEDIA QUERIES - Image ============
  @media (max-width: 570px) {
    text-align: center;
  } 
`

const Description = styled.p`
  margin-top: 15px;
  color: ${COLOR_GREY};
  font-size: 14px;
`

const Bottom = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  // ========= MEDIA QUERIES - Bottom ============
  @media (max-width: 570px) {
    flex-direction: column;
    align-items: center;
  } 
`

const Price = styled.span`
  font-weight: bold;
  color: ${COLOR_BLACK};

  // ========= MEDIA QUERIES - Price ============
  @media (max-width: 570px) {
    margin-bottom: 1rem;
  } 
`
