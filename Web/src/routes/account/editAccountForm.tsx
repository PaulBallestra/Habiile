import React, { Dispatch } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Form from "../../components/Form";
import { FiEdit2 } from "react-icons/fi";
import { FORM_STYLE_INPUT_WITH_ICON } from "../../constants/cts_form";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";

const EditAccountForm = ({lastName, firstName, email, phoneNumber, _setLastName, _setFirstName, _setEmail, _setPhoneNumber, onHandleSubmit}:
    {
      lastName: string,
      firstName: string,
      email: string,
      phoneNumber: string | null | undefined,
      _setLastName: Dispatch<React.SetStateAction<string>>,
      _setFirstName: Dispatch<React.SetStateAction<string>>,
      _setEmail: Dispatch<React.SetStateAction<string>>,
      _setPhoneNumber: Dispatch<React.SetStateAction<string | null | undefined>>,
      onHandleSubmit: SubmitHandler<FieldValues>,
    }
  ) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();

  // send data to parrent
  const sendData = (data: any) => {
    onHandleSubmit(data);
  }
  
  return (
    <Wrapper>
      <Form
        onHandleSubmit={handleSubmit(sendData)}
        submitBtn={<FiEdit2 />}
      >
        {/* last name */}
        <label htmlFor='editAccountFormLastName'>{t("editAccountForm.form.labels.lastName", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input 
              id='editAccountFormLastName' 
              placeholder={"" + t("editAccountForm.form.placeholders.lastName", {ns: "accountPage"})}
              value={lastName ? lastName : ""}
              onChange={(e) => _setLastName(e.target.value)}
              required 
            />
            <BiUser />
          </div>
        {/* first name */}
        <label htmlFor='editAccountFormFirstName'>{t("editAccountForm.form.labels.firstName", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input 
              id='editAccountFormFirstName' 
              placeholder={"" + t("editAccountForm.form.placeholders.firstName", {ns: "accountPage"})}
              value={firstName ? firstName : ""}
              onChange={(e) => _setFirstName(e.target.value)}
              required 
            />
            <BiUser />
          </div>
        {/* email */}
        <label htmlFor='editAccountFormEmail'>{t("editAccountForm.form.labels.email", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input
              type="email"
              id='editAccountFormEmail' 
              placeholder={"" + t("editAccountForm.form.placeholders.email", {ns: "accountPage"})}
              value={email ? email : ""}
              onChange={(e) => _setEmail(e.target.value)}
              required 
            />
            <BiEnvelope />
          </div>
        {/* phone number */}
        <label htmlFor='editAccountFormPhoneNumber'>{t("editAccountForm.form.labels.phoneNumber", {ns: "accountPage"})}</label>
          <div className={FORM_STYLE_INPUT_WITH_ICON}>
            <input
              type="tel"
              id='editAccountFormPhoneNumber' 
              placeholder={"" + t("editAccountForm.form.placeholders.phoneNumber", {ns: "accountPage"})}
              value={phoneNumber ? phoneNumber : ""}
              onChange={(e) => _setPhoneNumber(e.target.value)}
              maxLength={12}
            />
            <BsPhone />
          </div>
        {/* profile image */}
        <ImageLabel htmlFor='editAccountFormProfileImage'>{t("editAccountForm.form.labels.profileImage", {ns: "accountPage"})}</ImageLabel>
          <input
            type="file"
            accept="image/*"
            id='editAccountFormProfileImage' 
            {...register("profileImage")}
          />
      </Form>
    </Wrapper>
  )
}

export default EditAccountForm;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`

`

const ImageLabel = styled.label`
  margin-bottom: 10px;
`
