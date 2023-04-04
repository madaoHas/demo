import Users from "./Users";
import {connect} from "react-redux";

const UsersContainer = (props) => {
    return (
        <div>
            <Users {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.usersAdminPage.users
})

export default connect(mapStateToProps)(UsersContainer);