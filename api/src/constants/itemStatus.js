export const ITEM_PUBLISHED = 1
export const ITEM_TO_PUBLISH = 2

export const ItemStatusToString = (statusId) => {
  switch(statusId) {
  case ITEM_TO_PUBLISH:
    return 'Non Publié'
  }
  return 'Publié'
}

export const ItemStatusToId = (status) => {
  switch(status) {
  case 'Non Publié':
    return ITEM_TO_PUBLISH
  }

  return ITEM_PUBLISHED 
}