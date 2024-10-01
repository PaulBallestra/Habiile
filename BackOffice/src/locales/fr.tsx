export default {
  // complex translations --------------------------------------------------
  translation: {
    // login page
    loginPage: {
      form: {
        links: {
          navigateToSignUp: "Vous n'avez pas de compte ?<br/> Inscrivez-vous ici"
        }
      }
    },

    // signup page
    signupPage: {
      form: {
        links: {
          navigateToLogIn: "Êtes-vous déjà inscrit?<br/> Connectez-vous ici"
        }
      }
    },

    // reset password page
    resetPasswordPage: {
      form: {
        infos: {
          passwordChanged: `Votre mot de passe à bien été modifié. Vous pouvez à présent vous <Link to={{loginPath}}>connecter</Link> à votre compte.`,
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
      home: "Accueil",
      users: "Utilisateurs",
      messages: "Messages",
      articles: "Articles",
      about: "À propos",
    },
    language: "Langue",
    loginLink: "Connexion",
    accountLink: "Compte",
  },

  // footer
  footer: {
    elements: {
      aboutUs: "Qui sommes nous ?",
      legals: "Mentions légales",
    },
  },

  // login page
  loginPage: {
    mainTitle: "Content de  vous revoir",
    description : "Connectez vous à votre compte",
    form: {
      labels: {
        email: "Email",
        password: "Mot de passe",
      },
      placeholders: {
        email: "Entrer email",
        password: "Mot de passe",
      },
      submitBtn: "Se connecter",
      links: {
        lostPassword: "Mot de passe oublié ?",
        noAccount: "Pas de compte ?",
        signUp: "Inscrivez-vous"
      }
    }
  },

  // signup page
  signupPage: {
    mainTitle: "Inscription",
    form: {
      labels: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone",
        password: "Mot de passe",
        repeatPassword: "Confirmer mot de passe"
      },
      placeholders: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone",
        password: "Mot de passe",
        repeatPassword: "Confirmer mot de passe"
      },
      submitBtn: "Inscription",
    }
  },

  // reset password page
  resetPasswordPage: {
    mainTitle: "Modification du mot de passe",
    form: {
      labels: {
        email: "Adresse email:",
        password: "Mot de passe:",
        repeatPassword: "Confirmer mot de passe:",
      },
      placeholders: {
        email: "Adresse email",
        password: "Mot de passe",
        repeatPassword: "Confirmer mot de passe",
      },
      submitBtn: "Modifier"
    }
  },

  // lost password page
  lostPasswordPage: {
    mainTitle: "Mot de passe oublié ?",
    back: "Retour",
    form: {
      labels: {
        email: "Adresse email:",
      },
      placeholders: {
        email: "Adresse email",
      },
      submitBtn: "Envoyer le lien",
      infos: {
        linkSent: "Un lien pour réinitialiser votre mot de passe a été envoyé par e-mail à"
      }
    }
  },

  // account list
  accountList: {
    mainTitle : "Groupes",
    remove : "Supprimer",
    addAccount: "Ajouter",
    empty: "Vide",
    options: {
      edit: 'Editer',
      remove: "Supprimer",
    },
    filter: {
      all: "Tout",
      clients: "Clients",
      admin: "Administrateur",
    },
    removeConfirmation: 
    {
      text: "Êtes vous sûre de vouloir supprimer le(s) compte(s) ?",
      yes: "oui",
      no: "non",
    },
  },

  // messages
  messages : {
    mainTitle: "Groupes",
    remove : "Supprimer",
    empty: "Vide",
    options: {
      edit: 'Editer',
      remove: "Supprimer",
    },
    status: {
      msgToProcess : "Non traité",
      msgProcessed: "Traité",
    },
    filter: {
      all: "Tout",
      msgToProcess : "Non traités",
      msgProcessed: "Traités",
    },
    removeConfirmation: 
    {
      text: "Êtes vous sûre de vouloir supprimer le(s) message(s) ?",
      yes: "oui",
      no: "non",
    },
  },

  // items 
  items : {
    mainTitle: "Groups",
    remove : "Supprimer",
    addItems: "Ajouter",
    empty: "Vide",
    options: {
      edit: 'Editer',
      remove: "Supprimer",
    },
    filter: {
      all: "Tout",
      published : "Publié",
      notPublished: "Non publié",
    },
  },

  // EditCreateAccount
  editCreateAccount: {
    save: "Sauvegarder",
    back: "Annuler",
  },

  // account page
  accountPage: {
    mainTitle: "Profile",
    accountImage: "profile",
    logout: "Déconnexion",
    deleteAccountForm: {
      labels: {
        email: "Adresse email:",
        password: "Mot de passe:",
      },
      placeholders: {
        email: "Adresse email",
        password: "Mot de passe",
      },
      submitBtn: "Supprimer le compte",
      closeBtn: "Annuler",
    },
    accountOptions: {
      edit: "Éditer",
      changePassword: "Changer le mot de passe",
      deleteAccount: "Supprimer le compte",
    },
    accountInfos: {
      lastName: "Nom",
      firstName: "Prénom",
      email: "Adresse email",
      phoneNumber: "Numéro de téléphone",
    },
  },

  // edit account page
  editAccountPage: {
    back: "Retour",
    submitBtn: "Sauvegarder",
    form: {
      labels: {
        lastName: "Nom:",
        firstName: "Prénom:",
        email: "Adresse email:",
        phoneNumber: "Numéro de téléphone:",
        profileImage: "Photo de profil:",
      },
      placeholders: {
        lastName: "Nom",
        firstName: "Prénom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone",
      },
    },
  },

  // change password page
  changePasswordPage: {
    mainTitle:  "Modification du mot de passe",
    redirectToAccountLink: "Retour au compte",
    form: {
      labels: {
        password: "Mot de passe:",
        repeatPassword: "Confirmer le mot de passe:",
      },
      placeholders: {
        password: "Mot de passe",
        repeatPassword: "Confirmer le mot de passe",
      },
      submitBtn: "Modifier",
    }
  },

  // legal notices page
  legalNoticesPage: {
    mainTitle: "Mentions Légales",
  },

  // about page
  aboutPage: {
    mainTitle: "Qui sommes nous ?",
  },

  // contact page
  contactPage: {
    mainTitle: "Contact",
    form: {
      labels: {
        lastName: "Nom",
        firstName: "Prénom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone",
        message: "Votre message",
      },
      placeholders: {
        lastName: "Nom",
        firstName: "Prénom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone",
        message: "Écrivez votre message...",
      },
      infos: {
        messageSent: "Votre message a été envoyé",
      },
      submitBtn: "Contacter",
    }
  },

  // home page
  dashboard: {
    mainTitle: "Dashboard",
  },

  // Edit user account
  editUser: {
    inputs : {
      lastName: "Nom",
      firstName: "Prénom",
      email: "Adresse email",
      password: "Mot de passe",
      roleName: "Rôle",
      phoneNumber: "Numéro de téléphone",
    }
  },
}