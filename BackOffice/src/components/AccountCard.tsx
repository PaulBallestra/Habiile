import React, { Dispatch, SetStateAction, useState, useRef, useEffect} from "react"
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IUserInfos } from "../interfaces/user"
import { useAuthentication } from "../common/contexts/authenticationContext";
import { COLOR_ACTIVE_LINK, COLOR_BLUE_MORE, COLOR_BUTTON, COLOR_TEXT, COLOR_TEXT_MUTED } from "../constants/cts_colors";

const AccountCard = ({account, handleEditId, handleDeleteAccounts, createAccount, _setSelectedId, selectedId} :
  {account : IUserInfos, handleEditId : Function, handleDeleteAccounts : Function, createAccount: boolean, _setSelectedId : Dispatch<SetStateAction<number[]>>, selectedId : number[]}) => {
  const { t } = useTranslation();
  const { user } = useAuthentication();
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

    if (selectedId.indexOf(account.id) === -1)
      _setSelectedId(selectedId => [...selectedId, account.id])
    else {
      tmp = selectedId.filter(id => id !== account.id)
      _setSelectedId(tmp)
    }
  }

  return (
    <Wrapper>
      <Checkbox>
        <input 
          value={account.id}
          onClick={handleInput}
          type="checkbox"
          disabled={account.id === user.id ? true : false} 
          className={account.id === user.id ? "disabled" : ""} 
        /> 
        <span className="checkmark"></span>
      </Checkbox>
      <NameEmail>
        <div className="names">{account.lastName + ' ' +  account.firstName}</div>
        <div className="email">{account.email}</div>
      </NameEmail>
      <PhoneNumber>
        {account.phoneNumber ? account.phoneNumber : '----' }
      </PhoneNumber>
      <div className="role">{account.roleName === "Administrateur" ? t('filter.admin', {ns: "accountList"}) : t(`filter.clients`, {ns: "accountList"})}</div>
      <div>{account.created_at}</div>
      <More >
        {
          <button onClick={() => _setMoreButton(!moreButton)}><i className="ri-more-2-line" ref={ref}></i></button>
        }
        {
          moreButton && !createAccount &&  // Prevent user from editing an existing user while being creating a new one and prevent him to delete his own account
          <span className="options">
            <button onClick={(event) => handleEditId(event, account)}>{t(`options.edit`, {ns: "accountList"})}</button>
            {
              user.id !== account.id && 
                <button onClick={(event) => handleDeleteAccounts(event, [account])}>{t(`options.remove`, {ns: "accountList"})}</button>
            }
          </span>
        }
      </More>
    </Wrapper>
  )
}

export default AccountCard

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
  .role {
    width: 100px;
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

  .disabled {
    cursor: not-allowed!important;
  }
`

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  width: 250px;

  .names {
    width: 100%;
    text-align: left;
  }

  .email {
    width: 100%;
    overflow: auto;
    text-align: left;
    color: ${COLOR_TEXT_MUTED};
  }

  .email::-webkit-scrollbar {
    height: 5px;
    border-radius: 10px;
    background: grey;
  }
`

const PhoneNumber = styled.div`
  width: 110px;
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