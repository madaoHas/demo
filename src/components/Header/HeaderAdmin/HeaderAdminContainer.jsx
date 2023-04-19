import {connect} from "react-redux";
import HeaderAdmin from "./HeaderAdmin";

const HeaderAdminContainer = (props) => {
    return (
        <HeaderAdmin {...props} />
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.id,
    email: state.login.email,
    isAuth: state.login.isAuth,
    role: state.login.role
})

export default connect(mapStateToProps)(HeaderAdminContainer);