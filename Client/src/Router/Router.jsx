import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import Login from '../components/Login/Login.jsx'
import Signup from '../components/Signup/Signup.jsx'
import Home from '../components/Home/Home.jsx'
import PageNotFound from '../components/PageNotFound/PageNotFound.jsx';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.jsx';

const Router=()=>{
    let auth=localStorage.getItem('auth')|| false;
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                {/* protectecd route */}
                {/* <Route path="/home" element={auth ? <Home /> : <Login/>} /> */}
                <Route path="/home" element={<Home />} />
                {/* default route */}
                <Route path='*' element={<PageNotFound/>}/>

            </Routes>
        </BrowserRouter>
    )
}
export default Router;