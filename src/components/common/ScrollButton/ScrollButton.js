import React, {useState} from 'react';
import classes from "./ScrollButton.module.css";

const ScrollButton = () =>{

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 600){
            setVisible(true)
        }
        else if (scrolled <= 600){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div onClick={scrollToTop}
             style={{display: visible ? 'inline' : 'none'}} className={classes.scrollBtn}>
            <img src={"/img/ScrollBtn.svg"} alt={""} />
        </div>
    );
}

export default ScrollButton;