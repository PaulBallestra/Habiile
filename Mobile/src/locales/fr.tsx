export default {
  // alerts ----------------------------------------------------------------
  alerts: {
    // account
    pwdChanged: "Votre mot de passe à bien été modifié.",
    accountEdited: "Les informations de votre compte ont été modifiées",
    accountDeleted: "Votre compte a été supprimé",
    // contact
    contactMessageSent: "Votre message a été envoyé",
    // success
    orderConfirmedTitle: "Succès",
    orderConfirmedMessage: "Votre commande est confirmée !",
  },

  // confirm alerts
  confirmAlerts: {
    // confirm logout
    logout: {
      title: "Déconnecter",
      message: "Voulez-vous vous déconnecter ?",
      acceptBtn: "Oui",
      cancelBtn: "Non",
    },
    // confirm delete account
    deleteAccount: {
      title: "Supprimer le compte",
      message: "Voulez-vous supprimer votre compte ?",
      acceptBtn: "Oui",
      cancelBtn: "Non",
    },
  },

  // errors ----------------------------------------------------------------
  errors: {
    form: {
      // no match
      passwordNoMatch: "Les mots de passe ne sont pas identique",
      // empty
      emptyEmail: "Veuillez saisir l'email",
      emptyPassword: "Veuillez saisir le mot de passe",
      emptyFirstName: "Veuillez saisir le prénom",
      emptyLastName: "Veuillez saisir le nom",
      emptyToken: "Veuillez saisir le token",
      emptyContactMessage: "Veuillez entrer votre message",
      emptyItemTitle: "Veuillez entrer un titre",
      emptyItemDescription: "Veuillez entrer une description",
      emptyItemImage: "Veuillez entrer une image",
      // not valid
      notValidEmail: "Veuillez saisir un email valide",
      notValidPassword: "Le mot de passe doit contenir au moins 6 caractères",
    },
    payment: {
      errorCode: "Code d'erreur :",
    },
  },

  // simple translations ---------------------------------------------------
  // header
  header: {
    titles: {
      home: "ACCUEIL",
      contact: "CONTACT",
    }
  },

  // home screen
  homeScreen: {
    sections: {
      jobs: {
        title: "JOBS",
        box: {
          viewMoreBtn: "VOIR PLUS",
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
      btnText: "POSTULER MAINTENANT",
    },
  },

  // log in screen
  loginScreen: {
    mainTitle: "Content de vous revoir !",
    form: {
      placeholders: {
        email: 'Email',
        password: 'Mot de passe',
      },
      routeToSignup: {
        text: "Vous n'avez pas de compte ?",
        button: 'Inscription',
      },
      routeToLostPassword: "Mot De Passe Oublié",
    },
  },

  // lost password screen
  lostPasswordScreen: {
    mainTitle: "Mot De Passe Oublié",
    form: {
      texts: {
        email: "Email",
      },
      placeholders: {
        email: "Email",
      },
      routeToLogin: "Retour au connexion",
    },
    formSubmittedInfo: "Un token pour réinitialiser votre mot de passe a été envoyé à",
  },

  // reset password screen
  resetPasswordScreen: {
    maintTitle: "Mot de passe oublié",
    form: {
      placeholders: {
        token: "Token",
        email: "Email",
        password: "Mot de passe",
        repeatPassword: "Confirmer le mot de passe",
      },
    },
    passwordChangedInfo: {
      firstPartText: "Votre mot de passe a été changé. vous pouvez vous",
      button: "connecter",
      lastPartText: "maintenant à votre compte",
    },
    bottom: {
      redirectToLogin: "Retour au connexion",
    }
  },

  // sign up screen
  signupScreen: {
    mainTitle: "Bienvenue à Dear Job",
    form: {
      placeholders: {
        lastName: 'Nom',
        firstName: 'Prénom',
        email: 'Adresse email',
        phoneNumber: 'Numéro de téléphone (optionnel)',
        password: 'Mot de passe',
        repeatPassword: 'Confirmer le mot de passe',
      },
      routeToLogin: 'Vous avez déjà un compte ?',
      redirectToLogin: {
        text: "Vous avez un compte ?",
        button: "Connexion"
      },
    },
  },

  // account screen
  accountScreen: {
    header: {
      mainTitle: "PROFIL",
      logoutBtn: "DECONNEXION"
    },
    sections: {
      basicInfos: {
        title: "INFORMATIONS DE BASE",
        editBtn: "Éditer",
        saveBtn: "Sauvegarder",
        form: {
          texts: {
            lastName: "Nom",
            firstName: "Prénom",
            email: "Email",
            phoneNumber: "Numéro de téléphone (optionnel)",
          },
          placeholders: {
            lastName: "Nom",
            firstName: "Prénom",
            email: "Email",
            phoneNumber: "Numéro de téléphone (optionnel)",
          },
        },
      },
      changePassword: {
        title: "CHANGER LE MOT DE PASSE",
        changeBtn: "Changer",
        saveBtn: "Enregistrer",
        form: {
          texts: {
            password: "Mot de passe",
            repeatPassword: "Confirmer le mot de passe",
          },
          placeholders: {
            password: "Mot de passe",
            repeatPassword: "Confirmer le mot de passe",
          },
        },
      },
      deleteAccount: {
        title: "SUPPRIMER LE COMPTE",
        deleteBtn: "Supprimer",
        confirmDeleteBtn: "Confirmer la suppression",
        form: {
          texts: {
            email: "Adresse email",
            password: "Mot de passe",
          },
          placeholders: {
            email: "Adresse email",
            password: "Mot de passe",
          },
        },
      },
    },
  },

  // contact screen
  contactScreen: {
    form: {
      placeholders: {
        lastName: "Nom",
        firstName: "Prénom",
        email: "Email",
        phoneNumber: "Numéro de téléphone (optionnel)",
        message: "Écrivez votre message...",
      },
    },
  },
  
  // about screen
  aboutScreen: {
    mainTitle: "Qui sommes nous ?",
  },

  // legal notices screen
  legalNoticesScreen: {
    mainTitle: "Mentions Légales",
  },

};
