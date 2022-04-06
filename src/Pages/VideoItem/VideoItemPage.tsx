// #region "importing"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon"
import { useStore } from "../../Zustand/store"
import "./VideoItemPage.css"
import ReactLoading from 'react-loading';
// #endregion

export default function VideoItemPage({validateUser}:any) {

    // #region "state"
    const params = useParams()
    const navigate = useNavigate()

    const [comment, setComment] = useState<any>("")

    const { videoItem, setVideoItem, user, videos, comments, setComments, setUser } = useStore()
    
    //@ts-ignore
    const videosFiltered = videos.filter(video => video.id !== videoItem?.id)
    // #endregion

    // #region "getting stuff from server and checking loading etc"
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

    function getCommentsFromServer ():any {

        fetch(`http://localhost:4000/comments`)
          .then(resp => resp.json())
          .then(commentsFromServer => setComments(commentsFromServer))
        
    }

    //@ts-ignore
    useEffect(getCommentsFromServer, [])

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

    // #endregion

    // #region "save video functionality"
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
    // #endregion

    // #region "CRUD on comments, video etc"
    function addComment(e: any) {

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

            body: JSON.stringify(commentData)

        })
            .then((resp) => resp.json())
            .then((data) => {

            if (data.error) {
                alert(data.error);
            } 
            
            else {
                setVideoItem(data);
            }

        });

    }

    function deleteComment(e: any) {

        e.preventDefault()
        e.stopPropagation()

        const commentsArray = [...comments];

        //@ts-ignore
        const getComment: any = commentsArray.find((commentNew) =>

            //@ts-ignore
            commentNew.userId === user?.id && commentNew?.videoId === videoItem?.id

        );

        if (getComment) {

            fetch(`http://localhost:4000/comments/${getComment.id}`, {

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
                    setVideoItem(data);
                }

            });

        }

    }

    async function addVideoLike(e:any) {

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
                    setVideoItem(data)
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
                    Authorization: localStorage.token,
                    videoId: String(videoItem?.id)
                }

            })
            .then(resp => resp.json())
            .then(data => {
            
                if (data.error) {
                    alert(data.error)
                } 
                    
                else {
                    setVideoItem(data)
                }

            })

        }

    }

    async function addVideoDislike(e:any) {

        e.preventDefault()
        
        const videoDislikeData = {
            userId: user?.id,
            videoId: videoItem?.id
        }

        await fetch('http://localhost:4000/videoDislikes', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },

            body: JSON.stringify(videoDislikeData)

        })
            .then(resp => resp.json())
            .then(data => {
        
                if (data.error) {
                    alert(data.error)
                } 
                
                else {
                    setVideoItem(data)
                }

            })

    }

    async function deleteVideoDislike(e:any) {
        
        const getVideo = {
            userId: user?.id,
            videoId: videoItem?.id
        }    

        //@ts-ignore
        const result = user.videosDisliked.filter(videoNew => video.id === videoNew.videoId)

        //@ts-ignore
        const findId = videoDisliked.findIndex(videoNew => videoNew.userId === user.id && videoNew.videoId === video.id )

        if (result) {

            await fetch(`http://localhost:4000/videoDislikes/${result}`, {

                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                    videoId: String(videoItem?.id)
                }

            })
            .then(resp => resp.json())
            .then(data => {
            
                if (data.error) {
                    alert(data.error)
                } 
                    
                else {
                    setVideoItem(data)
                }

            })

        }

    }

    async function addCommentLike(e:any, commentId:any) {

        e.preventDefault()
        
        const commentLikeData = {
            userId: user?.id,
            commentId: commentId
        }

        await fetch('http://localhost:4000/comentLikes', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token,
                videoId: String(videoItem?.id)
            },

            body: JSON.stringify(commentLikeData)

        })
            .then(resp => resp.json())
            .then(data => {
        
                if (data.error) {
                    alert(data.error)
                } 
                
                else {
                    setVideoItem(data)
                }

            })

    }

    async function deleteCommentLike(e:any) {
        
        const getVideo = {
            userId: user?.id,
            videoId: videoItem?.id
        }    

        //@ts-ignore
        const result = user.commentsLiked.filter(commentNew => commentId === commentNew.commentId)

        //@ts-ignore
        const findId = commentLikes.findIndex(commentNew => commentNew.userId === user.id && commentNew.commentd === comment.id )

        if (result) {

            await fetch(`http://localhost:4000/commentLikes/${result}`, {

                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                    videoId: String(videoItem?.id)
                }

            })
            .then(resp => resp.json())
            .then(data => {
            
                if (data.error) {
                    alert(data.error)
                } 
                    
                else {
                    setVideoItem(data)
                }

            })

        }

    }

    async function addCommentDislike(e:any, commentId:any) {

        e.preventDefault()
        
        const commentDislikeData = {
            userId: user?.id,
            commentId: commentId
        }

        await fetch('http://localhost:4000/commentDislikes', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token,
                videoId: String(videoItem?.id)
            },

            body: JSON.stringify(commentDislikeData)

        })
            .then(resp => resp.json())
            .then(data => {
        
                if (data.error) {
                    alert(data.error)
                } 
                
                else {
                    setVideoItem(data)
                }

            })

    }

    async function deleteCommentDislike(e:any, commentId:any) {
        
        const getComment = {
            userId: user?.id,
            commentId: commentId
        }    

        //@ts-ignore
        const result = user.commentsDisliked.filter(commentNew => comment.id === commentNew.commntId)

        //@ts-ignore
        const findId = commentsDisliked.findIndex(commentNew => commentNew.userId === user.id && commentNew.commentId === commnt.id )

        if (result) {

            await fetch(`http://localhost:4000/commentDislikes/${result}`, {

                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.token,
                    videoId: String(videoItem?.id)
                }

            })
            .then(resp => resp.json())
            .then(data => {
            
                if (data.error) {
                    alert(data.error)
                } 
                    
                else {
                    setVideoItem(data)
                }

            })

        }

    }
    // #endregion

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
                                videoItem?.hashtags.map(hashtag => 
                                    
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

                           
                            <form className="form-comment-add" onSubmit={function(e) {
                                addComment(e)
                            }}>

                                 {/* @ts-ignore */}
                                <textarea className="text-ribbon" placeholder="Add a public comment: " value = {comment} name="text-add" id="text-area-special" cols="80" rows="4" 
                                    //@ts-ignore
                                    onChange = {function (e) {
                                        handleCommentChange(e)
                                    }}
                                >

                                </textarea>
                                
                                <button className="add-comment-video">Add Comment</button>
                        
                            </form>

                        </div>            

                    </div>

                    <div className="video-comments">

                        {

                            //@ts-ignore
                            videoItem?.comments?.map(comment => 
                                
                                <div className="comments-wrapper" key={comment.id}>

                                    <img className="img-comments"  src={`http://localhost:4000/avatar/${comment?.userWhoCreatedIt?.userName}`} alt="" />

                                    <div className="h4-wrapper">
                                        <h4 className="h4-comments">{comment?.userWhoCreatedIt?.userName}</h4>
                                        <span className="span-1-comments">{comment?.createdAt}</span>
                                    </div>

                                    <p className="p-comments">{comment?.content}</p>
                                    
                                    <div className="like-wrapper">

                                        <i className="material-icons" onClick={function (e) {
                                            addVideoLike(e)
                                        }}>thumb_up</i>

                                        <span className="span-2-comments">{comment?.countLikesInside}</span>

                                        <i className="material-icons" onClick={function (e) {
                                            addVideoDislike(e)
                                        }}>thumb_down</i>

                                        <span className="span-2-comments">{comment?.countDislikesInside}</span>

                                        <span className="span-reply">REPLY</span>

                                    </div>

                                    <a href="#" className="a-comments">View 0 replies</a>

                                    <span className="edit-comment-video">Edit</span>
                                    
                                    <button className="remove-comment-video" onClick={function (e) {
                                        deleteComment(e)
                                    }}>X</button>
                                
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