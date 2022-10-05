import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FiChevronsRight } from 'react-icons/fi';

import Movie from "./Movie";

const Row = ({ title, fetchURL,rowID,genre}) => {
  const [movies, setMovies] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
      console.log(response.data.results)
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const handleClick=()=>{
    navigate(`${genre}`)
  }

  return (
    <div>
      <div className="flex flex-row items-center">
      <h2 className="text-[#FFFDE3] font-bold md:text-xl p-4 cursor-pointer">{title}</h2>
      {genre ? <FiChevronsRight onClick={handleClick} className="text-white cursor-pointer"/> : null}
      </div>
      <div className="relative flex items-center ml-2 group">
      <MdChevronLeft
          className='bg-white rounded-full left-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={30}
          onClick={slideLeft}
        />
        <div id={'slider'+ rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative '>
          {movies.map((item) => {
            return (
              <Movie item={item} genre={genre}></Movie>
            );
          })}
        </div>
        <MdChevronRight
          className='bg-white rounded-full right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={30}
          onClick={slideRight}
        />
      </div>
    </div>
  );
};

export default Row;
