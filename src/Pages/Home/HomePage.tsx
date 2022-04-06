// #region "importing"
import { useEffect } from "react"
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon"
import HomeVideo from "../../Components/Home/HomeVideo/HomeVideo"
import { useStore } from "../../Zustand/store"
import "./HomePage.css"
import ReactLoading from 'react-loading';
// #endregion

export default function HomePage({validateUser}:any) {

    // #region "State and fetching stuff"
    const { videos, setVideos, setCategories, categories } = useStore()

    useEffect(() => {
        validateUser();
    }, []);

    function getVideosFromServer(): void {

        try {

            fetch(`http://localhost:4000/videos`)
            .then(resp => resp.json())
            .then(videosFromServer => setVideos(videosFromServer))

        }

        catch(error) {
            console.log(error)
        }

    }

    function getCategoriesFromServer(): void {

        try {

            fetch(`http://localhost:4000/categories`)
            .then(resp => resp.json())
            .then(categoriesFromServer => setCategories(categoriesFromServer))

        }

        catch(error) {
            console.log(error)
        }

    }

    //@ts-ignore
    useEffect(getVideosFromServer, [])

    //@ts-ignore
    useEffect(getCategoriesFromServer, [])
    // #endregion

    // #region "Checking stuff wich came from server"
    if (!videos) {

        return (
            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>
        )    
    
    }
    // #endregion
    
    return (

        <>

            <section className="container-menus" id="container-menus">
            
                    <HeaderNewCommon />

                    <header className="mini-header">

                            <ul className="elements-wrapper">

                                {
                                    categories.map(category => 

                                        <li className="list-items" key={category.id}>{category.name}</li>

                                    )

                                }

                            </ul>

                    </header>

                    <main className="main-menu">

                        {

                            videos.map(video => 
                                
                                <HomeVideo 
                                    key = {video.id}
                                    video = {video}
                                    liked = {"not"}
                                    videoLiked = {null}
                                    videoSaved = {null}
                                    user = {null}
                                    videoMine = {null}
                                />  
                                
                            )

                        }

                    </main>
                    
                </section>

        </>

    )
    
}