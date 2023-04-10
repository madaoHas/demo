import logo from './logo.svg';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import {Route, Routes} from "react-router-dom";
import NewsContainer from "./components/CustomPages/News/NewsContainer";
import ProfileContainer from "./components/CustomPages/Profile/ProfileContainer";
import Login from "./components/authorization/Login";
import RecoveryPassword from "./components/authorization/RecoveryPassword";
import SelectedNewsContainer from "./components/CustomPages/SelectedNews/SelectedNewsContainer";
import UsersContainer from "./components/AdminPages/Users/UsersContainer";
import Menu from "./components/AdminPages/Menu/Menu";
import {connect} from "react-redux";
import 'flatpickr/dist/flatpickr.css';


function App(props) {
    console.log(props);
    return (
        <div className="app-main">
            <HeaderContainer />
            <div className="app-wrapper">
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/" element={<NewsContainer/>}/>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/recovery" element={<RecoveryPassword/>}/>
                        <Route path="/news/:newsId?" element={<SelectedNewsContainer/>}/>
                    </Routes>
                </div>
                {props.isAuth && props.role === "admin" ? <div className="Admin">
                    <div className="AdminPageMenu">
                        <Routes>
                            <Route path="/admin/*" element={<Menu/>}/>
                        </Routes>
                    </div>
                    <div className="AdminPage">
                        <Routes>
                            <Route path="/admin/users" element={<UsersContainer/>}/>
                        </Routes>
                    </div>
                </div> : null}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    idUser: state.login.id,
    email: state.login.email,
    isAuth: state.login.isAuth,
    role: state.login.role
})

export default connect(mapStateToProps)(App);
