import { useNavigate } from "react-router-dom"
import { useStore } from "../../../Zustand/store"
import "./HomeVideo.css"

export default function HomeVideo({video}:any) {

    const navigate = useNavigate()

    function handleRedirectToUser(userId:any) {
        navigate(`/users/${userId}`)
    }

    const { setVideos } = useStore()
    
    function increaseView() {
    
        fetch(`http://localhost:4000/videosViews/${video.id}`, {
    
            method: "PATCH",
    
            headers: {
                "Content-Type": "application/json"
            },
    
            body: JSON.stringify({ views: video.views + 1 }),
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

    return (

        <>  

            <div className="main-post" onClick={function () {
                increaseView()
                navigate(`/videos/${video.id}`)               
            }}>

                <img className="image-post" src={`http://localhost:4000/thumbnail/${video?.title}`} alt="" />
                <img className="icon-post" src={`http://localhost:4000/avatar/${video?.userWhoCreatedIt?.userName}`} alt="" />
                
                <h2 className="video-title">{video?.title}</h2>
                
                <span className="video-user" onClick={function () {
                    handleRedirectToUser(video?.userWhoCreatedIt?.countLikesInside)
                }}>{video?.userWhoCreatedIt?.userName}</span>
                
                <span className="video-views">{video?.views} views - {video?.createdAt} </span>
            
            </div>
        
        </>

    )
    
}