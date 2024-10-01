import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react"
import styled from "styled-components";
import { COLOR_ACTIVE_LINK, COLOR_BLUE_MORE, COLOR_BUTTON, COLOR_TEXT, COLOR_TEXT_MUTED } from "../constants/cts_colors";
import { IMessageInfos } from "../interfaces/message"
import { useTranslation } from "react-i18next";

const MessageCard = ({message, handleEditId, handleDeleteMessage, _setSelectedMessage,  selectedMessages} : 
  {message : IMessageInfos, handleEditId : Function, handleDeleteMessage : Function, _setSelectedMessage : Dispatch<SetStateAction<number[]>>, selectedMessages:number[] }) => {
  const [moreButton, _setMoreButton] = useState<boolean>(false)
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (ref.current && !(ref.current.contains(e.target)))
        _setMoreButton(false)
    }

    document.addEventListener("click", checkIfClickedOutside)
    return () => document.removeEventListener("click", checkIfClickedOutside)
  }, [ref]) 

  const handleInput = () => {
    let tmp : number[] = []

    if (selectedMessages.indexOf(message.id) === -1)
      _setSelectedMessage(selectedMessages => [...selectedMessages, message.id])
    else {
      tmp = selectedMessages.filter(id => id !== message.id)
      _setSelectedMessage(tmp)
    }
  }

  return (
    <Wrapper>
      <Checkbox>
        <input 
          value={message.id}
          onClick={handleInput}
          type="checkbox"
        /> 
        <span className="checkmark"></span>
      </Checkbox>
      {message.status === "Traité" ? t(`status.msgProcessed`, {ns: "messages"}) : t(`status.msgToProcess`, {ns: "messages"})}
      <NameEmail>
        <div className="names">{message.lastName + ' ' + message.firstName}</div>
        <div className="email">{message.email}</div>
      </NameEmail>
      <PhoneNumber>
        { message.phoneNumber ? message.phoneNumber : '---' }
      </PhoneNumber>
      <div className="message">
        {message.message}
      </div>
      {message.created_at}
      <More>
        {
          <button onClick={() => _setMoreButton(!moreButton)}><i className="ri-more-2-line" ref={ref}></i></button>
        }
        {
          moreButton && 
          <span className="options">
            <button onClick={(event) => handleEditId(event, message)}>{t(`options.edit`, {ns: "messages"})}</button>
            <button onClick={(event) => handleDeleteMessage(event, message.id)}>{t(`options.remove`, {ns: "messages"})}</button>
          </span>
        }
      </More>
    </Wrapper>
  )
}

export default MessageCard

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

  .message {
    padding: 3px 6px;
    white-space: nowrap; 
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  &:hover {
    .message {
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

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  width: 250px;
  margin-left: 67px;

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

const Message = styled.div`

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