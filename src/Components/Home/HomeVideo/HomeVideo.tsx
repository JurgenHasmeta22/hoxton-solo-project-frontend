import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useStore } from "../../../Zustand/store"
import "./HomeVideo.css"

export default function HomeVideo({video}:any) {

    const navigate = useNavigate()
    const domain = "http://localhost:4000"

    const [comment, setComment] = useState<any>()

    const { comments, videos, setVideos, user, userItem, setComments } = useStore()

    // const [thumbnail, setThumbnail] = useState<any>(null)
    
    // async function getThumbnailFromServer():Promise<void> {

    //     await fetch(`http://localhost:4000/thumbnail/${video.title}`)
    //       .then(resp => resp.json())
    //       .then(thumbnailFromServer => setThumbnail(thumbnailFromServer))

    // }

    // //@ts-ignore
    // useEffect(getThumbnailFromServer, [])

    function handleRedirectToUser(userId:any) {
        navigate(`/users/${userId}`)
    }
    
    function handleCommentChange(e: any) {
    setComment(e.target.value);
    }

    function handleCreateComment(e: any) {

    e.preventDefault();

    const commentData = {
        content: comment,
        userId: user?.id,
        videoId: video.id,
    };

    fetch("http://localhost:4000/comments", {

        method: "POST",

        headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
        },

        body: JSON.stringify(commentData),
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

    async function deleteComment(e: any) {

    const commentsArray = [...comments];

    //@ts-ignore
    const getComment: any = commentsArray.find(
        (comment) =>
        //@ts-ignore
        comment?.userId === user?.id && comment?.photoId === photo?.id
    );

    if (getComment) {

        await fetch(`http://localhost:4000/comments/${getComment.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
        },

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

    }

    async function createVideoLike(e:any) {

    e.preventDefault()
    
    const videoLikeData = {
        userId: user?.id,
        videoId: video.id
    }

    await fetch('http://localhost:4000/videoLikes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.token
        },
        body: JSON.stringify(videoLikeData)
    })
        .then(resp => resp.json())
        .then(data => {
    
        if (data.error) {
            alert(data.error)
        } 
        
        else {
            setVideos(data)
        }

        })

    }

    async function deleteVideoLike(e:any) {
        
        const getVideo = {
            userId: user?.id,
            videoId: video.id
        }    

        //@ts-ignore
        const result = user.videosLiked.filter(videoNew => video.id === videoNew.videoId)

        //@ts-ignore
        const findId = videoLikes.findIndex(videoNew => videoNew.userId === user.id && videoNew.videoId === video.id )

        if (result) {

            await fetch(`http://localhost:4000/videoLikes/${result}`, {

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
                    setVideos(data)
                }

            })

        }

    }

    return (

        <>  

            <div className="main-post" onClick={function () {
                navigate(`/videos/${video.id}`)               
            }}>

                <img className="image-post" src={`http://localhost:4000/thumbnail/${video.title}`} alt="" />
                <img className="icon-post" src={`http://localhost:4000/avatar/${video.userWhoCreatedIt.userName}`} alt="" />
                <h2 className="video-title">{video.title}</h2>
                <span className="video-user">{video.userWhoCreatedIt.userName}</span>
                <span className="video-views">0 views - 3 weeks ago </span>
            
            </div>
        
        </>

    )
    
}