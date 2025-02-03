
import { useState,useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import './NewsBoard.css'

// 7370ffc035224cb4849b1963ca28ba02

// eslint-disable-next-line react/prop-types
const NewsBoard = ({ topic}) => {
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=${import.meta.env.VITE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
        console.log(data.articles);
      });
  }, [topic]);

  return (
    <div className="News-body">
        {console.log(news.length)}
      {(news.length)
        ? news.map((articles, index) => {
            return <NewsCard key={index} articles={articles} />;
          })
        : console.log("false")}
    </div>
  );
};

export default NewsBoard;
