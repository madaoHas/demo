import Header from "./Header";
import {connect} from "react-redux";

const HeaderContainer = (props) => {
    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.id,
    email: state.login.email,
    isAuth: state.login.isAuth,
    role: state.login.role
})

export default connect(mapStateToProps)(HeaderContainer);