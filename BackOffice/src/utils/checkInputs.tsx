
export const checkEmptyInput = (str: string) => {
  if (str) {
    if (str.trim().length === 0) {
      return false
    }
  }
  return true
}

export const checkStringEquality = (str1: string, str2: string) => {
  if (str1 !== str2)
    return false
  return true
}
