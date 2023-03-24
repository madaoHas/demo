import logo from './logo.svg';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import {Route, Routes} from "react-router-dom";
import NewsContainer from "./components/CustomPages/News/NewsContainer";
import ProfileContainer from "./components/CustomPages/Profile/ProfileContainer";
import Login from "./components/authorization/Login";


function App() {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <div className="app-wrapper-content">
          <Routes>
              <Route path="/" element={<NewsContainer />}/>
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
