// validate email
export const isValidEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  }
  else {
    return true;
  }
}

// validate password
// it has to be at least 6 characters
export const isValidPassword = (password) => {
  if(password.length < 6) {
    return false;
  }else {
    return true;
  }
}