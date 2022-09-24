import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon";
import { useStore } from "../../Zustand/store";
import "./VideoItemPage.css";
import ReactLoading from "react-loading";

export default function VideoItemPage({ validateUser }: any) {
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState<any>("");
  const {
    videoItem,
    setVideoItem,
    user,
    videos,
    setVideos,
    comments,
    setComments,
    setUser,
  } = useStore();

  async function getIndividualVideoFromServer() {
    fetch(`http://localhost:4000/videos/${params.id}`)
      .then((resp) => resp.json())
      .then((videoFromServer) => {
        if (videoFromServer.error) {
          alert(videoFromServer.error);
        } else {
          setVideoItem(videoFromServer);
        }
      });
  }
  async function getCommentsFromServer() {
    fetch(`http://localhost:4000/comments`)
      .then((resp) => resp.json())
      .then((commentsFromServer) => setComments(commentsFromServer));
  }

  useEffect(() => {
    validateUser();
    getIndividualVideoFromServer();
    getCommentsFromServer();
    return () => {
      setVideoItem(null);
    };
  }, [params.id]);

  const isVideoSaved = user?.savedVideos?.includes(
    (videoSaved: any) => videoSaved.videoId === videoItem?.id
  );
  const isVideoLiked = user?.videosLiked?.includes(
    (videoLiked: any) =>
      videoLiked.userId === user?.id && videoLiked.videoId === videoItem?.id
  );
  const isVideoDisliked = user?.videosDisliked?.includes(
    (videoDisliked: any) =>
      videoDisliked.userId === user?.id &&
      videoDisliked.videoId === videoItem?.id
  );
  const videosFiltered = videos?.filter((video) => video.id !== videoItem?.id);

  function saveVideo() {
    const videoSavedData = {
      videoId: videoItem?.id,
      userId: user?.id,
    };

    try {
      fetch("http://localhost:4000/videosSaved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify(videoSavedData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setUser(data);
            navigate(`../users/${user?.id}`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  function handleCommentChange(e: any) {
    setComment(e.target.value);
  }
  function addComment(e: any) {
    e.preventDefault();
    const commentData = {
      content: comment,
      userId: user?.id,
      videoId: videoItem?.id,
    };

    try {
      fetch("http://localhost:4000/comments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },

        body: JSON.stringify(commentData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });

      fetch(`http://localhost:4000/videos/${videoItem?.id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },

        //@ts-ignore
        body: JSON.stringify({
          countCommentsInside: videoItem?.countCommentsInside! + 1,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  function deleteComment(e: any) {
    e.preventDefault();
    const commentsArray = [...comments];
    const getComment: any = commentsArray.find(
      (commentNew) =>
        commentNew.userId === user?.id && commentNew?.videoId === videoItem?.id
    );

    if (getComment) {
      try {
        fetch(`http://localhost:4000/comments/${getComment.id}`, {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setVideoItem(data);
            }
          });

        fetch(`http://localhost:4000/videos/${videoItem?.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            countCommentsInside: videoItem?.countCommentsInside! - 1,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setVideoItem(data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  function addVideoLike(e: any) {
    e.preventDefault();
    const videoLikeData = {
      userId: user?.id,
      videoId: videoItem?.id,
    };

    fetch("http://localhost:4000/videoLikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(videoLikeData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setVideoItem(data);
        }
      });

    const dataUpdated = {
      countLikesInside: videoItem?.countLikesInside! + 1,
    };

    fetch(`http://localhost:4000/videos/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      //@ts-ignore
      body: JSON.stringify(dataUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setVideoItem(data);
        }
      });
  }
  function deleteVideoLike(e: any) {
    const result = user?.videosLiked.filter(
      (videoNew: any) => videoItem?.id === videoNew.videoId
    );

    if (result) {
      fetch(`http://localhost:4000/videoLikes/${result}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
          videoId: String(videoItem?.id),
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });

      const dataUpdated = {
        countLikesInside: videoItem?.countLikesInside! - 1,
      };

      fetch(`http://localhost:4000/videos/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify(dataUpdated),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });
    }
  }
  function addVideoDislike(e: any) {
    e.preventDefault();
    const videoDislikeData = {
      userId: user?.id,
      videoId: videoItem?.id,
    };

    fetch("http://localhost:4000/videoDislikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(videoDislikeData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setVideoItem(data);
        }
      });

    const dataUpdated = {
      countDislikesInside: videoItem?.countDislikesInside! + 1,
    };

    fetch(`http://localhost:4000/videos/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(dataUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setVideoItem(data);
        }
      });
  }
  function deleteVideoDislike() {
    const result = user?.videosDisliked.filter(
      (videoNew: any) => videoItem?.id === videoNew.videoId
    );
    if (result) {
      fetch(`http://localhost:4000/videoDislikes/${result}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
          videoId: String(videoItem?.id),
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });

      const dataUpdated = {
        countDislikesInside: videoItem?.countDislikesInside! - 1,
      };

      fetch(`http://localhost:4000/videos/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        //@ts-ignore
        body: JSON.stringify(dataUpdated),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });
    }
  }
  function addCommentLike(e: any, commentId: any) {
    e.preventDefault();
    const commentLikeData = {
      userId: user?.id,
      commentId: commentId,
    };

    fetch("http://localhost:4000/commentLikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
        videoId: String(videoItem?.id),
      },
      body: JSON.stringify(commentLikeData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setVideoItem(data);
        }
      });

    const dataUpdated = {
      countLikesInside: comments[commentId - 1].countLikesInside + 1,
    };

    fetch(`http://localhost:4000/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      //@ts-ignore
      body: JSON.stringify(dataUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setVideoItem(data);
        }
      });
  }
  function deleteCommentLike(e: any, commentId: any) {
    const result = user?.commentsLiked.filter(
      (commentNew: any) => commentId === commentNew.commentId
    );
    if (result) {
      try {
        fetch(`http://localhost:4000/commentLikes/${result}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
            videoId: String(videoItem?.id),
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setVideoItem(data);
            }
          });
        fetch(`http://localhost:4000/comments/${commentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            countLikesInside: comments[commentId - 1].countLikesInside - 1,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setVideoItem(data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  function addCommentDislike(e: any, commentId: any) {
    e.preventDefault();
    const commentDislikeData = {
      userId: user?.id,
      commentId: commentId,
    };
    try {
      fetch("http://localhost:4000/commentDislikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
          videoId: String(videoItem?.id),
        },
        body: JSON.stringify(commentDislikeData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });
      fetch(`http://localhost:4000/comments/${commentId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        //@ts-ignore
        body: JSON.stringify({
          countDislikesInside: comments[commentId - 1].countDislikesInside + 1,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setVideoItem(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  function deleteCommentDislike(e: any, commentId: any) {
    const result = user?.commentsDisliked.filter(
      (commentNew: any) => comment.id === commentNew.commntId
    );
    if (result) {
      try {
        fetch(`http://localhost:4000/commentDislikes/${result}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
            videoId: String(videoItem?.id),
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setVideoItem(data);
            }
          });
        fetch(`http://localhost:4000/comments/${commentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            countDislikesInside:
              comments[commentId - 1].countDislikesInside - 1,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setVideoItem(data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (videoItem === null) {
    return (
      <div className="loading-wrapper">
        <ReactLoading
          type={"spin"}
          color={"#000"}
          height={200}
          width={100}
          className="loading"
        />
      </div>
    );
  }

  if (videoItem.title === undefined) {
    return <main>Video item not found</main>;
  }

  return (
    <>
      <section className="container-VideoPage" id="container-VideoPage">
        <HeaderNewCommon />
        <main className="main-menu">
          <div className="video-player">
            <video
              id="videoPlayer"
              height="450"
              width="750"
              controls={true}
              autoPlay={false}
              muted={false}
            >
              <source
                src={`http://localhost:4000/video/${videoItem.title}`}
                type="video/mp4"
              />
            </video>
            <ul className="hashtag-list">
              {videoItem?.hashtags.map((hashtag: any) => (
                <li key={hashtag.id}>#{hashtag.hashtag.name}</li>
              ))}
            </ul>
          </div>
          <div className="video-bottom">
            <div className="header-video">
              <h2>{videoItem.title}</h2>
              <span>
                {videoItem.views} views - {videoItem.createdAt}
              </span>
            </div>
            <div className="group-video-2">
              {isVideoLiked ? (
                <>
                  <i
                    className={isVideoLiked ? "filled-like" : "material-icons"}
                    onClick={function (e) {
                      deleteVideoLike(e);
                    }}
                  >
                    thumb_up
                  </i>
                  <span>{videoItem.countLikesInside}</span>
                </>
              ) : (
                <>
                  <i
                    className={isVideoLiked ? "filled-like" : "material-icons"}
                    onClick={function (e) {
                      addVideoLike(e);
                    }}
                  >
                    thumb_up
                  </i>
                  <span>{videoItem.countLikesInside}</span>
                </>
              )}
              {isVideoDisliked ? (
                <>
                  <i
                    className={
                      isVideoDisliked ? "filled-like" : "material-icons"
                    }
                    onClick={function () {
                      deleteVideoDislike();
                    }}
                  >
                    thumb_down
                  </i>
                  <span>{videoItem.countDislikesInside}</span>
                </>
              ) : (
                <>
                  <i
                    className={
                      isVideoDisliked ? "filled-like" : "material-icons"
                    }
                    onClick={function (e) {
                      addVideoDislike(e);
                    }}
                  >
                    thumb_down
                  </i>
                  <span>{videoItem.countDislikesInside}</span>
                </>
              )}
              {!isVideoSaved ? (
                <>
                  <i
                    className="material-icons"
                    onClick={function () {
                      saveVideo();
                    }}
                  >
                    save
                  </i>
                  <span>Save</span>
                </>
              ) : null}
            </div>
          </div>
          <div className="video-username">
            <div className="wrapper">
              <img
                className="img-video"
                src={`http://localhost:4000/avatar/${videoItem.userWhoCreatedIt.userName}`}
              />
              <div className="title-wrapper">
                <h3 className="title-video">
                  {videoItem.userWhoCreatedIt.userName}
                </h3>
                <span className="span-video">
                  {videoItem.userWhoCreatedIt.countSubscribers} Subscribers
                </span>
              </div>
              <p className="p-video">{videoItem.description}</p>
              <div className="btn-wrapper">
                {user?.userName !== videoItem.userWhoCreatedIt.userName ? (
                  <button className="btn-video">SUBSCRIBE</button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="video-ribbon">
            <div className="ribbon-wrapper-row-1">
              <span className="span2-ribbon">
                {videoItem.countCommentsInside} Comments
              </span>
            </div>
            <div className="ribbon-wrapper-row-2">
              {user ? (
                <img
                  className="img-ribbon"
                  src={`http://localhost:4000/avatar/${user?.userName}`}
                  alt=""
                />
              ) : (
                <img
                  className="img-ribbon"
                  src="/assets/images/logos/human-2.jpg"
                  alt=""
                />
              )}
              <form
                className="form-comment-add"
                onSubmit={function (e) {
                  addComment(e);
                }}
              >
                <textarea
                  className="text-ribbon"
                  placeholder="Add a public comment: "
                  value={comment}
                  name="text-add"
                  id="text-area-special"
                  cols={80}
                  rows={4}
                  onChange={function (e) {
                    handleCommentChange(e);
                  }}
                ></textarea>
                <button className="add-comment-video">Add Comment</button>
              </form>
            </div>
          </div>
          <div className="video-comments">
            {
              //@ts-ignore
              videoItem?.comments?.map((comment) => (
                <div className="comments-wrapper" key={comment.id}>
                  <img
                    className="img-comments"
                    src={`http://localhost:4000/avatar/${comment?.userWhoCreatedIt?.userName}`}
                    alt=""
                  />
                  <div className="h4-wrapper">
                    <h4 className="h4-comments">
                      {comment?.userWhoCreatedIt?.userName}
                    </h4>
                    <span className="span-1-comments">
                      {comment?.createdAt}
                    </span>
                  </div>
                  <p className="p-comments">{comment?.content}</p>
                  <div className="like-wrapper">
                    {isVideoLiked ? (
                      <i
                        className="material-icons filled-like"
                        onClick={function (e) {
                          deleteCommentLike(e, comment.id);
                        }}
                      >
                        thumb_up
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={function (e) {
                          addCommentLike(e, comment.id);
                        }}
                      >
                        thumb_up
                      </i>
                    )}
                    <span className="span-2-comments">
                      {comment?.countLikesInside}
                    </span>
                    {isVideoDisliked ? (
                      <i
                        className="material-icons filled-like"
                        onClick={function (e) {
                          deleteCommentDislike(e, comment.id);
                        }}
                      >
                        thumb_down
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={function (e) {
                          addCommentDislike(e, comment.id);
                        }}
                      >
                        thumb_down
                      </i>
                    )}
                    <span className="span-2-comments">
                      {comment?.countDislikesInside}
                    </span>
                    <span className="span-reply">REPLY</span>
                  </div>
                  <a href="#" className="a-comments">
                    View 0 replies
                  </a>
                  <span className="edit-comment-video">Edit</span>
                  <button
                    className="remove-comment-video"
                    onClick={function (e) {
                      deleteComment(e);
                    }}
                  >
                    X
                  </button>
                </div>
              ))
            }
          </div>
        </main>
        <aside className="right-menu">
          {/* @ts-ignore */}
          {videosFiltered.map((video) => (
            <div
              key={video.id}
              className="right-menu-post"
              onClick={function () {
                navigate(`/videos/${video?.id}`);
                window.location.reload();
              }}
            >
              <img
                className="image-post"
                src={`http://localhost:4000/thumbnail/${video?.title}`}
                alt=""
              />
              <h2 className="video-title">{video?.title}</h2>
              <span className="video-user">
                {video?.userWhoCreatedIt?.userName}
              </span>
              <span className="video-views">
                {video?.views} views - {video?.createdAt}{" "}
              </span>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}
