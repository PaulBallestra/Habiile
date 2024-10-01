import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IMessageInfos } from "../../interfaces/message";
import MessageCard from "../../components/MessageCard";
import EditMessage from "../../components/EditMessage";
import { useMessage } from "../../common/contexts/messageContext";
import { COLOR_BABCKGROUND, COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";

const FormInitialState = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber : '',
  status: '',
  id: -1,
  message: '',
  created_at: '',
}

const Messages = () => {
  const { t } = useTranslation();
  const { onGetAllMessages, onUpdateMessage, onDeleteMessage } = useMessage()
  const [ messages, _setMessages ] = useState<IMessageInfos[]>([])
  const [ totalMessages, _setTotalMessages ] = useState<number>(0)
  const [ totalMessagesToProcess, _setTotalMessagesToProcess ] = useState<number>(0)
  const [ totalMessagesProcessed, _setTotalMessagesProcessed ] = useState<number>(0)
  const [ editId, _setEditId ] = useState<number>(-1)
  const [ formValues, _setFormValues ] = useState<IMessageInfos>(FormInitialState)
  const [ selectedMessages, _setSelectedMessage ] = useState<number[]>([])
  const [ deleteButton, _setDeleteButton ] = useState<boolean>(false)

  useEffect(() => {
    onGetAllMessages()
      .then((response : any) => {
        _setMessages(response)
        _setTotalMessages(response.length)
        _setTotalMessagesToProcess(response.filter((message: IMessageInfos) => message.status === 'À Traiter').length)
        _setTotalMessagesProcessed(response.filter((message: IMessageInfos) => message.status === 'Traité').length)
      })
      .catch ((error:any) => console.log ("error:", error))
  }, [])

  const handleSubmitChange = (event : FormEvent) => {
    event.preventDefault()
    const update = messages.map((message) => {
      if (message.id === formValues.id) {
        return formValues
      }
      return message
    })
    _setMessages(update)
    _setEditId(-1)

    const {id, status, email, firstName, lastName, phoneNumber, message} = formValues
    onUpdateMessage({id, status, email, firstName, lastName, phoneNumber, message})
      .then((response:any) => console.log("response:", response))
      .catch ((error:any) => console.log ("error:", error))
  }

  const handleDeleteMessage = (messageId: number[]) => {
    messageId.map(id =>
      onDeleteMessage({ id })
        .then(() => {
          _setMessages(messages => 
            messages.filter((message) => {
              return message.id !== id
            })
          )
          _setDeleteButton(false)
        })
        .catch ((error:any) => {
          alert(error)
        })
    )
  }

  const handleChangeMessageData = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    _setFormValues({...formValues, [name] : value})
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    _setFormValues({...formValues, [name] : value})
  }

  const handleEditId = (event: any, message : IMessageInfos) => {
    event.preventDefault()
    _setEditId(message.id)
    _setFormValues({
      email: message.email,
      firstName: message.firstName,
      lastName: message.lastName,
      phoneNumber : message.phoneNumber ?? '',
      status: message.status,
      id: message.id,
      message: message.message,
      created_at: message.created_at,
    })
  }
  const [ selectedFilter, _setSelectedFilter ] = useState<string>('all')

  return (
    <Wrapper>
      <Menu>
        <div className='header'>
            <span>{t(`mainTitle`, {ns: "messages"})}</span>
          </div>
          <div className="category-element">
            <button onClick={() => _setSelectedFilter("all")}>{t(`filter.all`, {ns: "messages"})}</button>
            <div className="total purple">
              <div className="number">{totalMessages}</div>
            </div>
          </div>
          <div className="category-element">
            <button onClick={() => _setSelectedFilter("msgProcessed")}>{t(`filter.msgProcessed`, {ns: "messages"})}</button>
            <div className="total blue">
              <div className="number">{totalMessagesProcessed}</div>
            </div>
          </div>
          <div className="category-element">
            <button onClick={() => _setSelectedFilter("msgToProcess")}>{t(`filter.msgToProcess`, {ns: "messages"})}</button>
            <div className="total orange">
              <div className="number">{totalMessagesToProcess}</div>
            </div>
          </div>
      </Menu>
      {
        <Table>
          <Header>
            <button onClick={() => { selectedMessages.length > 0 ? _setDeleteButton(true) : null}}>{t(`remove`, {ns: "messages"})}</button>
          </Header>
          <Message>
            {
              ((messages.length === 0 || selectedFilter === "msgProcessed" && totalMessagesProcessed === 0) || (selectedFilter === "msgToProcess" && totalMessagesToProcess === 0)) && 
                <p>{t(`empty`, {ns: "messages"})}</p>
              ||
              (
                messages.map((message) => (
                  <span key={message.id}>
                  { 
                    editId === message.id ? 
                      <EditMessage values={formValues} handleChangeMessageData={handleChangeMessageData} handleSelectChange={handleSelectChange} handelSubmitChange={handleSubmitChange} _setEditId={_setEditId} /> : 
                      <MessageCard message={message} handleEditId={handleEditId} handleDeleteMessage={handleDeleteMessage} _setSelectedMessage={_setSelectedMessage} selectedMessages={selectedMessages}/>
                  }
                  </span>
                ))
              )
            }
          </Message>
        </Table>
      }
      {
        deleteButton && 
        <Modal> 
          <div className="content">
            {t(`removeConfirmation.text`, {ns: "messages"})}
            <div className="buttons">
              <button onClick={() => handleDeleteMessage(selectedMessages)}>{t(`removeConfirmation.yes`, {ns: "messages"})}</button>
              <button onClick={() => _setDeleteButton(false)}>{t(`removeConfirmation.no`, {ns: "messages"})}</button>
            </div>
          </div>
        </Modal>
      }
    </Wrapper>
  )
}

export default Messages;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${COLOR_BABCKGROUND};
  color:  ${COLOR_TEXT};
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
`

const Message = styled.div`
  background-color: ${COLOR_WHITE};
  margin-top: 25px;
  border-radius: 4px;
  border: 1px solid rgba(19, 24, 44, 0.125);
  box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
  width: 100%;
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