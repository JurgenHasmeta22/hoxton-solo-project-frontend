import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../../Zustand/store"
import "./HomeVideo.css"

// type Props = {
//     video: any,
//     liked: string
// }

export default function HomeVideo({video, liked, videoLiked, videoSaved, user, videoMine }:any) {

    const navigate = useNavigate()

    const [videosSaved, setVideosSaved] = useState<any>([])

    const {setUser} = useStore()

    async function getVideosSavedFromServer ():Promise<void> {

        await fetch(`http://localhost:4000/videosSaved`)
          .then(resp => resp.json())
          .then(videosSavedFromServer => setVideosSaved(videosSavedFromServer))
        
    }
    
    //@ts-ignore
    useEffect(getVideosSavedFromServer, [])
   
    function handleRedirectToUser(userId:any) {
        navigate(`/users/${userId}`)
    }

    function redirectVideoMine(videoId: any) {
        navigate(`/videos/${videoId}`)
    }

    function redirectVideoSaved(videoId: any) {
        navigate(`/videos/${videoId}`)
    }

    function redirectVideoLiked(videoId: any) {
        navigate(`/videos/${videoId}`)
    }

    const { setVideos } = useStore()
    
    function increaseView() {
    
        fetch(`http://localhost:4000/videosViews/${video ? video.id : videoLiked ? videoLiked.id : videoMine ? videoMine.id : videoSaved ? videoSaved.id : null}`, {
    
            method: "PATCH",
    
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({ views: video ? video.views + 1 : videoLiked ? videoLiked?.video?.views + 1 : videoSaved ? videoSaved?.video?.views + 1 : videoMine ? videoMine?.video?.views + 1: null }),
        })
            .then((resp) => resp.json())
            .then((data) => {
    
            if (data.error) {
                alert(data.error);
            } 
            
            else {
                setVideos(data);
            }
    
        });
                
    }

    async function removeVideoSaved(videoId:any, userId:any) {

        //@ts-ignore
        const videosSavedArray = videosSaved?.find(videoSaved => videoSaved?.userId === userId && videoSaved?.videoId === videoId)
        console.log(videosSavedArray)

        if (videosSavedArray) {

            try {

                await fetch(`http://localhost:4000/videosSaved/${videosSavedArray.id}`, {

                    method: 'DELETE',

                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.token
                    }

                })
                    .then(resp => resp.json())
                    .then(data => {
                
                    if (data.error) {
                        alert(data.error)
                    } 
                    
                    else {
                        setUser(data)
                        // window.location.reload()
                    }

                })

            }

            catch(error) {
                console.log(error)
            }

        }

    }

    async function removeVideo(videoId:any, videoTitle: any) {
    
        try {
    
            await fetch(`http://localhost:4000/removeMedia/${videoTitle}`, {
        
                method: "POST",
        
                headers: {
                    "Content-Type": "application/json",
                }

            })
            .then((resp) => resp.json())
            .then((data) => {
    
                if (data.error) {
                    alert(data.error);
                } 

            })

            await fetch(`http://localhost:4000/videos/${videoId}`, {
        
                method: "DELETE",
        
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.token
                }

            })
            .then((resp) => resp.json())
            .then((data) => {
    
                if (data.error) {
                    alert(data.error);
                } 
                
                else {
                    setVideos(data);
                    navigate("../home")
                }
    
            });
    
        }
    
        catch (err:any) {
          console.log({"its error": err})
        }
        
    }

    return (

        <>

            { liked === "not" && videoLiked === null && videoSaved === null && videoMine === null && video ? (

                <>  

                    <div className="main-post" onClick={function () {
                        increaseView()
                        navigate(`/videos/${video?.id}`)               
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${video?.title}`} alt="" />
                        <img className="icon-post" src={`http://localhost:4000/avatar/${video?.userWhoCreatedIt?.userName}`} alt="" />
                        
                        <h2 className="video-title">{video?.title}</h2>
                        
                        <span className="video-user" onClick={function () {
                            handleRedirectToUser(video?.userWhoCreatedIt?.id)
                        }}>{video?.userWhoCreatedIt?.userName}</span>
                        
                        <span className="video-views">{video?.views} views - {video?.createdAt} </span>
                    
                    </div>
                
                </>

            ): liked === "liked" && videoLiked && videoSaved === null && videoMine === null && video === null ? (

                <>  

                    <div className="main-post" onClick={function () {
                        // increaseView()
                        redirectVideoLiked(videoLiked?.videoId)
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${videoLiked?.video?.title}`} alt="" />                        
                        <h2 className="video-title">{videoLiked?.video?.title}</h2>
                        <span className="video-views">{videoLiked?.video?.views} views - {videoLiked?.video?.createdAt} </span>

                    </div>
                
                </>

            ): liked === "not" && videoLiked === null && videoSaved && videoMine === null && video === null ? (
                
                <>  

                    <div className="main-post" onClick={function () {
                        // increaseView()
                        redirectVideoSaved(videoSaved?.video?.id)
                    }}>

                        {console.log(videoSaved)}

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${videoSaved?.video?.title}`} alt="" />
                        <img className="icon-post" src={`http://localhost:4000/avatar/${videoSaved?.video?.userWhoCreatedIt?.userName}`} alt="" />
                        
                        <h2 className="video-title">{videoSaved?.video?.title}</h2>
                        
                        <span className="video-user" onClick={function () {
                            handleRedirectToUser(videoSaved?.video?.userWhoCreatedIt?.id)
                        }}>{videoSaved?.video?.userWhoCreatedIt?.userName}</span>
                        
                        <span className="video-views">{videoSaved?.video?.views} views - {videoSaved?.video?.createdAt} </span>
                        
                        <button className="remove-video-saved" onClick={function (e) {
                            e.stopPropagation()
                            removeVideoSaved(videoSaved?.videoId, videoSaved?.userId)
                        }}>X</button>

                    </div>
                
                </>

            ): liked === "not" && videoLiked === null && videoSaved === null && videoMine && video === null ? (
                
                <>  

                    <div className="main-post" onClick={function () {
                        // increaseView()
                        redirectVideoMine(videoMine?.id)               
                    }}>

                        <img className="image-post" src={`http://localhost:4000/thumbnail/${videoMine?.title}`} alt="" />
                        <img className="icon-post" src={`http://localhost:4000/avatar/${user?.userName}`} alt="" />
                        
                        <h2 className="video-title">{videoMine?.title}</h2>
                        
                        <span className="video-user" onClick={function () {
                            handleRedirectToUser(user?.id)
                        }}>{user?.userName} </span>
                        
                        <span className="video-views">{videoMine?.views} views - {videoMine?.createdAt}</span>
                        
                        <button className="remove-my-video" onClick={function (e) {
                            e.stopPropagation()
                            removeVideo(videoMine?.id, videoMine?.title)
                        }}>X</button>
                    
                    </div>
                
                </>

            ): null}

        </>

    )
    
}