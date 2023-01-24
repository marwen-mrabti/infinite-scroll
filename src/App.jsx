import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { loader } from "./assets";
import { getPhotos } from "./api/photos.api";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [fetchMore, setFetchMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
        !fetchMore
      ) {
        setFetchMore(true);
        setPage((prev) => prev + 1);
      } else {
        setFetchMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, fetchMore]);

  const photosQuery = useQuery(["photos", page, fetchMore], () => getPhotos(page), {
    enabled: fetchMore || !photos.length,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setPhotos((prev) => [...prev, ...data.photos]);
    },
  });

  return (
    <div className=" bg-neutral-100 w-[100vw] min-h-[100vh] flex flex-col justify-start items-center ">
      <h1 className="my-[4rem] font-bold text-5xl text-center mb-[1.5rem] uppercase tracking-[-0.1rem]">
        {" "}
        unsplash api - infinite scroll{" "}
      </h1>
      {photosQuery.isLoading && !photos.length ? (
        <img src={loader} alt="loading in progress..." className="my-[4rem] " />
      ) : photosQuery.isError ? (
        <h3 className="text-lg m-3 text-red-600 ">
          {photosQuery.error.message} ::server technical problem comeback in 1 hour{" "}
        </h3>
      ) : (
        <div className="px-4 grid grid-cols-1   ">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="w-[90%] h-auto bg-transparent my-[1rem] mx-auto rounded-lg shadow-2xl hover:cursor-pointer "
            >
              <a href={photo?.src.medium} target="_blank" className="h-fit">
                <img
                  src={photo?.src.medium}
                  alt={photo?.alt}
                  title={photo?.alt}
                  className="w-full h-auto object-cover "
                />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
