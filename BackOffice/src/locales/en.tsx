export default {
  // complex translations --------------------------------------------------
  translation: {
    // login page
    loginPage: {
      form: {
        links: {
          navigateToSignUp: "Don't have an account?<br/> Sign up here"
        }
      }
    },

    // signup page
    signupPage: {
      form: {
        links: {
          navigateToLogIn: "Already registered?<br/> Log in here"
        }
      }
    },

    // reset password page
    resetPasswordPage: {
      form: {
        infos: {
          passwordChanged: `Your password has been changed. You can now <Link to={{loginPath}}>connect</Link> to your account.`,
        }
      }
    },
    
  },

  // simple translations ---------------------------------------------------
  // common / general items
  common: {},

  // header
  header: {
    elements: {
      home: "Home",
      users: "Users",
      messages: "Messages",
      articles: "Articles",
      about: "About",
    },
    language: "Language",
    loginLink: "Log In",
    accountLink: "Account",
  },

  // footer
  footer: {
    elements: {
      aboutUs: "About us",
      legals: "Legal notices",
    }
  },

  // login page
  loginPage: {
    mainTitle: "Welcome back",
    description : "Login to manage your account",
    form: {
      labels: {
        email: "Email",
        password: "Password",
      },
      placeholders: {
        email: "Enter email",
        password: "Password",
      },
      submitBtn: "Sign in",
      links: {
        lostPassword: "Forgot your password ?",
        noAcount: "Do not have an account ?",
        signUp: 'Sign up'
      }
    }
  },

  // signup page
  signupPage: {
    mainTitle: "Sign Up",
    form: {
      labels: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone number",
        password: "Password",
        repeatPassword: "Repeat password"
      },
      placeholders: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone number",
        password: "Password",
        repeatPassword: "Repeat password"
      },
      submitBtn: "Sign Up",
    }
  },

  // reset password page
  resetPasswordPage: {
    mainTitle: "Change password",
    form: {
      labels: {
        email: "Email",
        password: "Password",
        repeatPassword: "Repeat password",
      },
      placeholders: {
        email: "Email",
        password: "Password",
        repeatPassword: "Repeat password",
      },
      submitBtn: "Edit"
    }
  },

  // lost password page
  lostPasswordPage: {
    mainTitle: "Forgot your password ?",
    back: "Back",
    form: {
      labels: {
        email: "Email:",
      },
      placeholders: {
        email: "Email",
      },
      submitBtn: "Send reset link",
      infos: {
        linkSent: "A link to reset your password has been sent to"
      }
    }
  },

  // account list
  accountList: {
    mainTitle : "Groups",
    remove : "Remove",
    addAccount: "Add Account",
    empty: "Empty",
    options: {
      edit: 'Edit',
      remove: "Delete item",
    },
    filter: {
      all: "All",
      clients: "Clients",
      admin: "Administrator",
    },
    removeConfirmation:  {
      text: "Are you sure you want to delete the account(s) ?",
      yes: "yes",
      no: 'no',
    },
  },

  // messages
  messages : {
    mainTitle: "Groups",
    remove : "Remove",
    empty: "Empty",
    options: {
      edit: 'Edit',
      remove: "Delete item",
    },
    status: {
      msgToProcess : "To process",
      msgProcessed: "Processed",
    },
    filter: {
      all: "All",
      msgToProcess : "To process",
      msgProcessed: "Processed",
    },
    removeConfirmation:  {
      text: "Are you sure you want to delete the message(s) ?",
      yes: "yes",
      no: 'no',
    },
  },

  // items 
  items : {
    mainTitle: "Groups",
    remove : "Remove",
    addItems: "Add",
    empty: "Empty",
    options: {
      edit: 'Edit',
      remove: "Delete item",
    },
    filter: {
      all: "All",
      published : "Published",
      notPublished: "Not published",
    },
  },

  // EditCreateAccount
  editCreateAccount: {
    save: "Save",
    back: "Back",
  },

  // account page
  accountPage: {
    mainTitle: "Profile",
    accountImage: "profile",
    logout: "Logout",
    deleteAccountForm: {
      labels: {
        email: "Email",
        password: "Password",
      },
      placeholders: {
        email: "Email",
        password: "Password",
      },
      submitBtn: "Delete Account",
      closeBtn: "Close",
    },
    accountOptions: {
      edit: "Edit",
      changePassword: "Change password",
      deleteAccount: "Delete account",
    },
    accountInfos: {
      lastName: "Last Name",
      firstName: "First Name",
      email: "Email",
      phoneNumber: "Phone number",
    },
  },

  // edit account page
  editAccountPage: {
    back: "Back",
    submitBtn: "Save",
    form: {
      labels: {
        lastName: "Last Name:",
        firstName: "First Name:",
        email: "Email:",
        phoneNumber: "Phone number:",
        profileImage: "Profile image:",
      },
      placeholders: {
        lastName: "Last Name",
        firstName: "First Name",
        email: "Email",
        phoneNumber: "Phone number",
      },
    },
  },

  // change password page
  changePasswordPage: {
    mainTitle:  "Change password",
    redirectToAccountLink: "Back to account",
    form: {
      labels: {
        password: "Password",
        repeatPassword: "Repeat password",
      },
      placeholders: {
        password: "Password",
        repeatPassword: "Repeat password",
      },
      submitBtn: "Change",
    }
  },

  // legal notices page
  legalNoticesPage: {
    mainTitle: "Legal Notices",
  },

  // about page
  aboutPage: {
    mainTitle: "About us",
  },

  // contact page
  contactPage: {
    mainTitle: "Contact",
    form: {
      labels: {
        lastName: "Last Name",
        firstName: "First Name",
        email: "Email",
        phoneNumber: "Phone number",
        message: "Message",
      },
      placeholders: {
        lastName: "Last Name",
        firstName: "First Name",
        email: "Email",
        phoneNumber: "Phone number",
        message: "Your message...",
      },
      infos: {
        messageSent: "Your message has been sent",
      },
      submitBtn: "Contact",
    }
  },

  // home page
  dashboard: {
    mainTitle: "Dashboard",
  },

  // Edit user account
  editUser: {
    inputs : {
      lastName: "First Name",
      firstName: "Last Name",
      email: "Email",
      password: "Password",
      roleName: "Role Name",
      phoneNumber: "Phone number",
    }
  },
}