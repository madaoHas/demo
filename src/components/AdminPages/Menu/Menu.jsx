import {NavLink} from "react-router-dom";
import classes from "./Menu.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {getCommentItem, updateComment} from "../../../redux/commentsAdminReducer";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

const Menu = (props) => {
    return (
        <div className={classes.menuContainer}>
            <div className={classes.info}>
                <img src={props.info.avatar_url ? process.env.REACT_APP_URL_BASE + props.info.avatar_url.slice(7) : '/img/images.jpeg'} />
                <div className={classes.name}>{ props.info?.name ?
                    <span>{props.info.name + ' ' + props.info.surname}</span> :
                    (props.email ? <span to={'/profile'}>{props.email}</span> : null)
                }</div>
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

const mapStateToProps = (state) => ({
    email: state.login.auth.email,
    info: state.login.auth.profile,
})

export default compose(connect(mapStateToProps, {}),
    withRouter, withAuthRedirect)(Menu);