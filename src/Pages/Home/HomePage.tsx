import { useEffect, useState } from "react";
import HeaderNewCommon from "../../Components/Common/HeaderCommon/HeaderNewCommon";
import HomeVideo from "../../Components/Home/HomeVideo/HomeVideo";
import { useStore } from "../../Zustand/store";
import "./HomePage.css";
import ReactLoading from "react-loading";

export default function HomePage({ validateUser }: any) {
  const { videos, setVideos, setCategories, categories } = useStore();
  const [tabCategory, setTabCategory] = useState("All");

  function changeChategory(categoryName: any): void {
    setTabCategory(categoryName);
  }
  function filterVideos() {
    const videosFiltered = [...videos];
    return videosFiltered.filter(
      (video) => video.category.name === tabCategory
    );
  }

  async function getVideosFromServer() {
    fetch(`http://localhost:4000/videos`)
      .then((resp) => resp.json())
      .then((videosFromServer) => setVideos(videosFromServer));
  }
  async function getCategoriesFromServer() {
    fetch(`http://localhost:4000/categories`)
      .then((resp) => resp.json())
      .then((categoriesFromServer) => setCategories(categoriesFromServer));
  }
  useEffect(() => {
    validateUser();
    getVideosFromServer();
    getCategoriesFromServer();
  }, []);

  if (!videos) {
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
  if (videos === null || undefined) {
    <main>Loading...</main>;
  }

  return (
    <>
      <section className="container-menus" id="container-menus">
        <HeaderNewCommon />
        <header className="mini-header">
          <ul className="elements-wrapper">
            {categories.map((category) => (
              <li
                className="list-items"
                key={category.id}
                onClick={function (e) {
                  changeChategory(category.name);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </header>
        <main className="main-menu">
          {tabCategory !== "All"
            ? //@ts-ignore
              filterVideos().map((video) => (
                <HomeVideo
                  key={video.id}
                  video={video}
                  liked={"not"}
                  videoLiked={null}
                  videoSaved={null}
                  user={null}
                  videoMine={null}
                />
              ))
            : //@ts-ignore
              videos?.map((video) => (
                <HomeVideo
                  key={video.id}
                  video={video}
                  liked={"not"}
                  videoLiked={null}
                  videoSaved={null}
                  user={null}
                  videoMine={null}
                />
              ))}
        </main>
      </section>
    </>
  );
}
