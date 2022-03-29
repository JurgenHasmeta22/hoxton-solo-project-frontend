import "./HomePage.css"

export default function HomePage() {

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

                                <a href="#"><svg width="23px" height="23px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg></a>
                                {/* <a href="#"></a> */}
                                
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

                    <aside className="left-menu">

                        <div className="left-menu-sub-1">

                            <div className="left-group-1">
                                <a href="#"><i className="material-icons">home</i></a>
                                <span><a href="#">Home</a></span>
                            </div>

                            <div className="left-group-1">
                                <a href="#"><i className="material-icons">local_fire_department</i></a>
                                <span><a href="#">Home</a></span>
                            </div>

                            <div className="left-group-1">
                                <a href="#"><i className="material-icons">subscriptions</i></a>
                                <span><a href="#">Home</a></span>
                            </div>

                        </div> 

                        <div className="left-menu-sub-2">

                            <div className="left-group-2">
                                <a href="#"><i className="material-icons">library_add_check</i></a>
                                <span><a href="#">Home</a></span>
                            </div>

                            <div className="left-group-2">
                                <a href="#"><i className="material-icons">history</i></a>
                                <span><a href="#">Home</a></span>
                            </div>

                        </div> 

                        <div className="left-menu-sub-3">
                            
                            <div className="left-group-3">

                                <p>Sign in to like videos, comment, and subscribe.</p>
                                
                                <button>
                                    <i className="material-icons special-icon">account_circle</i>                        <span>Sign In</span>
                                </button>

                            </div>

                        </div> 
         
                    </aside>

                    <main className="main-menu">

                        <div className="row-wrapper">

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-1webp.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-2.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-3.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-4.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                        </div>

                        <div className="row-wrapper">

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-5.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-6.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-7.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post icons-post" src="assets/images/main/foto-8.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                        </div>

                        <div className="row-wrapper">
                            
                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-1webp.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-2.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-3.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-4.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                        </div>

                        <div className="row-wrapper">
                            
                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-1webp.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-2.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-3.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                            <div className="main-post">
                                <img className="image-post" src="assets/images/main/foto-4.webp" alt="" />
                                <img className="icon-post" src="assets/images/main/icon.jpg" alt="" />
                                <h2 className="video-title">If Apple made window blind</h2>
                                <span className="video-user">seatbeans22</span>
                                <span className="video-views">153K views - 3 weeks ago </span>
                            </div>

                        </div>

                    </main>
                    
                </section>

        </>

    )
    
}