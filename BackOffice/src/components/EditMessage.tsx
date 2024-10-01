import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { COLOR_TEXT, COLOR_TEXT_MUTED, COLOR_WHITE } from "../constants/cts_colors";
import { IMessageInfos } from "../interfaces/message"
import { useTranslation } from "react-i18next";
import Button from "./Button";

const EditMessage = ({values, handleChangeMessageData, handleSelectChange, handelSubmitChange, _setEditId} : 
  {values : IMessageInfos, handleChangeMessageData: React.ChangeEventHandler<HTMLInputElement>, handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>, handelSubmitChange: React.MouseEventHandler<HTMLButtonElement>, _setEditId : Dispatch<SetStateAction<number>>}) => {
  
  const { t } = useTranslation();  

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
          <option>Traité</option>
          <option>Non Traité</option>
        </select>
      <NameEmail>
        {
          <span className="names">
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={values.lastName}
              placeholder='Nom'
              onChange={handleChangeMessageData}
              required
            />
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={values.firstName}
              placeholder='Prénom'
              onChange={handleChangeMessageData}
              required
            />
          </span>
        }
        <input
          type='email'
          id='email'
          name='email'
          value={values.email}
          placeholder='Email'
          onChange={handleChangeMessageData}
          required
          className="email"
        />
      </NameEmail>
      <input
        type='tel'
        id='phoneNumber'
        name='phoneNumber'
        value={values.phoneNumber}
        placeholder='Numéro de téléphone'
        onChange={handleChangeMessageData}
      />
      
      <input
        type='text'
        id='message'
        name='message'
        value={values.message}
        onChange={handleChangeMessageData}
        disabled
      />
      <Buttons>
        <button onClick={handelSubmitChange} className="save-button">{t(`save`, {ns: "editCreateAccount"})}</button>
        <button onClick={() => {_setEditId(-1)}}>{t(`back`, {ns: "editCreateAccount"})}</button>
      </Buttons>
    </Wrapper>
  )
}

export default EditMessage;


/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px auto;
  padding: 12px 10px;
  column-gap: 10px;
  font-size: 14px;
  color: ${COLOR_TEXT};
  font-weight: 400;
  .phoneNumber { 
    width: 110px;
  }

  input {
    border: none;
  }

`

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
  margin-left: 30px;
  flex-wrap: wrap;
  width: 250px;
  overflow: hidden;

  .names {
    display: flex;
    flex-direction: row;
    width: 100%;
    box-sizing: border-box;
  }

  .email {
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    color: ${COLOR_TEXT_MUTED};
  }

  input {
    width: 100%;
  }
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