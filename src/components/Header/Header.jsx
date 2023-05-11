import classes from "./Header.module.css";
import {NavLink, useNavigate} from "react-router-dom";


const Header = (props) => {
    let exit = () => {
        props.logout();
        window.location. reload();
    }
    return (
        <div className={classes.header}>
            <NavLink to={'/'}><img src="/logo192.png" alt="Лого"/></NavLink>
            <div className={ classes.loginBlock }>
                {/*<NavLink to={'/admin/users'} >Админка</NavLink>*/}
                { props.email && props.role===10 ? <NavLink to={'/admin/users'} >Админка</NavLink> : null }
                <div className={ classes.mobileHeader }>
                    { props.email ? <NavLink to={'/profile'}>{props.email}</NavLink> : null }
                    { props.email ?
                        <button className={classes.exitButton}
                                            onClick={ exit }>
                            Выход
                        </button>
                        : null }
                    { !props.email ? <NavLink to={'/login'}>Вход</NavLink> : null }
                </div>
            </div>
        </div>
    )
}

export default Header;