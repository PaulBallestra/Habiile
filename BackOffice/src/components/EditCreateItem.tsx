import React, { SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { COLOR_TEXT, COLOR_WHITE } from "../constants/cts_colors";
import { IItemsInfos } from "../interfaces/items"
import { currency_list } from "../constants/cts_currency";

const EditCreateItem = ({values, handleChangeItemData, handleSelectChange, handleSubmit, _setEditId, createItem, _setCreateItem} : 
  {values : IItemsInfos, handleChangeItemData: React.ChangeEventHandler<HTMLInputElement>, handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>, handleSubmit: React.MouseEventHandler<HTMLButtonElement>, _setEditId: Dispatch<SetStateAction<number>>, createItem: boolean, _setCreateItem : Dispatch<SetStateAction<boolean>>}) => {
  return (
    <Wrapper>
      <select 
        name='status' 
        id='status' 
        value={values.status} 
        onChange={handleSelectChange} 
        multiple={false}
        required
      >
        <option>Publié</option>
        <option>Non Publié</option>
      </select>
      
      <input
        type='text'
        id='title'
        name='title'
        value={values.title}
        placeholder='Titre'
        onChange={handleChangeItemData}
        className="title"
        required
      />
    
    
      <input
        type='text'
        id='description'
        name='description'
        value={values.description}
        placeholder='Description'
        onChange={handleChangeItemData}
        className="description"
        required
      />
      
      <Price>
        <input
          type='text'
          id='price'
          name='price'
          value={values.price}
          placeholder='Prix'
          onChange={handleChangeItemData}
          required
          className="price"
        />
        €
      </Price>

      <input
        type='text'
        id='image'
        name='image'
        value={values.image_path}
        placeholder='Image'
        onChange={handleChangeItemData}
        className="image"
      />
    
      { values.created_at }
      <Buttons>
        <button onClick={handleSubmit}><i className="ri-save-2-line"></i></button>
        <button onClick={() => { _setEditId(-1), _setCreateItem(false) }}><i className="ri-close-line"></i></button>
      </Buttons>
    </Wrapper>
  )
}

export default EditCreateItem;

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
  .phoneNumber { 
    width: 110px;
  }

  .title {
    margin-left: 30px;
  }

  .description {
    height: 30px;
  }

  input {
    border: none;
  }

  .price {
    width: 40px;
  }

  .image {
    width: 200px;
  }
`

const Price = styled.div`
  display: flex;
`

const Buttons = styled.div`
display: flex;

  margin-left: auto;

  button {
    cursor: pointer;
    border: none;
    background-color: ${COLOR_WHITE};
    color: ${COLOR_TEXT};
    text-align: center;
    vertical-align: center;
    padding: 6px 10px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
    line-height: 1.5;
    border-radius: 4px;
  }

  button:hover {
    background-color: ${COLOR_TEXT};
    color: ${COLOR_WHITE}
  }

  .save-button {
    margin-right: 10px;
  }
`