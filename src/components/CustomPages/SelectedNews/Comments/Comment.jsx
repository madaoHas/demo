import classes from "./Comment.module.css";
import Icon from '@mdi/react';
import {mdiClockTimeNineOutline} from '@mdi/js';
import moment from "moment"

const Comment = (props) => {
    return (
        <div className={classes.commentBlock}>
            <img src={props.comment.user.profile.avatar_url ? process.env.REACT_APP_URL_BASE + props.comment.user.profile.avatar_url.slice(7) : '/img/images.jpeg'} />
            <div className={classes.comment}>
                <div className={classes.info}>
                    <div className={classes.username}>{props.comment.user.profile.name ? props.comment.user.profile.name : props.comment.user.email}</div>
                    <div className={classes.dateBlock}>
                        <Icon path={mdiClockTimeNineOutline} size={0.7}/>
                        <div className={classes.date}>{moment(props.comment.created_at).format('DD-MM-yyyy HH:mm')}</div>
                    </div>
                </div>
                <div className={classes.commentText}>{props.comment.text}</div>
            </div>
        </div>
    )
}

export default Comment;