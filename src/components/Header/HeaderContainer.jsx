import Header from "./Header";
import {connect} from "react-redux";

const HeaderContainer = (props) => {
    console.log(props)
    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.auth.id,
    email: state.login.auth.email,
    info: state.login.auth.profile
})

export default connect(mapStateToProps)(HeaderContainer);