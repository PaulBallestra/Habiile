export default {
  // alerts ----------------------------------------------------------------
  alerts: {
    // account
    pwdChanged: "Your password has been changed.",
    accountEdited: "Your account informations had been changed",
    accountDeleted: "Your account has been deleted",
    // forms
    emptyInput: "Input(s) cannot be empty",
  },

  // confirm alerts
  confirmAlerts: {
    confirmDeleteAccount: "Do you want to delete your account?",
    confirmLogout: "Do you want to logout ?",
  },

  // errors ----------------------------------------------------------------
  errors: {
    form: {
      // no match
      passwordNoMatch: "Passwords are not the same",
      // empty
      emptyPassword: "Please enter a password",
      emptyFirstName: "Please enter the first name",
      emptyLastName: "Please enter the last name",
      emptyFirstNameAndLastName: "Please enter the first name and last name",
      emptyToken: "Please enter the token",
      emptyContactMessage: "Please enter the message",
      emptyItemTitle: "Please enter the title",
      emptyItemDescription: "Please enter the description",
      emptyItemImage: "Please enter an image",
      emptyItemPrice: "Please enter the price",
      emptyItemStatus: "Please enter the status",
      // not valid
      notValidEmail: "Please enter a valid email (exemple@email.com)",
      notValidPassword:
        "Please enter a valid password (more than 6 characters)",
      notValidPhoneNumber: "Please enter a valid phone number (ex: 0612345678)",
    },
  },

  // complex translations --------------------------------------------------
  translation: {
    // reset password page
    resetPasswordPage: {
      form: {
        infos: {
          passwordChanged: `Your password has been changed. You can now <a href={{loginPath}}>connect</a> to your account.`,
        },
      },
    },
  },

  // simple translations ---------------------------------------------------
  // header
  header: {
    elements: {
      // home: "Home",
      // contact: "Contact",
      // about: "About Us",
      // legals: "Legals",
      diagnosis: "Diagnosis",
      estimate: "Estimate",
      workMonitoring: "Work Monitoring",
      grants: "Grants",
      login: "Login",
    },
    heroSection: {
      title: "Improve the energy performance of your property with ease",
      subtitle:
        "Get free quotes from certified craftsmen and follow your work with complete peace of mind.",
      buttonText: "START A FREE DIAGNOSTIC",
    },
    howItWorksSection: {
      title: "How it works ?",
    },
    testimonialsSection: {
      title: "What our users say",
    },
    callToAction: {
      title: "Ready to improve the performance of your property ?",
      buttonText: "START A FREE DIAGNOSTIC",
    },
    itemsLink: "Jobs",
    loginLink: "Log In",
    accountLink: "Account",
  },

  // footer
  footer: {
    elements: {
      aboutUs: "About us",
      legals: "Legal notices",
      informations: "Legal informations",
      contact: "Contact us",
    },
  },

  // login page
  loginPage: {
    mainTitle: "LOG IN",
    form: {
      labels: {
        email: "Email",
        password: "Password",
      },
      placeholders: {
        email: "Email",
        password: "Password",
      },
      links: {
        lostPassword: "Forgot your password ? Click here",
        routeToLogin: "Don't have an account? Sign up here",
      },
    },
  },

  // signup page
  signupPage: {
    mainTitle: "SIGN UP",
    form: {
      labels: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone number (optional)",
        password: "Password",
        repeatPassword: "Repeat password",
      },
      placeholders: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone number (optional)",
        password: "Password",
        repeatPassword: "Repeat password",
      },
      links: {
        navigateToLogIn: "Already registered? Log in here",
      },
    },
  },

  // reset password page
  resetPasswordPage: {
    mainTitle: "Change password",
    form: {
      labels: {
        token: "Token",
        email: "Email",
        password: "Password",
        repeatPassword: "Repeat password",
      },
      placeholders: {
        token: "Token",
        email: "Email",
        password: "Password",
        repeatPassword: "Repeat password",
      },
    },
    passwordChangedInfo: {
      firstPartText: "Your password has been changed. You can now ",
      link: "connect",
      lastPartText: " to your account.",
    },
  },

  // lost password page
  lostPasswordPage: {
    mainTitle: "Forgot your password ?",
    redirectToLogInLink: "Back to login",
    form: {
      labels: {
        email: "Email",
      },
      placeholders: {
        email: "Email",
      },
      infos: {
        linkSent: "A link to reset your password has been sent to",
      },
    },
  },

  // account page
  accountPage: {
    mainTitle: "YOUR ACCOUNT",
    accountImage: "profile",
    logoutBtn: "Logout",
    accountOptions: {
      edit: "Edit",
      changePassword: "Change password",
      deleteAccount: "Delete account",
    },
    editAccountForm: {
      form: {
        labels: {
          lastName: "Last Name",
          firstName: "First Name",
          email: "Email",
          phoneNumber: "Phone number (optional)",
          profileImage: "Profile image",
        },
        placeholders: {
          lastName: "Last Name",
          firstName: "First Name",
          email: "Email",
          phoneNumber: "Phone number (optional)",
        },
      },
    },
    changePasswordForm: {
      form: {
        labels: {
          password: "New password",
          repeatPassword: "Repeat new password",
        },
        placeholders: {
          password: "New password",
          repeatPassword: "Repeat new password",
        },
      },
    },
    deleteAccountForm: {
      labels: {
        email: "Email",
        password: "Password",
      },
      placeholders: {
        email: "Email",
        password: "Password",
      },
    },
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
    mainTitle: "CONTACT",
    form: {
      labels: {
        lastName: "Last Name",
        firstName: "First Name",
        email: "Email",
        phoneNumber: "Phone number (optional)",
        message: "Message",
      },
      placeholders: {
        lastName: "Last Name",
        firstName: "First Name",
        email: "Email",
        phoneNumber: "Phone number (optional)",
        message: "Your message...",
      },
      infos: {
        messageSent: "Your message has been sent",
      },
    },
  },

  // home page
  homePage: {
    mainTitle: "Habiile - Accueil",
    presentation: {
      title: {
        firstPart: "We Offer ",
        strongText: "25,000 Job",
        lastPart: " Vacancies Right Now!",
      },
      description:
        "The most complete field service software for IT & Mobile Support, Fire Services, Electrical, Maintenance, HVAC & Security Industries",
      button: "Sign Up Free",
      numbers: {
        users: "Users",
        downloads: "Downloads",
        likes: "Likes",
        rating: " 5 Star Rating",
      },
    },
    about: {
      title: {
        firstPart: "What Makes ",
        strongText: "Dear Job",
        lastPart: " Different?",
      },
      subtitle: "Your next level product development company assets",
      cards: {
        titles: {
          searchJob: "SEARCH A JOB",
          functional: "FULLY FUNCTIONAL",
          liveChat: "LIVE CHAT",
        },
      },
    },
    footer: {
      title: {
        strongText: "A COMPLETE FEATURE",
        lastPart: "STACK READY TO HELP YOU",
      },
      button: "Intro Demo Video",
    },
  },

  // items page
  itemsPage: {
    mainTitle: "JOBS",
    itemsButton: "APPLY NOW",
  },

  // Payment form
  paymentForm: {
    payButton: "Pay",
  },
};
