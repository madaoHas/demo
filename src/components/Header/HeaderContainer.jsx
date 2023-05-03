import Header from "./Header";
import {connect} from "react-redux";

const HeaderContainer = (props) => {
    console.log(props)
    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => ({
    idUser: state.login.id,
    email: state.login.email,
    info: state.login.profile
})

export default connect(mapStateToProps)(HeaderContainer);