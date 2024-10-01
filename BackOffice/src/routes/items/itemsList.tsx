import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IItemsInfos } from "../../interfaces/items";
import { useItems } from "../../common/contexts/itemContext";
import EditCreateItem from "../../components/EditCreateItem";
import ItemCard from "../../components/ItemCard"
import { COLOR_BABCKGROUND, COLOR_TEXT, COLOR_WHITE } from "../../constants/cts_colors";

const FormInitialState = {
  id : -1,
  title: '',
  description: '',
  price: '',
  image_path: '',
  status: '',
  created_at: '',
}

const ItemsList = () => {
  const { t } = useTranslation();
  const { onGetAllItems, onCreateItem, onDeleteItem, onUpdateItem } = useItems()
  const [ items, _setItems ] = useState<IItemsInfos[]>([])
  const [ totalItems, _setTotalItems ] = useState<number>(0)
  const [ totalPublished, _setTotalPublished ] = useState<number>(0)
  const [ totalNotPublished, _setTotalNotPublished ] = useState<number>(0)
  const [ editId, _setEditId ] = useState<number>(-1)
  const [ createItem, _setCreateItem ] = useState<boolean>(false)
  const [ formValues, _setFormValues ] = useState<IItemsInfos>(FormInitialState)
  const [ selectedId, _setSelectedId ] = useState<number[]>([])
  const [ selectedFilter, _setSelectedFilter ] = useState<string>('all')
  const [ deleteButton, _setDeleteButton ] = useState<boolean>(false)

  useEffect(() => {
    onGetAllItems()
      .then((response:any) => {
        _setItems(response)
        _setTotalItems(response.length)
        _setTotalNotPublished(response.filter((item:IItemsInfos) => item.status === 'Non Publié').length)
        _setTotalPublished(response.filter((item:IItemsInfos) => item.status === 'Publié').length)
      } )
      .catch ((error:any) => console.error(error))
  }, [])

  useEffect(() => {
    if (editId < 0)
      _setFormValues(FormInitialState)
  }, [editId])

  const handleSubmit = (event : FormEvent) => {
    event.preventDefault()
    const { id, status, title, description, price, image_path } = formValues

    if (createItem) {
      onCreateItem({id, status, title, description, price, image_path})
        .then((response :any) => {
          _setItems(items => [...items, response])
        })
        .catch ((error:any) => alert(error))
      _setCreateItem(false)
    } else {
      const update = items.map((item) => {
        if (item.id === formValues.id) {
          return formValues
        }
        return item
      })
      _setEditId(-1)

      onUpdateItem({id, status, title, description, price, image_path})
        .then((response:any) => {
          _setItems(update)
        })
        .catch ((error:any) => {
          alert(error)
        })
    }
    _setFormValues(FormInitialState)
  }

  const handleDeleteItem = (itemId: number[]) => {
    itemId.map(id =>
      onDeleteItem({ id })
        .then(() => {
          _setItems(items => 
            items.filter((item) => {
              return item.id !== id
            })
          )
        })
        .catch ((error:any) => {
          alert(error)
        })
      )
  }

  const handleChangeItemData = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    _setFormValues({...formValues, [name] : value})
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    _setFormValues({...formValues, [name] : value})
  }

  const handleEditId = (event: any, item : IItemsInfos) => {
    event.preventDefault()
    _setEditId(item.id)
    _setFormValues({
      id : item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      image_path: item.image_path,
      status: item.status,
      created_at: '',
    })
  }
  console.log('createItem:', createItem)
  return (
    <Wrapper>
        <Menu>
          <div className='header'>
              <span>{t(`mainTitle`, {ns: "items"})}</span>
            </div>
            <div className="category-element">
              <button onClick={() => _setSelectedFilter("all")}>{t(`filter.all`, {ns: "items"})}</button>
              <div className="total purple">
                <div className="number">{totalItems}</div>
              </div>
            </div>
            <div className="category-element">
              <button onClick={() => _setSelectedFilter("Publié")}>{t(`filter.published`, {ns: "items"})}</button>
              <div className="total blue">
                <div className="number">{totalPublished}</div>
              </div>
            </div>
            <div className="category-element">
              <button onClick={() => _setSelectedFilter("Non Publié")}>{t(`filter.notPublished`, {ns: "items"})}</button>
              <div className="total orange">
                <div className="number">{totalNotPublished}</div>
              </div>
            </div>
        </Menu>
        {
          <Table>
            <Header>
              {
                !createItem && 
                <button onClick={() => editId < 0 ? _setCreateItem(true) : null} className="add-button">{t(`addItems`, {ns: "items"})}</button> 
              }
              {
                <button onClick={(event) => handleDeleteItem(selectedId)}>{t(`remove`, {ns: "items"})}</button>
              }
            </Header>
            <Items>
            {
              (items.length === 0 || (selectedFilter === "Published" && totalPublished === 0) || (selectedFilter === "notPublished" && totalNotPublished === 0)) && 
                <p>{t(`empty`, {ns: "items"})}</p>
              ||
              (
                items.map((item) => (
                  ( item.status === selectedFilter || selectedFilter === "all") &&
                  <Fragment key={item.id}>
                  { 
                    editId === item.id ? 
                      <EditCreateItem values={formValues} handleChangeItemData={handleChangeItemData} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} _setEditId={_setEditId} createItem={createItem} _setCreateItem={_setCreateItem} /> : 
                      <ItemCard item={item} handleEditId={handleEditId} handleDeleteItem={handleDeleteItem} createItem={createItem} _setSelectedId={_setSelectedId} selectedId={selectedId} />
                  }
                  </Fragment>
                ))
              )
            }
            {
              createItem && editId < 0 &&
              <EditCreateItem values={formValues} handleChangeItemData={handleChangeItemData} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} _setEditId={_setEditId} createItem={createItem} _setCreateItem={_setCreateItem} />
            }
            </Items>
          </Table>
        }
        {
          deleteButton && 
          <Modal> 
            <div className="content">
              {t(`removeConfirmation.text`, {ns: "messages"})}
              <div className="buttons">
                <button onClick={() => handleDeleteItem(selectedId)}>{t(`removeConfirmation.yes`, {ns: "messages"})}</button>
                <button onClick={() => _setDeleteButton(false)}>{t(`removeConfirmation.no`, {ns: "messages"})}</button>
              </div>
            </div>
          </Modal>
        }
    </Wrapper>
  )
}

export default ItemsList;

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

const Items = styled.div`
  background-color: ${COLOR_WHITE};
  margin-top: 25px;
  border-radius: 4px;
  border: 1px solid rgba(19, 24, 44, 0.125);
  box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
  color: ${COLOR_TEXT}
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