export const MESSAGE_TO_PROCESS = 1
export const MESSAGE_PROCESSED = 2

export const MessageStatusToString = (statusId) => {
  switch(statusId) {
  case MESSAGE_TO_PROCESS:
    return 'À Traiter'
  }
  return 'Traité'
}

export const MessageStatusToId = (status) => {
  switch(status) {
  case 'À Traiter':
    return MESSAGE_TO_PROCESS
  }

  return MESSAGE_PROCESSED
}