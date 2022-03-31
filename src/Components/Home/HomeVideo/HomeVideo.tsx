import "./HomeVideo.css"

export default function HomeVideo({video}:any) {

    return (

        <>  

            <div className="main-post">

                <img className="image-post" src={video.thumbnail} alt="" />
                <img className="icon-post" src={video.userWhoCreatedIt.avatar[0].src} alt="" />
                <h2 className="video-title">{video.title}</h2>
                <span className="video-user">{video.userWhoCreatedIt.userName}</span>
                <span className="video-views">0 views - 3 weeks ago </span>
            
            </div>
        
        </>

    )
    
}