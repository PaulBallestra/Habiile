import React, { FormEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useUser } from "../../common/contexts/userContext";
import { useTranslation } from "react-i18next";
import PATH from "../../constants/cts_routes";
import { CONFIMR_LOGOUT, CONFIRM_DELETE_ACCOUNT } from "../../constants/cts_confirmAlerts";
import { ACCOUNT_DELETED, ACCOUNT_EDITED, PWD_CHANGED } from "../../constants/cts_alerts";
import { getPageUrl } from "../../locales/i18n";
import { IUserInfos } from "../../interfaces/user";
import { useAuthentication } from "../../common/contexts/authenticationContext";
import MainContainer from "../../components/MainContainer";
import { COLOR_WHITE } from "../../constants/cts_colors";
import { GRADIENT_TO_RIGHT } from "../../constants/cts_gradients";
import EditAccountForm from "./editAccountForm";
import { EMPTY_FIRSTNAME_AND_LASTNAME, EMPTY_LASTNAME } from "../../constants/cts_formErrors";
import ChangePasswordForm from "./changePasswordForm";
import DeleteAccountForm from "./deleteAccountForm";

const Account = () => {
  const { t } = useTranslation();

  // user
  const { onGetCurrentUser } = useUser();
  const [ user, _setUser ] = useState<IUserInfos>({email: '', firstName: '', lastName: '', phoneNumber: '', id: -1, roleName: '', created_at: '', image: ''});

  // logout
  const { onLogout } = useAuthentication();
  const [ redirectToLogIn, _setRedirectToLogIn ] = useState<boolean>(false);

  // edit account
  const [ isEditingAccount, _setIsEditingAccount ] = useState<boolean>(false);
  const [ editAccountFormLastName, _setEditAccountFormLastName ] = useState<string>("");
  const [ editAccountFormFirstName, _setEditAccountFormFirstName ] = useState<string>("");
  const [ editAccountFormEmail, _setEditAccountFormEmail ] = useState<string>("");
  const [ editAccountFormPhoneNumber, _setEditAccountFormPhoneNumber ] = useState<string | null | undefined>("");
  const { onEditAccount } = useUser();

  // change password
  const [ isChangingPassword, _setIsChangingPassword ] = useState<boolean>(false);
  const [ newPassword, _setNewPassword ] = useState<string>("");
  const [ repeatNewPassword, _setRepeatNewPassword ] = useState<string>("");
  const { onChangePassword } = useUser();

  // delete account
  const [ isDeletingAccount, _setIsDeletingAccount ] = useState<boolean>(false);
  const [ deleteAccountFormEmail, _setDeleteAccountFormEmail ] = useState("");
  const [ deleteAccountFormPassword, _setDeleteAccountFormPassword ] = useState("");
  const { onDeleteAccount } = useUser();

  const loadUser = useCallback(() => {
    onGetCurrentUser()
    .then((responseUser) => {
      _setUser(responseUser);
      _setEditAccountFormLastName(responseUser.lastName);
      _setEditAccountFormFirstName(responseUser.firstName);
      _setEditAccountFormEmail(responseUser.email);
      _setEditAccountFormPhoneNumber(responseUser.phoneNumber);
    })
    .catch (error => alert(error))
  }, [onGetCurrentUser]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // edit - toggle edit account form
  const toggleEditAccountForm = () => {
    _setIsChangingPassword(false);
    _setIsDeletingAccount(false);
    _setIsEditingAccount(!isEditingAccount);
  }

  // edit - after submit btn pressed
  const editAccountHandleSubmit = (data: any) => {

    if (editAccountFormLastName.trim().length === 0 || editAccountFormFirstName.trim().length === 0)
      alert (t(`form.${EMPTY_FIRSTNAME_AND_LASTNAME}`,  {ns: "errors"}))
    else {
    onEditAccount({userId: user.id, lastName: editAccountFormLastName, firstName: editAccountFormFirstName, email: editAccountFormEmail, phoneNumber: editAccountFormPhoneNumber, profileImage: data.profileImage[0]})
      .then(() => {
        alert(t(ACCOUNT_EDITED, {ns: "alerts"}));
        _setIsEditingAccount(false);
        loadUser();
      })
      .catch(error => alert(error))
    }
  }

  // change password - toggle change password form
  const toggleChangePasswordForm = () => {
    _setIsDeletingAccount(false);
    _setIsEditingAccount(false);
    _setIsChangingPassword(!isChangingPassword);
  }

  // change password - handle submit
  const changePasswordHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onChangePassword({userId: user.id, newPassword, repeatPassword: repeatNewPassword})
    .then(() => {
      alert(t(PWD_CHANGED, {ns: "alerts"}))
      _setIsChangingPassword(false);
    })
    .catch((err) => {
      alert(err)
    });
  }

  // delete account - toggle delete account form
  const toggleDeleteAccountForm = () => {
    _setIsChangingPassword(false);
    _setIsEditingAccount(false);
    _setIsDeletingAccount(!isDeletingAccount);
  }

  // delete account - delete
  const deleteAccountHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const confirmDelete = confirm("" + t(CONFIRM_DELETE_ACCOUNT, {ns: "confirmAlerts"}));
    if(confirmDelete) {
      onDeleteAccount({
        email: deleteAccountFormEmail,
        password: deleteAccountFormPassword
      })
      .then(() => {
        alert(t(ACCOUNT_DELETED, {ns: "alerts"}));
        onLogout()
        .then(() => {
          _setRedirectToLogIn(true);
        })
      })
      .catch(error =>
        alert(error) 
      )
    }
  }

  // logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("" + t(CONFIMR_LOGOUT, {ns: "confirmAlerts"}));
    if(confirmLogout) {
      onLogout()
      .then(() => {
        _setRedirectToLogIn(true);
      })
      .catch(error =>
        alert(error) 
      )
    }
  }

  // if user deleted Account, redirect to login
  if(redirectToLogIn) {
    return <Navigate to={getPageUrl(PATH.login)} />
  }

  return (
    <Wrapper>
      <MainContainer about={
          <TopInfos>
            <h1>{t("mainTitle", {ns: "accountPage"})}</h1>
            <img src={user.image} alt={"" + t("accountImage", {ns: "accountPage"})} />
            <div className="account-infos">
              <span className="account-name">{user.firstName} {user.lastName}</span>
              <span>{user.email}</span>
              {
                user.phoneNumber &&
                  <span>{user.phoneNumber}</span>
              }
            </div>
            <button className="logout-btn" onClick={handleLogout}>{t("logoutBtn", {ns: "accountPage"})}</button>
          </TopInfos>
        }
      >
        <Container>
          <AccountOptions>
            {/* options */}
            <div className="options">
              {/* edit */}
              <OptionButton onClick={toggleEditAccountForm}>{t("accountOptions.edit", {ns: "accountPage"})}</OptionButton>
              {/* change password */}
              <OptionButton onClick={toggleChangePasswordForm}>{t("accountOptions.changePassword", {ns: "accountPage"})}</OptionButton>
              {/* delete account */}
              <OptionButton onClick={toggleDeleteAccountForm}>{t("accountOptions.deleteAccount", {ns: "accountPage"})}</OptionButton>
            </div>

            {/* forms */}
            <div className="forms">

              {/* edit account form */}
              {
                isEditingAccount &&
                <EditAccountForm 
                  lastName={editAccountFormLastName}
                  firstName={editAccountFormFirstName}
                  email={editAccountFormEmail}
                  phoneNumber={editAccountFormPhoneNumber}
                  _setLastName={_setEditAccountFormLastName}
                  _setFirstName={_setEditAccountFormFirstName}
                  _setEmail={_setEditAccountFormEmail}
                  _setPhoneNumber={_setEditAccountFormPhoneNumber}
                  onHandleSubmit={(data) => editAccountHandleSubmit(data)}
                />
              }

              {/* change password form */}
              {
                isChangingPassword &&
                <ChangePasswordForm 
                  newPassword={newPassword}
                  repeatNewPassword={repeatNewPassword}
                  _setNewPassword={_setNewPassword}
                  _setRepeatNewPassword={_setRepeatNewPassword}
                  onHandleSubmit={(e) => changePasswordHandleSubmit(e)}
                />
              }

              {/* delete account form */}
              {
                isDeletingAccount &&
                <DeleteAccountForm
                  email={deleteAccountFormEmail}
                  password={deleteAccountFormPassword}
                  _setEmail={_setDeleteAccountFormEmail}
                  _setPassword={_setDeleteAccountFormPassword}
                  onHandleSubmit={(e) => deleteAccountHandleSubmit(e)}
                />
              }

            </div>
          </AccountOptions>
        </Container>
      </MainContainer>
    </Wrapper>
  )
}

