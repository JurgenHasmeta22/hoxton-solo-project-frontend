import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon"
import { useStore } from "../../Zustand/store"
import "./VideoItemPage.css"
import ReactLoading from 'react-loading';

export default function VideoItemPage({validateUser}:any) {

    const params = useParams()
    const navigate = useNavigate()

    const [comment, setComment] = useState<any>()

    const { videoItem, setVideoItem, user, videos, comments, setComments, setVideos, setUser } = useStore()
    
    const videosFiltered = videos.filter(video => video.id !== videoItem?.id)

    useEffect(() => {
        validateUser();
    }, []);
    
    async function getIndividualVideoFromServer ():Promise<void> {

        await fetch(`http://localhost:4000/videos/${params.id}`)
          .then(resp => resp.json())
          .then(videoFromServer => setVideoItem(videoFromServer))
        
    }

    //@ts-ignore
    useEffect(getIndividualVideoFromServer, [])

    if (videoItem === null) {
        
        return (
            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>
        )

    }

    if (videoItem.title === undefined) {
        return <main>Video item not found</main>
    }

    async function saveVideo() {

        const videoSavedData = {
            videoId: videoItem?.id,
            userId: user?.id
        }

        try {

            await fetch('http://localhost:4000/videosSaved', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token
                },

                body: JSON.stringify(videoSavedData)

            })
                .then(resp => resp.json())
                .then(data => {
            
                if (data.error) {
                    alert(data.error)
                } 
                
                else {
                    setUser(data)
                    navigate(`../users/${user?.id}`)
                }

            })

        }

        catch(error) {
            console.log(error)
        }

    }

    function handleCommentChange(e: any) {
        setComment(e.target.value);
    }

    function handleCreateComment(e: any) {

        e.preventDefault();

        const commentData = {
            content: comment,
            userId: user?.id,
            videoId: videoItem?.id,
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
            videoId: videoItem?.id
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
            videoId: videoItem?.id
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

    //@ts-ignore
    const isVideoSaved = user?.savedVideos?.includes(videoSaved => videoSaved?.videoId === videoItem?.id)

    return (

        <>

            <section className="container-VideoPage" id="container-VideoPage">
                
                <HeaderNewCommon />

                <main className="main-menu">

                    
                    <div className="video-player">

                        {/* @ts-ignore */}
                        <video id="videoPlayer" height="450" width="750" controls={true} autoPlay={false} muted={false}>
                            <source src={`http://localhost:4000/video/${videoItem.title}`} type="video/mp4" />
                        </video>

                        <ul className="hashtag-list">

                            {

                                // @ts-ignore
                                videoItem.hashtags.map(hashtag => 
                                    
                                    <li key={hashtag.id}>
                                        #{hashtag.hashtag.name}
                                    </li>
                                    
                                )

                            }

                        </ul>

                    </div>

                    <div className="video-bottom">

                        <div className="header-video">
                            <h2>{videoItem.title}</h2>
                            <span >{videoItem.views} views - {videoItem.createdAt}</span>
                        </div>

                        <div className="group-video-2">

                            <i className="material-icons">thumb_up</i>
                            <span>{videoItem.countLikesInside}</span>

                            <i className="material-icons">thumb_down</i>
                            <span>{videoItem.countDislikesInside}</span>

                            {/* <i className="material-icons">share</i>
                            <span>Share</span> */}

                            {

                                !isVideoSaved ? (

                                    <>

                                        <i className="material-icons" onClick={function () {
                                            saveVideo()
                                        }}>save</i>

                                        <span>Save</span>

                                    </>

                                ): null

                            }

                        </div>

                    </div>

                    <div className="video-username">

                        <div className="wrapper">

                            <img className="img-video" src={`http://localhost:4000/avatar/${videoItem.userWhoCreatedIt.userName}`} />

                            <div className="title-wrapper">

                                <h3 className="title-video">
                                    {videoItem.userWhoCreatedIt.userName}
                                </h3>

                                <span className="span-video">
                                    {videoItem.userWhoCreatedIt.countSubscribers} Subscribers
                                </span>

                            </div>

                            <p className="p-video">
                                {videoItem.description}
                            </p>

                            {/* <a href="#" className="a-video">Show More</a> */}

                            <div className="btn-wrapper">

                                {user?.userName !== videoItem.userWhoCreatedIt.userName ? (
                                    
                                    <button className="btn-video">
                                        SUBSCRIBE
                                    </button>
                                
                                ): null}
                                
                            </div>

                        </div>

                    </div>

                    <div className="video-ribbon">

                        <div className="ribbon-wrapper-row-1">
                            <span className="span2-ribbon">{videoItem.countCommentsInside} Comments</span>
                        </div>

                        <div className="ribbon-wrapper-row-2">
                            
                            { user ? (

                                    <img className="img-ribbon" src={`http://localhost:4000/avatar/${user?.userName}`} alt="" />
                                
                                ): (
                                    <img className="img-ribbon" src="/assets/images/logos/human-2.jpg" alt="" />
                                )

                            }

                           
                            <form className="form-comment-add">

                                 {/* @ts-ignore */}
                                <textarea className="text-ribbon" placeholder="Add a public comment: " name="text-add" id="text-area-special" cols="80" rows="4"></textarea>
                                <button className="add-comment-video">Add Comment</button>
                        
                            </form>

                        </div>            

                    </div>

                    <div className="video-comments">

                        {

                            //@ts-ignore
                            videoItem.comments.map(comment => 
                                
                                <div className="comments-wrapper" key={comment.id}>

                                    <img className="img-comments"  src={`http://localhost:4000/avatar/${comment.userWhoCreatedIt.userName}`} alt="" />

                                    <div className="h4-wrapper">
                                        <h4 className="h4-comments">{comment.userWhoCreatedIt.userName}</h4>
                                        <span className="span-1-comments">{comment.createdAt}</span>
                                    </div>

                                    <p className="p-comments">{comment.content}</p>
                                    
                                    <div className="like-wrapper">

                                        <i className="material-icons">thumb_up</i>
                                        <span className="span-2-comments">{comment.countLikesInside}</span>

                                        <i className="material-icons">thumb_down</i>
                                        <span className="span-2-comments">{comment.countDislikesInside}</span>

                                        <span className="span-reply">REPLY</span>

                                    </div>

                                    <a href="#" className="a-comments">View 0 replies</a>

                                    <span className="edit-comment-video">Edit</span>
                                    <button className="remove-comment-video">X</button>
                                
                                </div>

                            )

                        }

                    </div>

                </main>
                
                <aside className="right-menu">

                    {/* @ts-ignore */}
                    {videosFiltered.map(video => 
                        
                        <div key={video.id} className="right-menu-post" onClick={function () {
                            navigate(`/videos/${video?.id}`)
                            window.location.reload()
                        }}>

                            <img className="image-post" src={`http://localhost:4000/thumbnail/${video?.title}`} alt="" />
                            <h2 className="video-title">{video?.title}</h2>
                            <span className="video-user">{video?.userWhoCreatedIt?.userName}</span>
                            <span className="video-views">{video?.views} views - {video?.createdAt} </span>
                        
                        </div>

                    )}

                </aside>

            </section>
        
        </>

    )
    
}