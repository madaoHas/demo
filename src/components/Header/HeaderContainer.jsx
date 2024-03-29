import Header from "./Header";
import {connect} from "react-redux";
import {useEffect} from "react";
import {auth, logout} from "../../redux/loginReducer";

const HeaderContainer = (props) => {
    useEffect( () => {
        props.auth();
    },[] )
    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.auth.id,
    email: state.login.auth.email,
    info: state.login.auth.profile,
    role: state.login.auth.role
})

export default connect(mapStateToProps, {auth, logout})(HeaderContainer);
