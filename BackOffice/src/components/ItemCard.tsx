import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react"
import styled from "styled-components";
import { IItemsInfos } from "../interfaces/items"
import { useTranslation } from "react-i18next";
import { COLOR_ACTIVE_LINK, COLOR_BLUE_MORE, COLOR_BUTTON, COLOR_TEXT, COLOR_TEXT_MUTED } from "../constants/cts_colors";
import { currency_list } from "../constants/cts_currency";

const ItemCard = ({item, handleEditId, handleDeleteItem, createItem, _setSelectedId,  selectedId} : 
  {item : IItemsInfos, handleEditId : Function, handleDeleteItem : Function, createItem: boolean, _setSelectedId: Dispatch<SetStateAction<number[]>>, selectedId:number[] }) => {
  
  const { t } = useTranslation();
  const [moreButton, _setMoreButton] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  // Detect click outside of the 'more' button to close the associated modal
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref.current && !(ref.current.contains(e.target)))
        _setMoreButton(false)
    }

    document.addEventListener("click", checkIfClickedOutside)
    return () => document.removeEventListener("click", checkIfClickedOutside)
  }, [ref])

  const handleInput = () => {
    let tmp : number[] = []

    if (selectedId.indexOf(item.id) === -1)
      _setSelectedId(selectedId => [...selectedId, item.id])
    else {
      tmp = selectedId.filter(id => id !== item.id)
      _setSelectedId(tmp)
    }
  }

  return (
    <Wrapper>
      <Checkbox>
        <input 
          value={item.id}
          onClick={handleInput}
          type="checkbox"
        /> 
        <span className="checkmark"></span>
      </Checkbox>
      {item.status === "Publié" ? t(`filter.published`, {ns: "items"}) : t(`filter.notPublished`, {ns: "items"}) }
      <Title>
        {item.title}
      </Title>
      <div className="description">
        {item.description}
      </div>
      <Price>
        {item.price + " €"}
      </Price>
      <Image>
        {item.image_path}
      </Image>
      {item.created_at}
      <More>
        {
          <button onClick={() => _setMoreButton(true)}><i className="ri-more-2-line" ref={ref}></i></button>
        }
        {
          moreButton && !createItem &&      // Prevent user from editin an existing item while being creating a new one
          <span className="options">
            <button onClick={(event) => handleEditId(event, item)}>{t(`options.edit`, {ns: "items"})}</button>
            <button onClick={(event) => handleDeleteItem(event, item.id)}>{t(`options.remove`, {ns: "accountList"})}</button>
          </span>
        }
      </More>
    </Wrapper>
  )
}

export default ItemCard

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px auto;
  padding: 12px 10px;
  column-gap: 20px;
  font-size: 14px;
  color: ${COLOR_TEXT};
  font-weight: 400;


  .description {
    padding: 3px 6px;
    white-space: nowrap; 
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  &:hover {
    .description {
      white-space: normal;
      text-overflow: clip;
    }
  } 
`

const Checkbox =  styled.div`
  input[type="checkbox"] {
    appearance: none;
    background-color: #fff;
    border: 1px solid ${COLOR_TEXT_MUTED};
    width: 15px;
    height: 15px;
    border-radius: 3px;
    display: grid;
    place-content: center;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 2px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
    background-color: ${COLOR_ACTIVE_LINK};
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
`

const Price = styled.div`
  display: flex;
  flex-direction: space-between;
  width: 50px;
`

const Image = styled.div`
  width: 200px;
  height: 50px;

  .img {
    border: 1px solid red;

  }
  .img::-webkit-scrollbar {
    height: 5px;
    border-radius: 10px;
    background: grey;
  }
`

const More = styled.div`
  margin-left: auto;
  position: relative;

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin: 0;
    font-size: 20px;
    color: black;
  }

  .options {
    background-color: ${COLOR_BLUE_MORE} ;
    position: absolute;
    top: 25px;
    right: 5px;
    width: 150px;
    button {
      color: white;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      width: 100%;
      padding: 12px 24px;
    }
    button:hover {
      background-color: ${COLOR_BUTTON};
    }
  }
`