import React from "react"
import { User, Video, Category } from "./typesStore"

export default interface AppStoreState {

    users: User[],
    videos: Video[],
    searchTerm: string,
    user: User | null,
    userItem: User | null,
    categories: Category[],
    videoItem: null | Video,
    setVideoItem: (data: any) => void,
    setCategories: (arrayFromServer: Category[]) => void,
    setVideos: (arrayFromServer: Video[]) => void,
    setUser: (data: any) => void,
    setUserItem: (data:any) => void,

    emailLogin: string,
    passwordLogin: string,

    handleEmailChangeLogin: (e: any) => void,
    handlePasswordChangeLogin: (e: any) => void,
    handleFormSubmitLogin: (e: any) => void,

    firstNameRegister: string,
    lastNameRegister: string,
    userNameRegister: string,
    genderRegister: string,
    birthdayRegister: string,
    phoneNumberRegister: string,
    emailRegister: string,
    passwordRegister: string,

    handleFormSubmitRegister: (e: any) => void,
    handleFirstNameRegister: (e: any) => void,
    handleLastNameRegister: (e: any) => void,
    handleUserNameRegister: (e: any) => void,
    handleGenderRegister: (e: any) => void,
    handleBirthdayRegister: (e: any) => void,
    handlePhoneNumberRegister: (e: any) => void,
    handleEmailRegister: (e: any) => void,
    handlePasswordChangeRegister: (e: any) => void,

    nameContactUs: string,
    emailContactUs: string,
    phoneContactUs: string,
    subjectContactUs: string,
    textAreaContactUs: string,
    formContactUs: null | Object,
    handleContactSubmit: (e: any) => void,
    handleTextAreaChange: (e: any) => void,
    handlePhoneChange: (e: any) => void,
    handleEmailChange: (e: any) => void,
    handleSubjectChange: (e: any) => void,
    handleNameChange: (e: any) => void,

}