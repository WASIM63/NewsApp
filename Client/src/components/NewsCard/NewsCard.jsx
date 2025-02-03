// import image from "../../assets/image.jpg";
import './NewsCard.css'
const NewsCard = ({...articles}) => {
  let title=articles.articles.title
  let des=articles.articles.description
  return (
    <div className="card" style={{width: "18rem"}}>
      <img
        src={articles.articles.urlToImage ? articles.articles.urlToImage:"https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg"}
        className="card-img-top img"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{(title)?title.slice(0,40)+"...":"hdfvbhfdbvdbhdfvbjfdhbjhvdhjf"}</h5>
        <p className="card-text">{(des)?des.slice(0,90)+"...":"djvbkjdvkjdvskdjvksvbksdvbkvdvbkbvkkjsdvkjsdvkjvbvdkjbvk"}</p>
        <a href={articles.articles.url} className="btn btn-primary readMore">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
