
export const checkEmptyInput = (str: string) => {
  if (str.trim().length === 0) {
    return false
  }
  return true
}

export const checkStringEquality = (str1: string, str2: string) => {
  if (str1 !== str2)
    return false
  return true
}

export const checkValidPhoneNumber = (phonenumber: any) => { // any because isNaN() doesn't accept other types than number, but the type of phonenumber is string
  if (phonenumber.trim().length === 0 || isNaN(phonenumber))
    return false
  return true
}
