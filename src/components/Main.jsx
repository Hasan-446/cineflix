import React, { useState, useEffect } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);


const ReadMore = (text) => {
  const over= JSON.stringify(text);
    const overview= over.replace(/[^\w\s]/g,"").replace(/(^\s+|\s+$)/g,"").replace(/\s+/g," ").replace("children","");
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {setIsReadMore(!isReadMore)};

  return (
    <p>
      {isReadMore ? overview.slice(0, 150): overview }
      {overview.length > 150 &&
        <span onClick={toggleReadMore} className="text-gray-500 cursor-pointer">
          {isReadMore ? '...read more' : ' ...show less'}
        </span>
      }
    </p>
  )
}


  return (
    <div className="w-full h-[70vh] md:h-[600px] text-[#FFFDE3]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[70vh] md:h-[600px] bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-[70vh] md:h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt=""
        />
        <div className="absolute w-full top-[20%] p-4 md:p-16">
          <h1 className="text-2xl md:text-5xl font-bold">{movie?.title} </h1>
          <div className="my-4">
            <button className=" border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-[#FFFDE3] border-gray-300 py-2 px-5 ml-4 ">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}{" "}
          </p>
          
        <p className="w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] text-gray-200 text-sm md:text-base mt-2">
            <ReadMore>
              {movie?.overview}
            </ReadMore>
        </p>

            

        </div>
      </div>
    </div>
  );
};

export default Main;
