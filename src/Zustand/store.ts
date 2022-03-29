import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
import AppStoreState from './types/interfaceStore'

export const useStore = create<AppStoreState>((set, get):AppStoreState => ({

    // #region 'GeneralState'
    users: [],
    videos: [],
    searchTerm: "",
    user: null,
    userItem: null,
    
    setVideos: (arrayFromServer) => {
        set({videos: arrayFromServer})
    },
    setUser: (data) => {
        set({user: data})
    },
    setUserItem: (data) => {
        set({userItem: data})
    },
    // #endregion

    // #region 'Login State'
    emailLogin: "",
    passwordLogin: "",

    handleEmailChangeLogin: (e) => {
        set({emailLogin: e.target.value})
    },

    handlePasswordChangeLogin: (e) => {
        set({passwordLogin: e.target.value})
    },

    handleFormSubmitLogin: (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const formData = {
            email: email,
            password: password,
        };

        fetch("http://localhost:4000/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((data) => {

            if (data.error) {
                alert(data.error);
            } 
            
            else {
                // we managed to sign in!
                localStorage.setItem("token", data.token);
                set({user: data.user});
                // navigate("/home");
            }

        });
      
    },
    // #endregion

    // #region 'Register State'
    firstNameRegister: "",
    lastNameRegister: "",
    userNameRegister: "",
    genderRegister: "",
    birthdayRegister: "",
    phoneNumberRegister: "",
    emailRegister: "",
    passwordRegister: "",

    handleFormSubmitRegister: (e: any) => {

        e.preventDefault()

        const { 
            users, firstNameRegister, lastNameRegister, userNameRegister, phoneNumberRegister,
            genderRegister, birthdayRegister, emailRegister, passwordRegister
        } = get()

        const formData = {
            firstName: firstNameRegister,
            lastName: lastNameRegister,
            userName: userNameRegister,
            phoneNumber: phoneNumberRegister,
            gender: genderRegister,
            birthday: birthdayRegister,
            email: emailRegister,
            password: passwordRegister
        }

        fetch('http://localhost:4000/users', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(data => {

                if (data.error) {
                    alert('Oops, something went wrong.')
                } 
                
                else {
                    // we managed to create our user!
                    localStorage.setItem('token', data.token)
                    set({user: data.user})
                }

            })

    },

    handleFirstNameRegister: (e: any) => {
        set({firstNameRegister: e.target.value})
    },

    handleLastNameRegister: (e: any) => {
        set({lastNameRegister: e.target.value})
    },

    handleUserNameRegister: (e: any) => {
        set({userNameRegister: e.target.value})
    },

    handleGenderRegister: (e: any) => {
        set({genderRegister: e.target.value})
    },

    handleBirthdayRegister: (e: any) => {
        set({birthdayRegister: e.target.value})
    },

    handlePhoneNumberRegister: (e: any) => {
        set({phoneNumberRegister: e.target.value})
    },

    handleEmailRegister: (e: any) => {
        set({emailRegister: e.target.value})
    },

    handlePasswordChangeRegister: (e: any) => {
        set({passwordRegister: e.target.value})
    },
    //#endregion

}))