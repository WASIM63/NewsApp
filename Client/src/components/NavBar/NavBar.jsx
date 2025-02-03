import './NavBar.css';
import { useNavigate } from 'react-router-dom';
const NavBar = ({setTopic}) => {
  const Navigate=useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid bg">
        <a className="navbar-brand" href="" style={{color:"blue",fontWeight:"bold"}}>
          News-App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link active" onClick={()=>setTopic('sports')}>Sports</div>
            </li>
            <li className="nav-item">
              <div className="nav-link active" onClick={()=>setTopic('business')}>Business</div>
            </li>
            <li className="nav-item">
              <div className="nav-link active" onClick={()=>setTopic('technology')}>Technology</div>
            </li>
            <li className="nav-item">
              <div className="nav-link active" onClick={()=>setTopic('science')}>Science</div>
            </li>
            <li className="nav-item">
              <div className="nav-link active" onClick={()=>setTopic('entertainment')}>Entertainment</div>
            </li>
          </ul>
          <form className="d-flex search" role="search">
            <input
              className="form-control me-2 inputbox"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e)=>setTopic(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <p id="logout" onClick={()=>{
            localStorage.clear();
            Navigate('/');
          }}>LOG OUT</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
