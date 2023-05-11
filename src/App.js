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
import HeaderAdminContainer from "./components/Header/HeaderAdmin/HeaderAdminContainer";
import NewsContainerAdmin from "./components/AdminPages/News/NewsContainerAdmin";
import CommentsContainerAdmin from "./components/AdminPages/Comments/CommentsContainerAdmin";
import CategoriesContainerAdmin from "./components/AdminPages/Categories/CategoriesContainerAdmin";
import UserAddContainer from "./components/AdminPages/Users/UserAdd/UserAddContainer";
import CommentsUpdateContainer from "./components/AdminPages/Comments/CommentsUpdate/CommentsUpdateContainer";
import NewsAddUpdateContainer from "./components/AdminPages/News/NewsAddUpdate/NewsAddUpdateContainer";
import {useEffect} from "react";
import {initializeApp} from "./redux/appReducer";


function App(props) {
    console.log(props)

    useEffect(() => {
        props.initializeApp();
    }, [props.initialized])

    console.log(props.initialized)
    if (props.initialized === false) {
        return null
    }
    return (
        <div className="app-main">
            {props.isAuth && props.role === "admin" ? <HeaderAdminContainer /> : <HeaderContainer />}
            <div className="app-wrapper">
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/" element={<NewsContainer />}/>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/recovery" element={<RecoveryPassword/>}/>
                        <Route path="/news/:newsId?" element={<SelectedNewsContainer/>}/>
                    </Routes>
                </div>
                {/*{props.email && props.role === 10 ?*/}
                    <div className="Admin">
                    <div className="AdminPageMenu">
                        <Routes>
                            <Route path="/admin/*" element={<Menu/>}/>
                        </Routes>
                    </div>
                    <div className="AdminPage">
                        <Routes>
                            <Route path="/admin/users" element={<UsersContainer />}/>
                            <Route path="/admin/news" element={<NewsContainerAdmin />}/>
                            <Route path="/admin/comments" element={<CommentsContainerAdmin />}/>
                            <Route path="/admin/categories" element={<CategoriesContainerAdmin />}/>
                            <Route path="/admin/users/add" element={<UserAddContainer />}/>
                            <Route path="/admin/comments/update" element={<CommentsUpdateContainer />}/>
                            <Route path="/admin/news/update" element={<NewsAddUpdateContainer />}/>
                            <Route path="/admin/news/add" element={<NewsAddUpdateContainer />}/>
                        </Routes>
                    </div>
                </div>
                    {/*: null}*/}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    idUser: state.login.id,
    email: state.login.email,
    role: state.login.role,
    initialized: state.app.initialized
})

export default connect(mapStateToProps,{initializeApp})(App);
