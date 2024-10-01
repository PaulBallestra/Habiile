import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../../common/contexts/userContext";
import { useTranslation } from "react-i18next";
import PATH from "../../constants/cts_routes";

import { getPageUrl } from "../../locales/i18n";
import { IUserInfos } from "../../interfaces/user";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import { COLOR_BABCKGROUND, COLOR_BLUE_MORE, COLOR_BUTTON, COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";
import DeleteAccount from "./deleteAccount";
import EditAccount from "./editAccount";
import AccountInfos from "./accountInfos";
import { ACCOUNT_EDITED } from "../../constants/cts_alerts";
import ChangePassword from "./changePassword";

const Account = () => {
  const { t } = useTranslation();
  const { onGetCurrentUser, onDeleteAccount } = useUser();
  const { onLogout } = useAuthentication()
  const [ user, _setUser ] = useState<IUserInfos>({email: '', firstName: '', lastName: '', phoneNumber: '', image: '', id: -1, roleName: '', created_at: '' });
  const [ redirectToLogIn, _setRedirectToLogIn ] = useState<boolean>(false);
  const [ deleteAccountForm, _setDeleteAccountForm ] = useState<boolean>(false);
  const [ editAccount, _setEditAccount ] = useState<boolean>(false)
  const [ changePassword, _setChangePassword ] = useState<boolean>(false)
  const [ moreButton, _setMoreButton] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const { onEditAccount } = useUser();

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (ref.current && !(ref.current.contains(e.target)))
        _setMoreButton(false)
    }

    document.addEventListener("click", checkIfClickedOutside)
    return () => document.removeEventListener("click", checkIfClickedOutside)
  }, [ref]) 

  useEffect(() => {
    onGetCurrentUser()
      .then((response:any) => {
        _setUser(response)
      })
      .catch ((error:any) => alert(error))
  }, [])

  const handleLogout = () => {
    onLogout()
      .then(() => {
        _setRedirectToLogIn(true);
      })
      .catch((error:any) =>
        alert(error) 
      )
  }

  // if user deleted Account, redirect to login
  if(redirectToLogIn) {
    return <Navigate to={getPageUrl(PATH.login)} />
  }

  return (
    <Wrapper>
      <More>
        {
          <button onClick={() => _setMoreButton(!moreButton)}><i className="ri-more-2-line" ref={ref}></i></button>
        }
        {
          moreButton &&
          <span className="options">
            {/* edit */}
            <button onClick={() => _setEditAccount(true)}>{t("accountOptions.edit", {ns: "accountPage"})}</button>
            {/* change password */}
            <button onClick={() => _setChangePassword(true)}>{t("accountOptions.changePassword", {ns: "accountPage"})}</button>
            {/* logout */}
            <button onClick={handleLogout}>{t("logout", {ns: "accountPage"})}</button>
            {/* delete account */}
            <button onClick={() => _setDeleteAccountForm(true)}>{t("accountOptions.deleteAccount", {ns: "accountPage"})}</button>
          </span>
        }
      </More>
      <Header>
        <h1>{t("mainTitle", {ns: "accountPage"})}</h1>
      </Header>
      {
        !deleteAccountForm && (
          editAccount && (
            <EditAccount user={user} _setEditAccount={_setEditAccount} _setUser={_setUser} /> )
          || changePassword && (
            <ChangePassword _setChangePassword={_setChangePassword}/>
          )
          || <AccountInfos user={user} _setUser={_setUser} editAccount={editAccount} _setEditAccount={_setEditAccount} />
        ) 
        ||
          <DeleteAccount _setDeleteAccountForm={_setDeleteAccountForm} _setRedirectToLogIn={_setRedirectToLogIn} />
      }
    </Wrapper>
  )
}

export default Account;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 0 auto;
  width: 70%;
  background-color: ${COLOR_WHITE};
  margin-top: 40px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
  padding: 40px 0;
  color:  ${COLOR_TEXT};
  position: relative;
`

const More = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  
  button, Link {
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin: 0;
    font-size: 20px;
    color: black;
  }

  .options {
    display: flex;
    flex-direction: column;
    background-color: ${COLOR_BLUE_MORE} ;
    position: absolute;
    top: 30px;
    right: 15px;
    width: 200px;
    z-index: 1;
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


const Header = styled.div`
`