import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();
  return (
    <div className="landingBg">
      <ul className="nav nav-tabs landing-page">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">
            Disabled
          </a>
        </li>
        <h1 className="lh1">Welcome to My News App</h1>
      </ul>
      <div className="landing-conatiner">
      </div>
      <div className="lbtn">
          <button onClick={() => Navigate("/signup")}>SignUp</button>
          <button onClick={() => Navigate("/login")}>Login</button>
        </div>
        <div className="owner">
                <p id="github">GITHUB : <a href="https://github.com/WASIM63">https://github.com/WASIM63</a></p>
                <p id="linkedin">LINKED IN : <a href="https://www.linkedin.com/in/wasim-akram-mallick-542096282/">wasim-akram-mallick-542096282</a></p>
            </div>
    </div>
  );
};

export default LandingPage;
