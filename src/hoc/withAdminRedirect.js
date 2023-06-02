import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirectAdmin = (state) => ({
    idUser: state.login.auth.id,
    email: state.login.auth.email,
    info: state.login.auth.profile,
    role: state.login.auth.role
})

export const withAdminRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if (this.props.role !== 10) {
                return <Navigate to={"/"} />
            }
            return <Component {...this.props} />
        }
    }

    let ConnectAdminRedirectComponent = connect(mapStateToPropsForRedirectAdmin)(RedirectComponent);

    return ConnectAdminRedirectComponent;
}