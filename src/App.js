import './App.css';
import React, {lazy, Suspense} from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Route, Routes} from "react-router-dom";
import Login from "./components/authorization/Login";
import RecoveryPassword from "./components/authorization/RecoveryPassword";
import Menu from "./components/AdminPages/Menu/Menu";
import {connect} from "react-redux";
import 'flatpickr/dist/flatpickr.css';
import HeaderAdminContainer from "./components/Header/HeaderAdmin/HeaderAdminContainer";
import {useEffect} from "react";
import {initializeApp} from "./redux/appReducer";
import NewPassword from "./components/authorization/NewPassword";
import Preloader from "./components/common/Preloader/Preloader";

const NewsContainer = lazy( () => import('./components/CustomPages/News/NewsContainer') );
const ProfileContainer = lazy( () => import('./components/CustomPages/Profile/ProfileContainer') );
const SelectedNewsContainer = lazy( () => import('./components/CustomPages/SelectedNews/SelectedNewsContainer') );
const UsersContainer = lazy( () => import('./components/AdminPages/Users/UsersContainer') );
const NewsContainerAdmin = lazy( () => import('./components/AdminPages/News/NewsContainerAdmin') );
const CommentsContainerAdmin = lazy( () => import('./components/AdminPages/Comments/CommentsContainerAdmin') );
const CategoriesContainerAdmin = lazy( () => import('./components/AdminPages/Categories/CategoriesContainerAdmin') );
const UserAddContainer = lazy( () => import('./components/AdminPages/Users/UserAdd/UserAddContainer') );
const CommentsUpdateContainer = lazy( () => import('./components/AdminPages/Comments/CommentsUpdate/CommentsUpdateContainer') );
const NewsAddUpdateContainer = lazy( () => import('./components/AdminPages/News/NewsAddUpdate/NewsAddUpdateContainer') );
const UserUpdateContainer = lazy( () => import('./components/AdminPages/Users/UserUpdate/UserUpdateContainer') );


function App(props) {

    useEffect(() => {
        props.initializeApp();
    }, [props.initialized])



    if (props.initialized === false) {
        return <Preloader />
    }
    return (
        <div className="app-main">
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path="/admin/*" element={<AdminPage />} />
                    <Route path="/*" element={<UserPage />} />
                </Routes>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/" element={<NewsContainer />}/>
                        <Route path="profile" element={<ProfileContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/recovery" element={<RecoveryPassword/>}/>
                        <Route path="/news/:newsId?" element={<SelectedNewsContainer/>}/>
                        <Route path="/password-recovery/?" element={<NewPassword />} />
                    </Routes>
                </div>
                <div className="Admin">
                    <div className="AdminPageMenu">
                        <Routes>
                            <Route path="/admin/*" element={<Menu />} />
                        </Routes>

                    </div>
                    <div className="AdminPage">
                        <Routes>
                            <Route path="/admin/users" element={<UsersContainer />}/>
                            <Route path="/admin/news" element={<NewsContainerAdmin />}/>
                            <Route path="/admin/comments" element={<CommentsContainerAdmin />}/>
                            <Route path="/admin/categories" element={<CategoriesContainerAdmin />}/>
                            <Route path="/admin/users/add" element={<UserAddContainer />}/>
                            <Route path="/admin/users/update" element={<UserUpdateContainer />}/>
                            <Route path="/admin/comments/update" element={<CommentsUpdateContainer />}/>
                            <Route path="/admin/news/update" element={<NewsAddUpdateContainer />}/>
                            <Route path="/admin/news/add" element={<NewsAddUpdateContainer />}/>
                        </Routes>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}

export const UserPage = () => {
    return (
        <div className="app-wrapper">
            <HeaderContainer />
        </div>
    )
}


export const AdminPage = () => {
    return (
        <div className="app-wrapper">
            <HeaderAdminContainer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.id,
    email: state.login.email,
    role: state.login.role,
    initialized: state.app.initialized
})

export default connect(mapStateToProps,{initializeApp})(App);
