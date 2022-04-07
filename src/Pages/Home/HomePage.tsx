// #region "importing"
import { useEffect, useState } from "react"
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon"
import HomeVideo from "../../Components/Home/HomeVideo/HomeVideo"
import { useStore } from "../../Zustand/store"
import "./HomePage.css"
import ReactLoading from 'react-loading';
// #endregion

export default function HomePage({validateUser}:any) {

    // #region "State and fetching stuff"
    const { videos, setVideos, setCategories, categories } = useStore()
    const [tabCategory, setTabCategory] = useState("All")

    useEffect(() => {
        validateUser();
    }, []);

    function getVideosFromServer(): void {

        fetch(`http://localhost:4000/videos`)
        .then(resp => resp.json())
        .then(videosFromServer => setVideos(videosFromServer))

    }

    //@ts-ignore
    useEffect(getVideosFromServer, [])

    function getCategoriesFromServer(): void {

        fetch(`http://localhost:4000/categories`)
        .then(resp => resp.json())
        .then(categoriesFromServer => setCategories(categoriesFromServer))

    }

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
    
    function changeChategory(categoryName: any):void {
        setTabCategory(categoryName)
    }

    if (videos === null || undefined) {
        <main>Loading...</main>
    }

    function filterVideos() {
        const videosFiltered = [...videos]
        return videosFiltered.filter(video => video.category.name === tabCategory)
    }

    return (

        <>

            <section className="container-menus" id="container-menus">
            
                    <HeaderNewCommon />

                    <header className="mini-header">

                            <ul className="elements-wrapper">

                                {

                                    categories.map(category => 

                                        <li className="list-items" key={category.id} onClick = {function (e) {
                                            changeChategory(category.name)
                                        }}>{category.name}</li>

                                    )

                                }

                            </ul>

                    </header>

                    <main className="main-menu">

                        {
                            tabCategory !== "All" ? (

                                //@ts-ignore
                                filterVideos().map(video => 
                                    
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

                            ): (

                                //@ts-ignore
                                videos?.map(video => 
                                    
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

                            )

                        }

                    </main>
                    
                </section>

        </>

    )
    
}