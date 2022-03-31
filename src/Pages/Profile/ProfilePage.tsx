import { useState } from "react"
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon"
import "./ProfilePage.css"

export default function ProfilePage() {

    const [tab, setTab] = useState<any>("home")

    return (

        <>

            <HeaderCommon />

            <section className="container-profile-menus">

                <div className="container-profile-nav">

                    <div className="profile-info">

                        <img src="/assets/images/logos/human.jpg" />
                        <span className="subscribe-span">0 Subscribers</span>
                        <span className="userName-span">Avenger22</span>

                    </div>

                </div>

                <div className="container-tabs">

                    <ul className="list-tabs">

                        <li className= {tab === "home" ? "clicked": "home-tab"} onClick={() => {
                            setTab("home")

                        }}>Home</li>

                        <li className= {tab === "videos" ? "clicked": "videos-tab"} onClick={() => {
                            setTab("videos")
                        }}>Videos</li>

                        <li className= {tab === "playlists" ? "clicked": "playlists-tab"} onClick={() => {
                            setTab("playlists")
                        }}>Playlists</li>

                        <li className= {tab === "about" ? "clicked": "about-tab"} onClick={() => {
                            setTab("about")
                        }}>About</li>

                    </ul>

                    { 
                    
                        tab === "home" ? (

                            <div className="upload-video">
                                <h2>Upload a video to get started</h2>
                                <p>Start sharing your story and connecting with viewers. Videos you upload will show up here.</p>
                                <button>Upload Video</button>
                            </div>

                        ): tab === "videos" ? (

                            <div className="container-videos">

                                <div className="main-post">
                                    <img className="image-post" src="assets/images/main/foto-1webp.webp" alt="" />
                                    <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                    <h2 className="video-title">If Apple made window blind</h2>
                                    <span className="video-user">seatbeans22</span>
                                    <span className="video-views">153K views - 3 weeks ago </span>
                                </div>

                            </div>

                        ): tab === "about" ? (

                            <div className="container-about">

                                <span>I am jurgen</span>

                            </div>

                        ): tab === "playlists" ? (

                            <div className="container-playlists">

                                <div className="main-post">
                                    <img className="image-post" src="assets/images/main/foto-1webp.webp" alt="" />
                                    <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                    <h2 className="video-title">If Apple made window blind</h2>
                                    <span className="video-user">seatbeans22</span>
                                    <span className="video-views">153K views - 3 weeks ago </span>
                                </div>

                            </div>

                        ):null

                    }

                </div>

                

            </section>
        
        </>

    )
    
}