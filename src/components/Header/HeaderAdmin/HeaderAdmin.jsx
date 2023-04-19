import classes from "./HeaderAdmin.module.css";
import {NavLink} from "react-router-dom";


const HeaderAdmin = (props) => {
    return (
        <header className={classes.header}>
            <input className={classes.sideMenu} type="checkbox" id="sideMenu" />
            <NavLink className={classes.logoContainer} to={'/'}>
                <img className={classes.logo} src="/logo192.png" alt="Лого" />
            </NavLink>
            <div className={classes.info}>
                <img src={"/img/images.jpeg"} />
                <div className={classes.name}>Username</div>
            </div>
            <label className={classes.hamb} htmlFor="sideMenu">
                <span className={classes.hambLine}></span>
            </label>
            <nav className={classes.nav}>
                <ul className={classes.menu}>
                    <li><NavLink to={"/admin/users"} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Пользователи</NavLink></li>
                    <li><NavLink to={"/"}>Новости</NavLink></li>
                    <li><NavLink to={"/"}>Комментарии</NavLink></li>
                    <li>
                        { props.isAuth ? <NavLink to={'/login'}>Выход</NavLink> : null }
                        { !props.isAuth ? <NavLink to={'/login'}>Вход</NavLink> : null }
                    </li>
                </ul>
                <ul className={classes.menuDesktop}>
                    <li>{ props.isAuth && props.role==="admin" ? <NavLink to={'/admin/users'} >Админка</NavLink> : null }</li>
                    <li>{ props.isAuth ? <NavLink to={'/profile'}>{props.email}</NavLink> : null }</li>
                    <li>
                        { props.isAuth ? <NavLink to={'/login'}>Выход</NavLink> : null }
                        { !props.isAuth ? <NavLink to={'/login'}>Вход</NavLink> : null }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderAdmin;