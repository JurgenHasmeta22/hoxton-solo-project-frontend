import { Link } from "react-router-dom"
import "./LoginPage.css"

export default function LoginPage() {

    return (

        <>

            <div className="login-page-wrapper">

                <div className="left-main-wrapper">
                    <img
                    id="login-page-img"
                    src="https://images.pexels.com/photos/4050401/pexels-photo-4050401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    />
                </div>

                <div className="right-main-wrapper">

                    <form
                        id="login-form"
                        onSubmit={function (e) {
                            // handleFormSubmitSignIn(e);
                        }}
                    >

                        <h1>SocialLounge</h1>

                        <label htmlFor="">

                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                required
                                onChange={function (e) {
                                // handleEmailChangeSignIn(e);
                                }}
                            />

                        </label>

                        <label htmlFor="">

                            <input
                                type="text"
                                name="password"
                                placeholder="Enter your password"
                                required
                                onChange={function (e) {
                                    // handlePasswordChangeSignIn(e);
                                }}
                            />

                        </label>

                        <label htmlFor="">
                            <button>Log In</button>
                        </label>

                        <label id="signup-link-wrapper" htmlFor="">

                            Don't have an account?{" "}

                            <Link id="link" to={"../register"}>

                                Sign Up

                            </Link>

                        </label>

                    </form>

                </div>

            </div>

        </>

    )
    
}