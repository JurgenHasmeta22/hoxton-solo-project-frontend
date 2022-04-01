import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useStore } from "../../Zustand/store"
import "./VideoItemPage.css"

export default function VideoItemPage() {

    const params = useParams()

    const {videoItem, setVideoItem} = useStore()

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
                
                <header className="header">
                            
                    <div className="header-sub-1">
                
                        <div className="header-group-1">

                            <a href="#"></a>

                            <a href="#"></a>

                        </div>
                
                    </div>
                
                    <div className="header-sub-2">
                                
                        <div className="header-group-2">

                            <div className="button-search">
                                <input type="search" name="search" placeholder="Search" aria-label="Search through site content" />
                                <button type="submit"><i className="fa fa-search"></i></button>
                            </div>

                            <a href="#"><i className="fas fa-microphone"></i></a>

                        </div>
                        
                    </div>
                    
                    <div className="header-sub-3">
                
                        <div className="header-group-3">

                            <a href="#"></a>

                            <a href="#"><i className="material-icons">apps</i></a>
                            
                            <button>
                                <i className="material-icons special-icon">account_circle</i>
                                Sign In
                            </button>
                            
                        </div>
                
                    </div>
                
                </header>

                <main className="main-menu">

                    
                    <div className="video-player">

                        {/* @ts-ignore */}
                        <video id="videoPlayer" height="550" width="650" controls muted={true} autoplay={true}>
                            <source src={`http://localhost:4000/video/${videoItem.title}`} type="video/mp4" />
                        </video>

                    </div>

                    <div className="video-bottom">

                        <div className="header-video">
                            <h2>Linux users like</h2>
                            <span >195,531 views - May 19, 2021</span>
                        </div>

                        <div className="group-video-2">
                            <i className="material-icons">thumb_up</i>
                            <span>10K</span>
                            <i className="material-icons">thumb_down</i>
                            <span>547</span>
                            <i className="material-icons">share</i>
                            <span>Share</span>
                            <i className="material-icons">save</i>
                            <span>Save</span>
                            <i className="material-icons">more_horiz</i>
                        </div>

                    </div>

                    `<div className="video-username">

                        <div className="wrapper">

                            <img className="img-video" src="../images/logos/human.jpg" />

                            <div className="title-wrapper">

                                <h3 className="title-video">
                                    Jeremiah Peoples
                                </h3>

                                <span className="span-video">
                                    50.6K subscribers
                                </span>

                            </div>

                            <p className="p-video">
                                My name is Jeremiah and I am self taught software engineer Lorem ipsum dolor sit amet, consectetur adipisicing.
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

                            <span className="span2-ribbon">708 Comments</span>
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

                        <div className="comments-wrapper">

                            <img className="img-comments"src="../images/logos/human.jpg" alt="" />

                            <div className="h4-wrapper">
                                <h4 className="h4-comments">Jeremiah Peoples</h4>
                                <span className="span-1-comments"> 1 year ago</span>
                            </div>

                            <p className="p-comments">I’m also a visual learner. Currently learning CSS and Hope to learn enough to get into the field soon. Great video!!</p>
                            
                            <div className="like-wrapper">

                                <i className="material-icons">thumb_up</i>
                                <span className="span-2-comments">315</span>

                                <i className="material-icons">thumb_down</i>
                                <span className="span-reply">REPLY</span>

                            </div>

                            <a href="#" className="a-comments">View 35 replies</a>
                        
                        </div>

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