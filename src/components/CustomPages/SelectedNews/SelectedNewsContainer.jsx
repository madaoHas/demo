import SelectedNews from "./SelectedNews";
import {useLocation} from 'react-router-dom'
import {getNewsSuper} from "../../../redux/SelectedNewsSelector";


const SelectedNewsContainer = () => {
    let location = useLocation();
    console.log(location)
    return (
        <SelectedNews {...location} />
    )
}

const mapStateToProps = (state) => {
    // let location = useLocation();
    return {
        news: getNewsSuper(state)
    }
}

export default SelectedNewsContainer;