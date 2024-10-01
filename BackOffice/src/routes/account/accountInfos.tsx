import React, { Dispatch, SetStateAction, useState, ChangeEvent } from "react"
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IUserInfos } from "../../interfaces/user"
import { useUser } from "../../common/contexts/userContext";

const AccountInfos = ( { user, _setUser, editAccount, _setEditAccount } : 
  { user: IUserInfos, _setUser: Dispatch<SetStateAction<IUserInfos>>,editAccount: boolean, _setEditAccount: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation();
  const [changeImage, _setChangeImage ] = useState<boolean>(false)
  const { firstName, lastName, email, phoneNumber } = user
  const { onEditAccount } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    _setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Wrapper>
      {
        <>
          <Image>
            <img src={user.image} alt={"" + t("accountImage", {ns: "accountPage"})} />
          </Image>
          {/* first name + last name*/}
          <div className="elem">
            {user.firstName + ' ' + user.lastName}
          </div>
          <div className="elem">
            {/* email */}
            {user.email}
          </div>
          {/* phone number */}
          <div className="elem">
            {user?.phoneNumber}
          </div>
        </>
      }
    </Wrapper>
  )
}

export default AccountInfos

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  
  .elem {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
  }
`

const Image = styled.div`
  img {
    align-self: center;
    height: 100px;
    width: 100px;
    margin-bottom: 20px;
    border: 1px solid;
  }

  .change-img {
    position: relative;
    .change-img-hover {
      display: none;
    }
  }

  .change-img:hover {
    cursor: pointer;
    .change-img-hover {
      position: absolute;

      display: block;
    }
  }
`

const Names = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
  width: 100%;
`

