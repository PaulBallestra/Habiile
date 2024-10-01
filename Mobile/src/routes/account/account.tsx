import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {
  View,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useUser} from '../../common/contexts/userContext';
import {IUserInfos} from '../../interfaces/user';
import PATH from '../../constants/cts_routes';
import {useAuthentication} from '../../common/contexts/authenticationContext';
import {
  ACCOUNT_DELETED,
  ACCOUNT_EDITED,
  PWD_CHANGED,
} from '../../constants/cts_alerts';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLOR_BLACK,
  COLOR_GRADIENT_1,
  COLOR_GRADIENT_2,
  COLOR_WHITE,
} from '../../constants/cts_colors';
import AppText from '../../components/AppText';
import BasicInfosComponent from './basicInfosComponent';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import ChangePasswordComponent from './changePasswordComponent';
import DeleteAccountComponent from './deleteAccountComponent';
import {MENU_BAR_HEIGHT} from '../../constants/cts_sizes';

/*

[ AccountScreen ] - the account's information screen.
The parrent of edit infos form, change password form, delete account form

*/

const AccountScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {t} = useTranslation();
  const {onGetCurrentUser} = useUser();
  const {onLogout} = useAuthentication();

  // user basic infos
  const [user, _setUser] = useState<IUserInfos>({
    id: -1,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    image: '',
  });
  const [lastName, _setLastName] = useState<string>('');
  const [firstName, _setFirstName] = useState<string>('');
  const [email, _setEmail] = useState<string>('');
  const [phoneNumber, _setPhoneNumber] = useState<string | undefined | null>(
    '',
  );
  const [profileImage, _setProfileImage] = useState<any>(null);
  const {onEditAccount} = useUser();
  const [isEditingBasicInfos, _setIsEditingBasicInfos] =
    useState<boolean>(false);

  // user change password
  const [isChangingPassword, _setIsChangingPassword] = useState<boolean>(false);
  const [password, _setPassword] = useState<string>('');
  const [repeatPassword, _setRepeatPassword] = useState<string>('');
  const {onChangePassword} = useUser();

  // user delete account
  const [isDeletingAccount, _setIsDeletingAccount] = useState<boolean>(false);
  const [deleteAccountFormEmail, _setDeleteAccountFormEmail] =
    useState<string>('');
  const [deleteAccountFormPassword, _setDeleteAccountFormPassword] =
    useState<string>('');
  const {onDeleteAccount} = useUser();

  // get current user infos
  useEffect(() => {
    onGetCurrentUser()
      .then(returnUser => {
        _setUser(returnUser);
      })
      .catch(error => alert(error));
  }, []);

  // set basic infos
  useEffect(() => {
    if (user) {
      _setLastName(user.lastName);
      _setFirstName(user.firstName);
      _setEmail(user.email);
      _setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  // account basic infos - if edit button is pressed, set the form to edit mode
  const handleEditBasicInfos = () => {
    _setIsEditingBasicInfos(true);
  };

  // account basic infos - submit changes
  const handleSaveBasicInfos = () => {
    onEditAccount({
      userId: user.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      profileImage,
    })
      .then(() => {
        _setIsEditingBasicInfos(false);
        _setProfileImage(null);
        onGetCurrentUser()
          .then(returnUser => {
            _setUser(returnUser);
          })
          .catch(error => alert(error));
        alert(t(ACCOUNT_EDITED, {ns: 'alerts'}));
      })
      .catch(error => alert(error));
  };

  // choose/change profile image
  const handleChooseImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length) {
        _setProfileImage(response.assets[0]);
      }
    });
  };

  // if change password btn is pressed,
  // open change password form
  const openChangePasswordForm = () => {
    _setIsChangingPassword(true);
  };

  // change password submit btn pressed
  const handleChangePassword = () => {
    onChangePassword({
      userId: user.id,
      newPassword: password,
      repeatPassword: repeatPassword,
    })
      .then(() => {
        alert(t(PWD_CHANGED, {ns: 'alerts'}));
        _setIsChangingPassword(false);
        _setPassword('');
        _setRepeatPassword('');
      })
      .catch(err => {
        alert(err);
      });
  };

  // open delete account form
  const openDeleteAccountForm = () => {
    _setIsDeletingAccount(true);
  };

  // delete account
  const handleDeleteAccount = () => {
    // confirm alert
    Alert.alert(
      t('deleteAccount.title', {ns: 'confirmAlerts'}),
      '' + t('deleteAccount.message', {ns: 'confirmAlerts'}),
      [
        {
          text: '' + t('deleteAccount.acceptBtn', {ns: 'confirmAlerts'}),
          onPress: () => {
            onDeleteAccount({
              email: deleteAccountFormEmail,
              password: deleteAccountFormPassword,
            })
              .then(() => {
                alert(t(ACCOUNT_DELETED, {ns: 'alerts'}));
                onLogout();
                navigation.push(PATH.login);
              })
              .catch(error => alert(error));
          },
        },
        {
          text: '' + t('deleteAccount.cancelBtn', {ns: 'confirmAlerts'}),
        },
      ],
    );
  };

  // logout
  const handleLogoutPress = () => {
    // confirm alert
    Alert.alert(
      t('logout.title', {ns: 'confirmAlerts'}),
      '' + t('logout.message', {ns: 'confirmAlerts'}),
      [
        {
          text: '' + t('logout.acceptBtn', {ns: 'confirmAlerts'}),
          onPress: () => {
            onLogout().then(() => {
              // after logout, redirect to home
              navigation.push(PATH.login);
            });
          },
        },
        {
          text: '' + t('logout.cancelBtn', {ns: 'confirmAlerts'}),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.mainScrollView}>
      {/* check if user exists */}
      {user && (
        <View>
          {/* header */}
          <LinearGradient
            colors={[COLOR_GRADIENT_1, COLOR_GRADIENT_2]}
            style={header.container}>
            {/* header title */}
            <AppText style={header.title}>
              {t('header.mainTitle', {ns: 'accountScreen'})}
            </AppText>
            {/* header profile image */}
            {
              // check if user is in edit mode (for basic infos)
              // if it is, give the possibility to change the image
              isEditingBasicInfos ? (
                <TouchableOpacity
                  style={header.changeImageBtn}
                  onPress={handleChooseImage}>
                  <Image
                    style={header.changeImageBtnImg}
                    source={{
                      // check if user inserted an image
                      // if user inserted an image, put the uri of the new image
                      // if not, check if user already has a profile image
                      // if user has a profile image, insert the image uri
                      // if not, set uri as undefined
                      uri: profileImage
                        ? profileImage.uri
                        : user.image
                        ? user.image
                        : undefined,
                    }}
                  />
                  <IconSimpleLineIcons
                    name="camera"
                    color={COLOR_WHITE}
                    size={25}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  style={header.profileImage}
                  source={{
                    uri: user.image ? user.image : undefined,
                  }}
                />
              )
            }
            {/* header user full name */}
            <AppText style={header.userName}>
              {user.firstName + ' ' + user.lastName}
            </AppText>
            {/* header user email */}
            <AppText style={header.userEmail}>{user.email}</AppText>
            {/* logout btn */}
            <TouchableOpacity
              style={header.logoutBtn}
              onPress={handleLogoutPress}>
              <AppText style={header.logoutBtnText}>
                {t('header.logoutBtn', {ns: 'accountScreen'})}
              </AppText>
            </TouchableOpacity>
          </LinearGradient>
          {/* header ends here */}

          {/* sections */}
          <View style={sections.container}>
            {/* section - show / edit basic infos */}
            <BasicInfosComponent
              isEditingBasicInfos={isEditingBasicInfos}
              onSaveBasicInfos={handleSaveBasicInfos}
              onEditBasicInfos={handleEditBasicInfos}
              firstName={firstName}
              lastName={lastName}
              email={email}
              phoneNumber={phoneNumber}
              _setFirstName={_setFirstName}
              _setLastName={_setLastName}
              _setEmail={_setEmail}
              _setPhoneNumber={_setPhoneNumber}
            />

            {/* section - change password */}
            <ChangePasswordComponent
              isChangingPassword={isChangingPassword}
              password={password}
              repeatPassword={repeatPassword}
              _setPassword={_setPassword}
              _setRepeatPassword={_setRepeatPassword}
              openChangePasswordForm={openChangePasswordForm}
              handleChangePassword={handleChangePassword}
            />

            {/* section - delete account */}
            <DeleteAccountComponent
              isDeletingAccount={isDeletingAccount}
              handleDeleteAccount={handleDeleteAccount}
              openDeleteAccountForm={openDeleteAccountForm}
              deleteAccountFormEmail={deleteAccountFormEmail}
              deleteAccountFormPassword={deleteAccountFormPassword}
              _setDeleteAccountFormEmail={_setDeleteAccountFormEmail}
              _setDeleteAccountFormPassword={_setDeleteAccountFormPassword}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default AccountScreen;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
    marginBottom: MENU_BAR_HEIGHT,
  },
});

const header = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 5,
  },
  changeImageBtn: {
    width: 80,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLOR_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  changeImageBtnImg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  userName: {
    color: COLOR_WHITE,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    color: COLOR_WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  logoutBtn: {
    backgroundColor: COLOR_WHITE,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderRadius: 3,
  },
  logoutBtnText: {
    fontSize: 12,
    color: COLOR_BLACK,
  },
});

const sections = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
  },
});
