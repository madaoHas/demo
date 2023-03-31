import {NavLink} from "react-router-dom";
import classes from "./Menu.module.css";

const Menu = () => {
    return (
        <div className={classes.menuContainer}>
            <div className={classes.info}>
                <img src={"/img/images.jpeg"} />
                <div className={classes.name}>Username</div>
            </div>
            <div className={classes.menu}>
                <NavLink to={"/"}>Пользователи</NavLink>
                <NavLink to={"/"}>Новости</NavLink>
                <NavLink to={"/"}>Комментарии</NavLink>
            </div>
        </div>
    )
}

export default Menu;