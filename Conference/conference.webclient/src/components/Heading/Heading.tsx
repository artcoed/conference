import React, { FC } from "react";
import classes from "./Heading.module.css";

const Heading: FC<{ content: string }> = ({ content }) => {
    return (
        <h1 className={classes.Heading}>
            {content}
        </h1>
    );
};

export default Heading;