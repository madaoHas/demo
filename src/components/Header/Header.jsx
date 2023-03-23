import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <div className={classes.header}>
            <NavLink to={'/'}><img src="/logo192.png" alt="Лого"/></NavLink>
            <div className={classes.news}>
                {/*<NavLink to={'/'}>Новости</NavLink>*/}
            </div>
            <div className={classes.loginBlock}>
                <NavLink to={'/profile'}>Имя пользователя</NavLink>
                <NavLink to={'/'}>Выход</NavLink>
            </div>
        </div>
    )
}

export default Header;