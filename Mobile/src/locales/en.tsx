export default {
  // alerts ----------------------------------------------------------------
  alerts: {
    // account
    pwdChanged: "Your password has been changed.",
    accountEdited: "Your account informations have been changed",
    accountDeleted: "Your account has been deleted",
    // contact
    contactMessageSent: "Your message has been sent",
    // success
    orderConfirmedTitle: "Success",
    orderConfirmedMessage: "Your order is confirmed!",
  },

  // confirm alerts
  confirmAlerts: {
    // confirm logout
    logout: {
      title: "Logout",
      message: "Do you want to logout ?",
      acceptBtn: "Yes",
      cancelBtn: "No",
    },
    // confirm delete account
    deleteAccount: {
      title: "Delete account",
      message: "Do you want to delete your account?",
      acceptBtn: "Yes",
      cancelBtn: "No",
    },
  },

  // errors ----------------------------------------------------------------
  errors: {
    form: {
      // no match
      passwordNoMatch: "The passwords are not the same",
      // empty
      emptyEmail: "Please enter an email",
      emptyPassword: "Please enter the password",
      emptyFirstName: "Please enter the first name",
      emptyLastName: "Please enter the last name",
      emptyToken: "Please enter the token",
      emptyContactMessage: "Please enter your message",
      emptyItemTitle: "Please enter a title",
      emptyItemDescription: "Please enter a description",
      emptyItemImage: "Please enter an image",
      // not valid
      notValidEmail: "Please enter a valid email",
      notValidPassword: "The password must contain at least 6 characters",
    },
    payment: {
      errorCode: "Error code:"
    },
  },

  // simple translations ---------------------------------------------------
  // header
  header: {
    titles: {
      home: "HOME",
      contact: "CONTACT",
    }
  },

  // home screen
  homeScreen: {
    sections: {
      jobs: {
        title: "JOBS",
        box: {
          viewMoreBtn: "VIEW MORE",
        },
      },
    },
  },

  // item single screen
  itemSingleScreen: {
    optionBtns: {
      description: "DESCRIPTION",
    },
    sections: {
      description: {
        title: "DESCRIPTION",
      }
    },
    menu: {
      btnText: "APPLY NOW",
    },
  },

  // log in screen
  loginScreen: {
    mainTitle: "Welcome Back!",
    form: {
      placeholders: {
        email: 'Email',
        password: 'Password',
      },
      routeToSignup: {
        text: "Don't have an account?",
        button: 'Sign up',
      },
      routeToLostPassword: "Forgot Password",
    },
  },

  // lost password screen
  lostPasswordScreen: {
    mainTitle: "Lost Password",
    form: {
      texts: {
        email: "Email",
      },
      placeholders: {
        email: "Email",
      },
      routeToLogin: "Back to log in",
    },
    formSubmittedInfo: "A token to reset your password has been sent to",
  },

  // reset password screen
  resetPasswordScreen: {
    mainTitle: "Lost Password",
    form: {
      placeholders: {
        token: "Token",
        email: "Email",
        password: "Password",
        repeatPassword: "Confirm password",
      },
    },
    passwordChangedInfo: {
      firstPartText: "Your password has been changed. You can now",
      button: "connect",
      lastPartText: "to your account.",
    },
    bottom: {
      redirectToLogin: "Back to log in",
    }
  },

  // sign up screen
  signupScreen: {
    mainTitle: "Welcome to Dear Job",
    form: {
      placeholders: {
        lastName: 'Last Name',
        firstName: 'First Name',
        email: 'Email',
        phoneNumber: 'Phone Number (optional)',
        password: 'Password',
        repeatPassword: 'Repeat Password',
      },
      routeToLogin: 'Already have an account ?',
      redirectToLogin: {
        text: "You have an account ?",
        button: "Sign in"
      },
    },
  },

  // account screen
  accountScreen: {
    header: {
      mainTitle: "PROFILE",
      logoutBtn: "LOG OUT"
    },
    sections: {
      basicInfos: {
        title: "BASIC INFORMATION",
        editBtn: "Edit",
        saveBtn: "Save",
        form: {
          texts: {
            lastName: "Last Name",
            firstName: "First Name",
            email: "Email",
            phoneNumber: "Phone number (optional)",
          },
          placeholders: {
            lastName: "Last Name",
            firstName: "First Name",
            email: "Email",
            phoneNumber: "Phone number (optional)",
          },
        },
      },
      changePassword: {
        title: "CHANGE PASSWORD",
        changeBtn: "Change",
        saveBtn: "Save",
        form: {
          texts: {
            password: "Password",
            repeatPassword: "Repeat password",
          },
          placeholders: {
            password: "Password",
            repeatPassword: "Repeat password",
          },
        },
      },
      deleteAccount: {
        title: "DELETE ACCOUNT",
        deleteBtn: "Delete",
        confirmDeleteBtn: "Confirm deletion",
        form: {
          texts: {
            email: "Email",
            password: "Password",
          },
          placeholders: {
            email: "Email",
            password: "Password",
          },
        },
      },
    },
  },

  // contact screen
  contactScreen: {
    form: {
      placeholders: {
        lastName: "Last Name",
        firstName: "First Name",
        email: "Email",
        phoneNumber: "Phone Number (optional)",
        message: "Write your message...",
      },
    },
  },

  // about screen
  aboutScreen: {
    mainTitle: "About Us",
  },

  // legal notices screen
  legalNoticesScreen: {
    mainTitle: "Legal Notices",
  },
  
};
