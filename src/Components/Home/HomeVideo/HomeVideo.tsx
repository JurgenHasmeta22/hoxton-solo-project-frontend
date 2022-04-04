import { useNavigate } from "react-router-dom"
import "./HomeVideo.css"

export default function HomeVideo({video}:any) {

    const navigate = useNavigate()

    function handleRedirectToUser(userId:any) {
        navigate(`/users/${userId}`)
    }
    
    return (

        <>  

            <div className="main-post" onClick={function () {
                navigate(`/videos/${video.id}`)               
            }}>

                <img className="image-post" src={`http://localhost:4000/thumbnail/${video?.title}`} alt="" />
                <img className="icon-post" src={`http://localhost:4000/avatar/${video?.userWhoCreatedIt?.userName}`} alt="" />
                
                <h2 className="video-title">{video?.title}</h2>
                
                <span className="video-user" onClick={function () {
                    handleRedirectToUser(video?.userWhoCreatedIt?.countLikesInside)
                }}>{video?.userWhoCreatedIt?.userName}</span>
                
                <span className="video-views">0 views - {video?.createdAt} </span>
            
            </div>
        
        </>

    )
    
}