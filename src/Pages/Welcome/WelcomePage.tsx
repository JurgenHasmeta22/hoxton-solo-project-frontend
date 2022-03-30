import FooterCommon from "../../Components/Common/FooterCommon/FooterCommon"
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon"
import "./WelcomePage.css"

export default function WelcomePage() {

    return (

        <>

            <section className="container-menus-welcome">

                <HeaderCommon />

                <div className="main-welcome">
                    <h2>Ready to unlock the power of video ?</h2>
                </div>

                <div className="about-us-welcome">
                    <p>Our all-in-one video platform turns your ideas into action. Make, manage, and share videos and virtual events that move your audience.
                    One video platform. All your video needs.</p>
                </div>

                <div className="contact-us">
                    <span>Would you like to contact us ?</span>
                    <button>Contact Us</button>
                </div>

                <FooterCommon />

            </section>

        </>

    )
    
}