export default Account;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const TopInfos = styled.div`
  text-align: center;

  h1 {
    font-size: 1.3rem;
  }

  img {
    display: block;
    margin: 0 auto;
    height: 50px;
    margin-top: 10px;
    border-radius: 10px;
  }

  div.account-infos {
    display: flex;
    flex-direction: column;

    span {
      margin-top: 10px;
      font-size: 13px;
    }

    span.account-name {
      font-size: 1rem;
      font-weight: bold;
    }
  }

  button.logout-btn {
    background-color: ${COLOR_WHITE};
    padding: 5px 15px;
    margin: 15px auto 0px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`

const Container = styled.div`
  width: 80%;
  margin-top: 15rem; // This is the children of the MainContainer. This value adds to the margin top of the Children div of the parent component
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 5rem;
`

const AccountOptions = styled.div`
  display: flex;
  flex-direction: column;

  div.options {
    display: flex;
    justify-content: space-between;

    // ========= MEDIA QUERIES - AccountOptions->options ============
    @media (max-width: 900px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
  }
`

const OptionButton = styled.button`
  font-size: 12px;
  font-weight: bold;
  background: ${GRADIENT_TO_RIGHT};
  position: relative;
  padding: 10px 15px;
  width: 33%;
  text-align: center;
  color: ${COLOR_WHITE};
  border: none;
  border-radius: 3px;
  cursor: pointer;

  /* underline animation */
  :after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${COLOR_WHITE};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  :hover {
    :after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  // ========= MEDIA QUERIES - OptionButton ============
  @media (max-width: 900px) {
    width: 60%;
  }
`