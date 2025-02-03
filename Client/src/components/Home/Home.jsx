import NavBar from "../NavBar/NavBar.jsx";
import "./Home.css";
import { useState } from "react";
import NewsBoard from "../NewsBoard/NewsBoard.jsx";
import Footer from '../Footer/Footer.jsx'

const Home = () => {
  const [topic, setTopic] = useState("sports");

  return (
    <div className="home">
      <NavBar setTopic={setTopic} />
      <NewsBoard className={"news-body"} topic={topic}/>
      <Footer/>
    </div>
  );
};
export default Home;
