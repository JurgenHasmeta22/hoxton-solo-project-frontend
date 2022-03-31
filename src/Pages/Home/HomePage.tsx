import { useEffect } from "react"
import HomeVideo from "../../Components/Home/HomeVideo/HomeVideo"
import { useStore } from "../../Zustand/store"
import "./HomePage.css"

export default function HomePage() {

    const { videos, setVideos } = useStore()

    async function getVideosFromServer():Promise<void> {

        await fetch(`http://localhost:4000/videos`)
          .then(resp => resp.json())
          .then(videosFromServer => setVideos(videosFromServer))

    }

    //@ts-ignore
    useEffect(getVideosFromServer, [])

    return (

        <>

            <section className="container-menus" id="container-menus">
            
                    <header className="header">
                        
                        <div className="header-sub-1">

                            <div className="header-group-1">
                                <a href="#"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="20px" viewBox="0 0 122.879 103.609" enable-background="new 0 0 122.879 103.609" xmlSpace="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M10.368,0h102.144c5.703,0,10.367,4.665,10.367,10.367v0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,20.735,0,16.07,0,10.368v0C0,4.665,4.666,0,10.368,0L10.368,0z M10.368,82.875 h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0c0,5.702-4.664,10.367-10.367,10.367H10.368C4.666,103.609,0,98.944,0,93.242l0,0 C0,87.54,4.666,82.875,10.368,82.875L10.368,82.875z M10.368,41.438h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,62.173,0,57.507,0,51.805l0,0C0,46.103,4.666,41.438,10.368,41.438 L10.368,41.438z"/></g></svg></a>
                                <span className="videoManiaLogo">VideoMania</span>
                            </div>

                        </div>

                        <div className="header-sub-2">
                            
                            <div className="header-group-2">

                                <div className="button-search">
                                    <input type="search" name="q" placeholder="Search" aria-label="Search through site content"/>
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </div>

                                <a href="#"><i className="fas fa-microphone"></i></a>

                            </div>

                        </div>

                        <div className="header-sub-3">

                            <div className="header-group-3">
                                
                                <button>
                                    <i className="material-icons special-icon">account_circle</i>
                                    Sign In
                                </button>

                            </div>

                        </div>

                    </header>

                    <header className="mini-header">

                            <ul className="elements-wrapper">
                                <li className="list-items">All</li>
                                <li className="list-items">Computer</li>
                                <li className="list-items">Soccer</li>
                                <li className="list-items">Boxing</li>
                                <li className="list-items">Inter</li>
                                <li className="list-items">Web Design</li>
                                <li className="list-items">Web Design</li>
                                <li className="list-items">Inter</li>
                            </ul>

                    </header>

                    <main className="main-menu">

                        {

                            videos.map(video => 
                                
                                <HomeVideo 
                                    key = {video.id}
                                    video = {video}
                                />  
                                
                            )

                        }

                    </main>
                    
                </section>

        </>

    )
    
}