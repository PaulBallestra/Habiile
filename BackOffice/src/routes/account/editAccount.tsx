import { use } from "i18next";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import { ACCOUNT_EDITED } from "../../constants/cts_alerts";
import { IUserInfos } from "../../interfaces/user";
import PATH from "../../constants/cts_routes";
import { getPageUrl } from "../../locales/i18n";
import { COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";

const EditAccount = ( {user, _setEditAccount, _setUser } : 
    {user: IUserInfos, _setEditAccount : Dispatch<SetStateAction<boolean>>,  _setUser: Dispatch<SetStateAction<IUserInfos>>} ) => {
  
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const { email, firstName, lastName, phoneNumber, id } = user
  const [changeImage, _setChangeImage ] = useState<boolean>(false)
  const { onEditAccount } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    _setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (profileImage : any) => {
    onEditAccount({userId: id, lastName: lastName, firstName: firstName, email: email, phoneNumber: phoneNumber, image: profileImage[0]})
      .then(() => {
        alert(ACCOUNT_EDITED);
        _setEditAccount(false)
      })
      .catch((error:any) => alert(error))
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <FormInputs>
          <span className="elem">
            <input
                type="file"
                accept="image/*"
                id='profileImage' 
                {...register("profileImage")}
              />
          </span>
          {/* first name */}
          <span className="elem">
            <label htmlFor="firstName">{t("form.labels.firstName", {ns: "editAccountPage"})}</label>
            <input
              id='firstName' 
              placeholder={"" + t("form.placeholders.firstName", {ns: "editAccountPage"})}
              {...register("firstName")}
              value={firstName ? firstName : ""}
              onChange={handleChange}
              required />
          </span>
          {/* last name */}
          <span className="elem">
            <label htmlFor="lastName">{t("form.labels.lastName", {ns: "editAccountPage"})}</label>
            <input 
              id='lastName'
              placeholder={"" + t("form.placeholders.lastName", {ns: "editAccountPage"})}
              {...register("lastName")}
              value={lastName ? lastName : ""}
              onChange={handleChange}
              required />
          </span>
          {/* email */}
          <span className="elem">
            <label htmlFor="email">{t("form.labels.email", {ns: "editAccountPage"})}</label>
            <input
              type="email"
              id='email'
              placeholder={"" + t("form.placeholders.email", {ns: "editAccountPage"})}
              {...register("email")}
              value={email ? email : ""}
              onChange={handleChange}
              className="email"
              required />
          </span>
          {/* phone number */}
          <span className="elem">
            <label htmlFor="phoneNumber">{t("form.labels.phoneNumber", {ns: "editAccountPage"})}</label>
            <input
              type="tel"
              id='phoneNumber' 
              placeholder={"" + t("form.placeholders.phoneNumber", {ns: "editAccountPage"})}
              {...register("phoneNumber")}
              value={phoneNumber ? phoneNumber : ""}
              onChange={handleChange}
              className="phone"
            />
          </span>
        </FormInputs>
        <FormFooter>
          <button onClick={() => _setEditAccount(false)} className="back">{"" + t("back", {ns: "editAccountPage"})}</button>
          <button type="submit">{"" + t("submitBtn", {ns: "editAccountPage"})}</button>
        </FormFooter>
      </Wrapper>
    </form>
  )
}

export default EditAccount;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .elem {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;

    input {
      border: none;
      background-color: transparent;
      padding: 4px 0;
      color: ${COLOR_TEXT};
    }

    label {
      margin-right: 10px;
      text-align: left;
    }
  }
`

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;

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

  .back {
    margin-right: 10px;
  }
`
