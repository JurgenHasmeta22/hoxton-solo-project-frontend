import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon"
import FileUpload from "../../Components/FileUpload/FileUpload"
import { useStore } from "../../Zustand/store"
import "./ProfilePage.css"
import ReactLoading from 'react-loading';

export default function ProfilePage({validateUser}:any) {

    const [tab, setTab] = useState<any>("home")
    const { user, userItem, setUserItem, users } = useStore()

    useEffect(() => {
        validateUser();
    }, []);

    const params = useParams()

    // function getUsersFromServer () {

    //     fetch(`http://localhost:4000/users`)
    //     .then(resp => resp.json())
    //     .then(usersFromServer => setUsers(usersFromServer))
        
    // }

    // useEffect(getUsersFromServer, [])

    function getIndividualUserFromServer () {

        fetch(`http://localhost:4000/users/${params.id}`)
            .then(resp => resp.json())
            .then(userFromServer => setUserItem(userFromServer))
        
    }
    
    useEffect(getIndividualUserFromServer, [])

    // function getFollowersFromServer () {

    //     fetch(`http://localhost:4000/subscribers`)
    //     .then(resp => resp.json())
    //     .then(followersFromServer => setFollowers(followersFromServer))
        
    // }

    // useEffect(getFollowersFromServer, [])

    if (userItem === null) {

        return (
            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>
        )    
    
    }

    if (userItem.userName === undefined) {
        return <main>User not found not found</main>
    }

    if(user === null) {

        return (
            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>
        )
        
    }

    const userCheck = user.userName === userItem.userName

    return (

        <>

            <HeaderCommon />

            <section className="container-profile-menus">

                <div className="container-profile-nav">

                    <div className="profile-info">

                        <img src={`http://localhost:4000/avatar/${userItem.userName}`} />
                        <span className="subscribe-span">{userItem.countSubscribers} Subscribers</span>
                        <span className="userName-span">{userItem.userName}</span>

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

                                {user.userName === userItem.userName ? (

                                    <>

                                        <h2>Upload a video to get started</h2>
                                        <p>Start sharing your story and connecting with viewers. Videos you upload will show up here.</p>
                                        {/* <button>Upload Video</button> */}

                                        <FileUpload validateUser = {validateUser} />
                                    
                                    </>

                                ): (
                                    <span>You cant upload if you are not this user</span>
                                )
                                
                            }

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