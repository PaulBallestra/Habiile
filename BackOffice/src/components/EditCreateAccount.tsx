import React, { SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { COLOR_TEXT, COLOR_TEXT_MUTED, COLOR_WHITE } from "../constants/cts_colors";
import { IUserInfos } from "../interfaces/user"
import { useTranslation } from "react-i18next";

const EditCreateAccount = (
  {values, handleChangeAccountData, handleSelectChange, handleSubmit, _setEditId, createAccount, _setCreateAccount } :
  {values : IUserInfos, handleChangeAccountData: React.ChangeEventHandler<HTMLInputElement>, handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> , handleSubmit: React.MouseEventHandler<HTMLButtonElement>, _setEditId: Dispatch<SetStateAction<number>>, createAccount: boolean, _setCreateAccount : Dispatch<SetStateAction<boolean>> }
  ) => {

  const { t } = useTranslation();

  return (
    <Wrapper>
      <NameEmail>
         {  
          <span className="names">
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={values.lastName}
              placeholder={"" + t(`inputs.lastName`, {ns: "editUser"})}
              onChange={handleChangeAccountData}
              required
            /> 
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={values.firstName}
              placeholder={"" + t(`inputs.firstName`, {ns: "editUser"})}
              onChange={handleChangeAccountData}
              required
            />
          </span>
        }
        <input
          type='email'
          id='email'
          name='email'
          value={values.email}
          placeholder={"" + t(`inputs.email`, {ns: "editUser"})}
          onChange={handleChangeAccountData}
          required
          className="email"
        />
      </NameEmail>
      <input
        type='tel'
        id='phoneNumber'
        name='phoneNumber'
        value={values.phoneNumber}
        placeholder={"" + t(`inputs.phoneNumber`, {ns: "editUser"})}
        onChange={handleChangeAccountData}
      />

      <select 
        name='roleName'
        id='roleName'
        value={values.roleName}
        onChange={handleSelectChange}
        multiple={false}
        placeholder={"" + t(`inputs.roleName`, {ns: "editUser"})}
        required
      >
        <option>Admin</option>
        <option>Client</option>
      </select>
      { 
        !createAccount &&
        <input
          type='password'
          id='password'
          name='password'
          value={values.password}
          minLength={6}
          placeholder={"" + t(`inputs.password`, {ns: "editUser"})}
          onChange={handleChangeAccountData}
        />
      }
      <Buttons>
        <button onClick={handleSubmit} className="save-button">{t(`save`, {ns: "editCreateAccount"})}</button>
        <button onClick={() => { _setEditId(-1), _setCreateAccount(false) }}>{t(`back`, {ns: "editCreateAccount"})}</button>
      </Buttons>
    </Wrapper>
  )
}

export default EditCreateAccount;


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

  input {
    border: none;
  }
`

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
  margin-left: 40px;
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
