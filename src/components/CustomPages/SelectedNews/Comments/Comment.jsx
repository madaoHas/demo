import classes from "./Comment.module.css";
import Icon from '@mdi/react';
import {mdiClockTimeNineOutline} from '@mdi/js';

const Comment = (props) => {
    console.log(props)
    return (
        <div className={classes.commentBlock}>
            <img src={'/img/images.jpeg'} />
            <div className={classes.comment}>
                <div className={classes.info}>
                    <div className={classes.username}>{props.comment.username}</div>
                    <div className={classes.dateBlock}>
                        <Icon path={mdiClockTimeNineOutline} size={0.7}/>
                        <div className={classes.date}>{props.comment.date.date} {props.comment.date.time}</div>
                    </div>
                </div>
                <div className={classes.commentText}>{props.comment.text}</div>
            </div>
        </div>
    )
}

export default Comment;