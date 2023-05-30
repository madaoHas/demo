import classes from "./HeaderAdmin.module.css";
import {NavLink} from "react-router-dom";


const HeaderAdmin = (props) => {
    let exit = () => {
        props.logout();
        window.location.reload();
    }
    return (
        <header className={classes.header}>
            <input className={classes.sideMenu} type="checkbox" id="sideMenu" />
            <NavLink className={classes.logoContainer} to={'/'}>
                <img className={classes.logo} src="/logo192.png" alt="Лого" />
            </NavLink>
            <div className={classes.info}>
                <img src={props.info.avatar_url ? process.env.REACT_APP_URL_BASE + props.info.avatar_url.slice(7) : '/img/images.jpeg'} />
                <div className={classes.name}>{ props.info?.name ?
                    <span>{props.info.name + ' ' + props.info.surname}</span> :
                    (props.email ? <span to={'/profile'}>{props.email}</span> : null)
                    }
                </div>
            </div>
            <label className={classes.hamb} htmlFor="sideMenu">
                <span className={classes.hambLine}></span>
            </label>
            <nav className={classes.nav}>
                <ul className={classes.menu}>
                    <li><NavLink to={"/admin/users"} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Пользователи</NavLink></li>
                    <li><NavLink to={"/admin/news"} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Новости</NavLink></li>
                    <li><NavLink to={"/admin/comments"} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Комментарии</NavLink></li>
                    <li><NavLink to={"/admin/categories"} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Категории</NavLink></li>
                    <li>
                        { props.email ? <NavLink to={'/login'} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Выход</NavLink> : null }
                        { !props.email ? <NavLink to={'/login'} onClick={()=>{document.getElementById("sideMenu").checked=false}}>Вход</NavLink> : null }
                    </li>
                </ul>
                <ul className={classes.menuDesktop}>
                    <li>
                        <NavLink to={'/profile'}><img src={props.info.avatar_url ? process.env.REACT_APP_URL_BASE + props.info.avatar_url.slice(7) : '/img/images.jpeg'} /></NavLink>
                    </li>
                    <li>
                        {
                            props.info?.name ?
                            <NavLink to={'/profile'}>{props.info.name + ' ' + props.info.surname}</NavLink> :
                            (props.email ? <NavLink to={'/profile'}>{props.email}</NavLink> : null)
                        }
                    </li>
                    <li>
                        { props.email ?
                            <button
                                className={classes.exitButton}
                                onClick={ exit }
                            >
                                Выход
                            </button>
                            : null }
                        { !props.email ? <NavLink to={'/login'}>Вход</NavLink> : null }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderAdmin;