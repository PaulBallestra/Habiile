export default {
  // alerts ----------------------------------------------------------------
  alerts: {
    // account
    pwdChanged: "Votre mot de passe à bien été modifié.",
    accountEdited: "Les informations de votre compte ont été modifiées",
    accountDeleted: "Votre compte a été supprimé",
    // forms
    emptyInput: "Les champs ne peuvent pas être vides",
  },

  // confirm alerts
  confirmAlerts: {
    confirmDeleteAccount: "Voulez-vous supprimer votre compte ?",
    confirmLogout: "Voulez-vous vous déconnecter ?",
  },

  // errors ----------------------------------------------------------------
  errors: {
    form: {
      // no match
      passwordNoMatch: "Les mots de passe ne sont pas identiques",
      // empty
      emptyPassword: "Veuillez entrer un mot de passe",
      emptyFirstName: "Veuillez entrer le prénom",
      emptyLastName: "Veuillez entrer le nom",
      emptyFirstNameAndLastName: "Veuillez saisir le nom et le prénom",
      emptyToken: "Veuillez entrer le token",
      emptyContactMessage: "Veuillez entrer le message",
      emptyItemTitle: "Veuillez entrer le titre",
      emptyItemDescription: "Veuillez entrer la description",
      emptyItemImage: "Veuillez entrer une image",
      emptyItemPrice: "Veuillez entrer le prix",
      emptyItemStatus: "Veuillez entrer le statut",
      // not valid
      notValidEmail: "Veuillez entrer un email valide (exemple@email.com)",
      notValidPassword: "Veuillez entrer un mot de passe valide (plus de 6 caractères)",
      notValidPhoneNumber: "Veuillez entrer un numéro de téléphone valide (ex: 0612345678)",
    },
  },

  // complex translations --------------------------------------------------
  translation: {

    // reset password page
    resetPasswordPage: {
      form: {
        infos: {
          passwordChanged: `Votre mot de passe à bien été modifié. Vous pouvez à présent vous <a href={{loginPath}}>connecter</a> à votre compte.`,
        }
      }
    },
    
  },

  // simple translations ---------------------------------------------------
  // header
  header: {
    elements: {
      home: "Accueil",
      contact: "Contact",
      about: "À propos de nous",
      legals: "Mentions légales",
    },
    itemsLink: "Jobs",
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
    mainTitle: "CONNEXION",
    form: {
      labels: {
        email: "Adresse email",
        password: "Mots de passe",
      },
      placeholders: {
        email: "Adresse email",
        password: "Mots de passe",
      },
      links: {
        lostPassword: "Mot de passe oublié ? cliquez ici",
        routeToLogin: "Vous n'avez pas de compte ? Inscrivez-vous ici",
      }
    }
  },

  // signup page
  signupPage: {
    mainTitle: "INSCRIPTION",
    form: {
      labels: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone (optionnel)",
        password: "Mots de passe",
        repeatPassword: "Confirmer mots de passe"
      },
      placeholders: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone (optionnel)",
        password: "Mots de passe",
        repeatPassword: "Confirmer mots de passe"
      },
      links: {
        navigateToLogIn: "Déjà enregistré ? Connectez-vous ici",
      },
    }
  },

  // reset password page
  resetPasswordPage: {
    mainTitle: "Modification du mot de passe",
    form: {
      labels: {
        token: "Token",
        email: "Adresse email",
        password: "Mots de passe",
        repeatPassword: "Confirmer mots de passe",
      },
      placeholders: {
        token: "Token",
        email: "Adresse email",
        password: "Mots de passe",
        repeatPassword: "Confirmer mots de passe",
      },
    },
    passwordChangedInfo: {
      firstPartText: "Votre mot de passe a été changé. vous pouvez vous ",
      link: "connecter",
      lastPartText: " maintenant à votre compte",
    },
  },

  // lost password page
  lostPasswordPage: {
    mainTitle: "Mot de passe oublié ?",
    redirectToLogInLink: "Retour à la page connexion",
    form: {
      labels: {
        email: "Adresse email",
      },
      placeholders: {
        email: "Adresse email",
      },
      infos: {
        linkSent: "Un lien pour réinitialiser votre mot de passe a été envoyé par e-mail à"
      }
    }
  },

  // account page
  accountPage: {
    mainTitle: " VOTRE COMPTE",
    accountImage: "profil",
    logoutBtn: "Deconnexion",
    accountOptions: {
      edit: "Éditer",
      changePassword: "Changer le mot de passe",
      deleteAccount: "Supprimer le compte",
    },
    editAccountForm: {
      form: {
        labels: {
          lastName: "Nom",
          firstName: "Prénom",
          email: "Adresse email",
          phoneNumber: "Numéro de téléphone (optionnel)",
          profileImage: "Photo de profil",
        },
        placeholders: {
          lastName: "Nom",
          firstName: "Prénom",
          email: "Adresse email",
          phoneNumber: "Numéro de téléphone (optionnel)",
        },
      },
    },
    changePasswordForm: {
      form: {
        labels: {
          password: "Nouveau mot de passe",
          repeatPassword: "Confirmer le nouveau mot de passe",
        },
        placeholders: {
          password: "Nouveau mot de passe",
          repeatPassword: "Confirmer le nouveau mot de passe",
        },
      },
    },
    deleteAccountForm: {
      labels: {
        email: "Adresse email",
        password: "Mot de passe",
      },
      placeholders: {
        email: "Adresse email",
        password: "Mot de passe",
      },
    },
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
    mainTitle: "CONTACT",
    form: {
      labels: {
        lastName: "Nom",
        firstName: "Prénom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone (optionnel)",
        message: "Votre message",
      },
      placeholders: {
        lastName: "Nom",
        firstName: "Prénom",
        email: "Adresse email",
        phoneNumber: "Numéro de téléphone (optionnel)",
        message: "Écrivez votre message...",
      },
      infos: {
        messageSent: "Votre message a été envoyé",
      },
    }
  },

  // home page
  homePage: {
    presentation: {
      title: {
        firstPart: "Nous offrons ",
        strongText: "25 000 emplois",
        lastPart: " vacants dès maintenant !",
      },
      description: "Le logiciel de service sur le terrain le plus complet pour les secteurs de l'assistance informatique et mobile, des services d'incendie, de l'électricité, de la maintenance, du CVC et de la sécurité",
      button: "Inscription gratuite",
      numbers: {
        users: "Utilisateurs",
        downloads: "Téléchargements",
        likes: "Aimes",
        rating: "Classement 5 étoiles",
      },
    },
    about: {
      title: {
        firstPart: "Ce qui rend ",
        strongText: "Dear Job",
        lastPart: " Différent",
      },
      subtitle: "Les atouts de votre société de développement",
      cards: {
        titles: {
          searchJob: "RECHERCHER UN EMPLOI",
          functional: "COMPLÈTEMENT FONCTIONNEL",
          liveChat: "CHAT EN DIRECT",
        },
      },
    },
    footer: {
      title: {
        strongText: "UNE FONCTION COMPLÈTE",
        lastPart: "PRÊT À VOUS AIDER",
      },
      button: "Vidéo de démonstration",
    },
  },

  // items page
  itemsPage: {
    mainTitle: "JOBS",
    itemsButton: "POSTULER MAINTENANT",
  },

  // Payment form
  paymentForm: {
    payButton: "Payer"
  }
}