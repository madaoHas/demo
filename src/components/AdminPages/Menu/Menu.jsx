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
                <NavLink to={"/admin/users"}>Пользователи</NavLink>
                <NavLink to={"/admin/news"}>Новости</NavLink>
                <NavLink to={"/admin/comments"}>Комментарии</NavLink>
                <NavLink to={"/admin/categories"}>Категории</NavLink>
            </div>
        </div>
    )
}

export default Menu;