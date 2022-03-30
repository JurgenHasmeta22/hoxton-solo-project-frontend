import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStore } from "../../Zustand/store"
import "./RegisterPage.css"

export default function RegisterPage({validateUser}:any) {

    const {
        handleBirthdayRegister,
        handleEmailRegister,
        handleFormSubmitRegister,
        handlePasswordChangeRegister,
        handleGenderRegister,
        handleLastNameRegister,
        handleFirstNameRegister,
        handleUserNameRegister,
        handlePhoneNumberRegister,
        user
    } = useStore()

    const navigate = useNavigate()

    useEffect(() => {
        validateUser()
    }, [])
  
    if (user) {
        navigate("/home")
    }
    
    return (

        <>

            <div className="signup-page-wrapper">

                <div className="left-main-wrapper">

                    <img className="special-image-2"
                        id="signup-page-img"
                        src="/assets/images/computer2.jpg"
                        alt=""
                    />

                </div>

                <div className="right-main-wrapper">

                    <form id="signup-form" onSubmit={function (e) {
                        handleFormSubmitRegister(e)
                    }}>
                        
                        <h1>VideoMania</h1>

                        <div id="name-lastname-wrapper">

                            <label id="name" htmlFor="">

                                <input type="text" placeholder="Enter your first name" required onChange={function (e) {
                                    handleFirstNameRegister(e)
                                }}/>

                            </label>

                            <label id="lastname" htmlFor="">

                                <input type="text" placeholder="Enter your last name" required  onChange={function (e) {
                                    handleLastNameRegister(e)
                                }}/>

                            </label>
                            
                        </div>

                        <label id="username" htmlFor="">

                            <input type="text" placeholder="Enter your username" required onChange={function (e) {
                                handleUserNameRegister(e)
                            }}/>

                        </label>

                        <label id="select-gender-wrapper" htmlFor="">

                            <div id="radio-text">
                                Select your gender:
                            </div>

                            <div id="radio-wrapper">

                            <div className="radio-wrapper">

                                <div className="input-wrapper">

                                    <input type="radio" id="male" name="gender" value="male" onChange={function (e) {
                                        handleGenderRegister(e)
                                    }}/>

                                </div>

                                <label htmlFor="male">Male</label>

                            </div>

                            <div className="radio-wrapper">

                                <div className="input-wrapper">

                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        onChange={function (e) {
                                            handleGenderRegister(e)
                                        }}
                                    />

                                </div>

                                <label htmlFor="female">Female</label>

                            </div>

                            <div className="radio-wrapper">

                                <div className="input-wrapper">

                                    <input type="radio" id="other" name="gender" value="other" onChange={function (e) {
                                        handleGenderRegister(e)
                                    }}/>

                                </div>

                                <label htmlFor="other">Other</label>

                            </div>

                        </div>

                        </label>

                        <label id="birthday-wrapper">

                            <label htmlFor="birthday">Birthday:</label>

                            <input type="date" id="birthday" name="birthday" onChange={function (e) {
                                handleBirthdayRegister(e)
                            }}/>

                        </label>

                        <label htmlFor="">

                            <input
                                id="phone-number"
                                type="tel"
                                placeholder="Enter your phone number"
                                required
                                onChange={function (e) {
                                    handlePhoneNumberRegister(e)
                                }}
                            />

                        </label>

                        <label htmlFor="">

                            <input type="text" id="email" placeholder="Enter your email" onChange={function (e) {
                                handleEmailRegister(e)
                            }}/>

                        </label>

                        <label htmlFor="">

                            <input
                                type="password"
                                name=""
                                id="password"
                                placeholder="Enter your password"
                                required
                                onChange={function (e) {
                                    handlePasswordChangeRegister(e)
                                }}
                            />

                        </label>

                        <label htmlFor="">
                            <button>Sign Up</button>
                        </label>

                        <label id="login-link-wrapper" htmlFor="">

                            You have an account?

                            <Link id="link" to={"../login"}>
                                Log In
                            </Link>
                            
                        </label>

                    </form>

                </div>

            </div>

        </>

    )
    
}