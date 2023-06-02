import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";


const Header = (props) => {
    let exit = () => {
        props.logout();
        window.location.reload();
    }
    return (
        <div className={classes.header}>
            <div className={classes.logoAdmin}>
                <NavLink to={'/'}><img src="/logo192.png" alt="Лого"/></NavLink>
                { props.email && props.role===10 ? <NavLink to={'/admin/users'} >Админка</NavLink> : null }
            </div>
            <div className={ classes.loginBlock }>

                <div className={ classes.mobileHeader }>
                    <NavLink to={'/profile'}><img style={props.info ? {display: "block"} : {display: 'none'}} alt={""} src={props.info ? (props.info.avatar_url ? process.env.REACT_APP_URL_BASE + props.info.avatar_url.slice(7) : '/img/images.jpeg') : null} /></NavLink>
                    { props.info?.name ?
                        <NavLink to={'/profile'}>{props.info.name + ' ' + props.info.surname}</NavLink> :
                        (props.email ? <NavLink to={'/profile'}>{props.email}</NavLink> : null)
                    }
                    { props.email ?
                        <button
                            className={classes.exitButton}
                            onClick={ exit }
                        >
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