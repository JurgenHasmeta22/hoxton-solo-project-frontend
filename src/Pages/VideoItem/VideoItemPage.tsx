import { useEffect } from "react"
import { useParams } from "react-router-dom"
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon"
import { useStore } from "../../Zustand/store"
import "./VideoItemPage.css"

export default function VideoItemPage({validateUser}:any) {

    const params = useParams()

    const {videoItem, setVideoItem} = useStore()

    useEffect(() => {
        validateUser();
    }, []);
    
    async function getIndividualBlogFromServer ():Promise<void> {

        await fetch(`http://localhost:4000/videos/${params.id}`)
          .then(resp => resp.json())
          .then(videoFromServer => setVideoItem(videoFromServer))
        
    }
    
    //@ts-ignore
    useEffect(getIndividualBlogFromServer, [])

    if (videoItem === null) {
        return <main>Loading...</main>
    }

    if (videoItem.title === undefined) {
        return <main>Video item not found</main>
    }

    return (

        <>

            <section className="container-VideoPage" id="container-VideoPage">
                
                <HeaderNewCommon />

                <main className="main-menu">

                    
                    <div className="video-player">

                        {/* @ts-ignore */}
                        <video id="videoPlayer" height="450" width="750" controls={true} autoplay={true}>
                            <source src={`http://localhost:4000/video/${videoItem.title}`} type="video/mp4" />
                        </video>

                    </div>

                    <div className="video-bottom">

                        <div className="header-video">
                            <h2>{videoItem.title}</h2>
                            <span >1 views - {videoItem.createdAt}</span>
                        </div>

                        <div className="group-video-2">
                            <i className="material-icons">thumb_up</i>
                            <span>{videoItem.countLikesInside}</span>
                            <i className="material-icons">thumb_down</i>
                            <span>{videoItem.countDislikesInside}</span>
                            <i className="material-icons">share</i>
                            <span>Share</span>
                            <i className="material-icons">save</i>
                            <span>Save</span>
                            <i className="material-icons">more_horiz</i>
                        </div>

                    </div>

                    `<div className="video-username">

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

                            <a href="#" className="a-video">Show More</a>

                            <div className="btn-wrapper">

                                <button className="btn-video">
                                    SUBSCRIBE
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="video-ribbon">

                        <div className="ribbon-wrapper-row-1">

                            <span className="span2-ribbon">{videoItem.countCommentsInside} Comments</span>
                            <i className="material-icons">more_horiz</i>
                            <span className="span2-ribbon">SORT BY</span>

                        </div>

                        <div className="ribbon-wrapper-row-2">

                            <img className="img-ribbon" src="../images/logos/human-2.jpg" alt="" />
                            {/* @ts-ignore */}
                            <textarea class="text-ribbon" placeholder="Add a public comment: " name="text" id="" cols="80" rows="3"></textarea>
                        </div>            

                    </div>

                    <div className="video-comments">

                        {

                            //@ts-ignore
                            videoItem.comments.map(comment => 
                                
                                <div className="comments-wrapper">

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
                                
                                </div>

                            )

                        }

                    </div>

                </main>
                
                <aside className="right-menu">

                        <div className="right-menu-post"  >
                            <img className="image-post" src="../images/main/foto-2.webp" alt="" />
                            <h2 className="video-title">If Apple made window blind Lorem ipsum dolor sit amet consectetur.</h2>
                            <span className="video-user">seatbeans22</span>
                            <span className="video-views">153K views - 3 weeks ago </span>
                        </div>

                </aside>

            </section>
        
        </>

    )
    
}