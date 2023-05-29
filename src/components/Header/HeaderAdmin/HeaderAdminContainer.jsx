import {connect} from "react-redux";
import HeaderAdmin from "./HeaderAdmin";
import {useEffect} from "react";
import {auth, logout} from "../../../redux/loginReducer";

const HeaderAdminContainer = (props) => {
    console.log(props)
    useEffect( () => {
        props.auth();
    },[] )
    return (
        <HeaderAdmin {...props} />
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.auth.id,
    email: state.login.auth.email,
    info: state.login.auth.profile,
    role: state.login.auth.role
})

export default connect(mapStateToProps, {auth, logout})(HeaderAdminContainer);