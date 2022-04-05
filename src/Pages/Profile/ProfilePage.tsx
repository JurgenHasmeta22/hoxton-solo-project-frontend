import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HeaderCommon from "../../Components/Common/HeaderCommon/HeaderCommon"
import FileUpload from "../../Components/FileUpload/FileUpload"
import { useStore } from "../../Zustand/store"
import "./ProfilePage.css"
import ReactLoading from 'react-loading';
import HomeVideo from "../../Components/Home/HomeVideo/HomeVideo"

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

        <main>

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
                        }}>Upload</li>

                        <li className= {tab === "videos" ? "clicked": "videos-tab"} onClick={() => {
                            setTab("videos")
                        }}>Videos Created</li>

                        <li className= {tab === "saved" ? "clicked": "playlists-tab"} onClick={() => {
                            setTab("saved")
                        }}>Saved Videos</li>

                        <li className= {tab === "liked" ? "clicked": "liked-tab"} onClick={() => {
                            setTab("liked")
                        }}>Liked Videos</li>
                        
                        <li className= {tab === "about" ? "clicked": "about-tab"} onClick={() => {
                            setTab("about")
                        }}>About Channel</li>

                    </ul>

                    { 
                    
                        tab === "home" ? (

                            <div className="upload-video">

                                {user.userName === userItem.userName ? (

                                    <>

                                        <h2>Upload a video with thumbnail to get started</h2>
                                        <p>Start sharing your story and connecting with viewers. Videos you upload will show up in videos tab.</p>
                                        {/* <button>Upload Video</button> */}

                                        <FileUpload validateUser = {validateUser} typeOfUpload = {"video"} />
                                        <FileUpload validateUser = {validateUser} typeOfUpload = {"thumbnail"} />

                                    </>

                                ): (
                                    <span>You cant upload if you are not this user</span>
                                )
                                
                            }

                            </div>

                        ): tab === "videos" ? (

                            <>
                            
                                <h3 className="special-video-you">Videos created by you</h3>

                                <div className="container-videos">

                                    {

                                        // @ts-ignore
                                        user?.videos?.map(video => 

                                            <HomeVideo 
                                                key = {video.id}
                                                video = {null}
                                                liked = {"not"}
                                                videoLiked = {null}
                                                videoSaved = {null}
                                                user = {user}
                                                videoMine = {video}
                                            />

                                        )

                                    }

                                </div>

                            </>

                        ): tab === "about" ? (

                            <div className="container-about">
                                <span>{user?.description}</span>
                            </div>

                        ): tab === "saved" ? (

                            <>
                            
                                <h3 className="special-video-you">Videos saved by you</h3>

                                <div className="container-videos">

                                    {

                                        // @ts-ignore
                                        user?.savedVideos?.map(video => 

                                            <HomeVideo 
                                                key = {video.id}
                                                video = {null}
                                                liked = {"not"}
                                                videoLiked = {null}
                                                videoSaved = {video}
                                                user = {user}
                                                videoMine = {null}
                                            />

                                        )

                                    }

                                </div>

                            </>

                        ): tab === "liked" ? (

                            <>
                            
                                <h3 className="special-video-you">Videos liked by you</h3>

                                <div className="container-videos">

                                    {

                                        // @ts-ignore
                                        user?.videosLiked?.map(video => 

                                            <HomeVideo 
                                                key = {video.id}
                                                video = {null}
                                                liked = {"liked"}
                                                videoLiked = {video}
                                                videoSaved = {null}
                                                user = {null}
                                                videoMine = {null}
                                            />

                                        )

                                    }

                                </div>

                            </>

                        ):null

                    }

                </div>

            </section>
        
        </main>

    )
    
}