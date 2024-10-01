export const USER_ROLE_ADMIN = 1
export const USER_ROLE_USER = 2

export const roleToString = (roleId) => {
  switch(roleId) {
  case USER_ROLE_ADMIN:
    return 'Administrateur'
  }
  return 'Client'
}

export const roleToId = (role) => {
  switch(role) {
  case 'Administrateur':
    return USER_ROLE_ADMIN
  }
  return USER_ROLE_USER
}