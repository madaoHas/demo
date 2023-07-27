import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    idUser: state.login.auth.id,
    email: state.login.auth.email,
    info: state.login.auth.profile,
    role: state.login.auth.role
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if (!this.props.email) {
                return <Navigate to={"/news?page=1"} />
            }
            return <Component {...this.props} />
        }
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectAuthRedirectComponent;
}