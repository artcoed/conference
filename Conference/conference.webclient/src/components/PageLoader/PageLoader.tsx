import { Spin } from "antd";
import { FC } from "react";
import classes from "./PageLoader.module.css";

const PageLoader: FC = () => {
    return (
        <div>
            <Spin tip="Loading" size="large">
                <div className={classes.PageLoaderContent} />
            </Spin>
        </div>
    );
};

export default PageLoader;