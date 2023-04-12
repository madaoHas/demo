import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (
        <div className={classes.header}>
            <NavLink to={'/'}><img src="/logo192.png" alt="Лого"/></NavLink>
            <div className={ classes.loginBlock }>
                { props.isAuth && props.role==="admin" ? <NavLink to={'/admin/users'} >Админка</NavLink> : null }
                <div className={ classes.mobileHeader }>
                    { props.isAuth ? <NavLink to={'/profile'}>{props.email}</NavLink> : null }
                    { props.isAuth ? <NavLink to={'/login'}>Выход</NavLink> : null }
                    { !props.isAuth ? <NavLink to={'/login'}>Вход</NavLink> : null }
                </div>
            </div>
        </div>
    )
}

export default Header;