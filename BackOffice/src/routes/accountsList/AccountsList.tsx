import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../common/contexts/userContext";
import { useTranslation } from "react-i18next";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import { IUserInfos } from "../../interfaces/user";
import AccountCard from "../../components/AccountCard";
import EditCreateAccount from "../../components/EditCreateAccount";
import { COLOR_BABCKGROUND, COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";

const FormInitialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber : "",
  image: "",
  roleName: "Client",
  password: "",
  id: -1,
  created_at: ""
}

const AccountsList = () => {
  const { t } = useTranslation();
  const { user } = useAuthentication();
  const { onGetAllUsersAdmin, onUpdateAccountByAdmin, onDeleteAccountByAdmin, onCreateAccountByAdmin } = useUser()
  const [ accounts, _setAccounts ] = useState<IUserInfos[]>([])
  const [ totalAccounts, _setTotalAccounts ] = useState<number>(0)
  const [ totalAdmin, _setTotalAdmin ] = useState<number>(0)
  const [ totelClients, _setTotalClients ] = useState<number>(0)
  const [ editId, _setEditId ] = useState<number>(-1)
  const [ createAccount, _setCreateAccount ] = useState<boolean>(false)
  const [ formValues, _setFormValues ] = useState<IUserInfos>(FormInitialState)
  const [ selectedId, _setSelectedId ] = useState<number[]>([])
  const [ deleteButton, _setDeleteButton ] = useState<boolean>(false)
  const [ selectedFilter, _setSelectedFilter ] = useState<string>('all')
  
  useEffect(() => {
    onGetAllUsersAdmin()
      .then((response:any) => {
        _setAccounts(response)
        _setTotalAccounts(response.length)
        _setTotalAdmin(response.filter((user:IUserInfos) => user.roleName === 'Administrateur').length)
        _setTotalClients(response.filter((user:IUserInfos) => user.roleName !== 'Administrateur').length)
      } )
      .catch ((error:any) => console.error(error))
  }, [createAccount])

  useEffect(() => {
    if (editId < 0)
      _setFormValues(FormInitialState)
  }, [editId])


  const handleSubmit = (event : FormEvent) => {
    event.preventDefault()
    const {email, firstName, lastName, phoneNumber, roleName, password, id} = formValues
    if (createAccount) {
      onCreateAccountByAdmin({email, firstName, lastName, phoneNumber, roleName})
        .then((response : any) => {
          console.log("response")
          _setAccounts(accounts => [...accounts , response ])
        })
        .catch((error:any) => alert(error))
      _setCreateAccount(false)
    } else {
      const update = accounts.map((account) => {
        if (account.id === id) {
          delete formValues.password
          return formValues
        }
        return account
      })
      _setEditId(-1)
      onUpdateAccountByAdmin({email, firstName, lastName, phoneNumber, roleName, password, id})
        .then(() => {
          _setAccounts(update)
          _setFormValues(FormInitialState)
        })
        .catch ((error:any) => {
          alert(error)
        })
    }
    _setFormValues(FormInitialState)  
  }

  const handleDeleteAccounts = (usersId : number[]) => {
    usersId.map(id =>
      onDeleteAccountByAdmin({ id })
        .then(() => {
          _setAccounts(accounts => 
            accounts.filter((user) => {
              return user.id !== id
            })
          )
        })
        .catch ((error:any) => {
          alert(error)
        })
    )
  }

  const handleChangeAccountData = (event : ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target
    _setFormValues({...formValues, [name] : value})
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    _setFormValues({...formValues, [name] : value})
  }

  const handleEditId = (event: any, user : IUserInfos) => {
    event.preventDefault()
    _setEditId(user.id)
    _setCreateAccount(false)
    _setFormValues({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber : user.phoneNumber ?? '',
      image: user.image,
      roleName: user.roleName,
      password: user.password,
      id: user.id,
      created_at: user.created_at,
    })
  }

  return (
    <Wrapper>
      <Menu>
        <div className='header'>
          <span>{t(`mainTitle`, {ns: "accountList"})}</span>
        </div>
        <div className="category-element">
          <button onClick={() => _setSelectedFilter("all")}>{t(`filter.all`, {ns: "accountList"})}</button>
          <div className="total purple">
            <div className="number">{totalAccounts}</div>
          </div>
        </div>
        <div className="category-element">
          <button onClick={() => _setSelectedFilter("Client")}>{t(`filter.clients`, {ns: "accountList"})}</button>
          <div className="total blue">
            <div className="number">{totelClients}</div>
          </div>
        </div>
        <div className="category-element">
          <button onClick={() => _setSelectedFilter("Administrateur")}>{t(`filter.admin`, {ns: "accountList"})}</button>
          <div className="total orange">
            <div className="number">{totalAdmin}</div>
          </div>
        </div>
      </Menu>
      {
        <Table>
          <Header>
            {
              !createAccount &&
              <button onClick={( ) => editId < 0 ? _setCreateAccount(true) : null} className="add-button">{t(`addAccount`, {ns: "accountList"})}</button> 
            }
            {
              <button onClick={() => { selectedId.length > 0 ? _setDeleteButton(true) : null}}>{t(`remove`, {ns: "accountList"})}</button>
            }
          </Header>
          <Accounts>
            {
              ((selectedFilter === "Client" && totelClients === 0) || (selectedFilter === "Administrateur" && totalAdmin === 0)) && 
                <p>{t(`empty`, {ns: "accountList"})}</p>
              ||
              (
                  accounts.map((account) =>(
                  ( account.roleName === selectedFilter || selectedFilter === "all") &&
                  <Fragment key={account.id}>
                  { 
                    editId === account.id ? 
                      <EditCreateAccount values={formValues} handleChangeAccountData={handleChangeAccountData} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} _setEditId={_setEditId} createAccount={createAccount} _setCreateAccount={_setCreateAccount}/> : 
                      <AccountCard account={account} handleEditId={handleEditId} handleDeleteAccounts={handleDeleteAccounts} createAccount={createAccount} _setSelectedId={_setSelectedId} selectedId={selectedId}/>
                  }
                  </Fragment>
                )) 
              )
            }
            {
              createAccount && editId < 0 &&
              <EditCreateAccount values={formValues} handleChangeAccountData={handleChangeAccountData} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} _setEditId={_setEditId} createAccount={createAccount} _setCreateAccount={_setCreateAccount}/>
            }
          </Accounts>
        </Table>
      }
      {
        deleteButton && 
        <Modal> 
          <div className="content">
            {t(`removeConfirmation.text`, {ns: "accountList"})}
            <div className="buttons">
              <button onClick={() => handleDeleteAccounts(selectedId)}>{t(`removeConfirmation.yes`, {ns: "accountList"})}</button>
              <button onClick={() => _setDeleteButton(false)}>{t(`removeConfirmation.no`, {ns: "accountList"})}</button>
            </div>
          </div>
        </Modal>
      }
    </Wrapper>
  )
}

export default AccountsList;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${COLOR_BABCKGROUND};
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-arround;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  transition: opacity .15s linear;
  padding: 12px 16px;
  color: ${COLOR_TEXT};
  min-width: 200px;
  text-align: left;

  .header {
    min-height: 48px;
    padding: 12px 8px;
    font-size: 20px;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${COLOR_TEXT};
  }

  .category-element {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    font-size: 14px;

    .total {
      position: relative;
      border-radius: 160px;
      padding: 0 10px;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
      min-width: 15px;
      max-width: 30px;
    }

    .number {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .purple {
      z-index: 1;
      color: ${COLOR_WHITE};
      background: linear-gradient(45deg,#f54394,#f543ed);
    }

    .blue {
      color: ${COLOR_WHITE};
      background: linear-gradient(45deg,#14bae4,#14e4a6);
    }

    .orange {
      color: ${COLOR_WHITE};
      background: linear-gradient(45deg,#f4c414,#f45414);
    }
  }
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 70%;
  color:  ${COLOR_TEXT};
  z-index: 1;
`

const Accounts = styled.div`
  background-color: ${COLOR_WHITE}; 
  margin-top: 25px;
  border-radius: 4px;
  border: 1px solid rgba(19, 24, 44, 0.125);
  box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
  color: ${COLOR_TEXT};
`

const Header = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 25px;

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

  .add-button {
    margin-right: 10px;
  }
`

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fefefe;
    padding: 10px;
    border: 1px solid #888;
    width: 40%;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 15%;
    }

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
  }
`