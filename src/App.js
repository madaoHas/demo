import logo from './logo.svg';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import {Route, Routes} from "react-router-dom";
import NewsContainer from "./components/CustomPages/News/NewsContainer";
import ProfileContainer from "./components/CustomPages/Profile/ProfileContainer";


function App() {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <div className="app-wrapper-content">
          <Routes>
              <Route path="/" element={<NewsContainer />}/>
              <Route path="/profile" element={<ProfileContainer />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
