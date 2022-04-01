import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./HomeVideo.css"

export default function HomeVideo({video}:any) {

    const navigate = useNavigate()
    const domain = "http://localhost:4000"

    // const [thumbnail, setThumbnail] = useState<any>(null)
    
    // async function getThumbnailFromServer():Promise<void> {

    //     await fetch(`http://localhost:4000/thumbnail/${video.title}`)
    //       .then(resp => resp.json())
    //       .then(thumbnailFromServer => setThumbnail(thumbnailFromServer))

    // }

    // //@ts-ignore
    // useEffect(getThumbnailFromServer, [])

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