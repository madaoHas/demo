import {NavLink} from "react-router-dom";
import classes from "./Menu.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";

const Menu = (props) => {
    return (
        <div className={classes.menuContainer}>
            <div className={classes.info}>
                <img alt={""} src={props.info.avatar_url ? process.env.REACT_APP_URL_BASE + props.info.avatar_url.slice(7) : '/img/images.jpeg'} />
                <div className={classes.name}>{ props.info?.name ?
                    <span>{props.info.name + ' ' + props.info.surname}</span> :
                    (props.email ? <span>{props.email}</span> : null)
                }</div>
            </div>
            <div className={classes.menu}>
                <NavLink to={"/admin/users?page=1"}>Пользователи</NavLink>
                <NavLink to={"/admin/news?page=1"}>Новости</NavLink>
                <NavLink to={"/admin/comments?page=1"}>Комментарии</NavLink>
                <NavLink to={"/admin/categories?page=1"}>Категории</NavLink>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    email: state.login.auth.email,
    info: state.login.auth.profile,
})

export default compose(connect(mapStateToProps, {}),
    withRouter, withAuthRedirect, withAdminRedirect)(Menu);