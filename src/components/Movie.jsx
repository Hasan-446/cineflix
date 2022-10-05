import React, { useState } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion,doc,updateDoc } from "@firebase/firestore"; 

const Movie = (props) => {
  const navigate= useNavigate();
    const [like, setLike] = useState(false)
    const [saved,setSaved]= useState(false)
    const {user} = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async()=>{
      if (user?.email){
        setLike(!like)
        setSaved(true)
        await updateDoc(movieID,{
          savedShows:arrayUnion({
            id: props.item.id,
            title: props.item.title,
            img:props.item.poster_path
          })
        })
      }else{
        alert ("please log in to save Movies")
      }
    }

    const handleClick=()=>{
      navigate(`/${props.genre}/${props.item.id}`)
    }
  return (
    <div className="w-[180px] sm:w-[250px] md:w-[320px] lg:w-[320px] xl:w-[280px]  inline-block cursor-pointer relative p-4">
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/w500${props.item?.poster_path}`}
        alt=""
        onClick={handleClick}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white px-5 "
      onClick={handleClick}>
        <div className="white-space-normal text-xs md:text-sm lg:text-lg font-bold flex justify-center items-center h-full text-center break-words flex-wrap ">
          {props.item?.title}
        </div>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-8 left-8 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-8 left-8 text-gray-300" />
          )}
        </p>
        <div className="flex flex-row justify-center items-center absolute top-8 right-8 text-gray-300">
          <AiFillStar/>
          <p className="text-xs md:text-sm font-bold">{props.item?.vote_average} </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
