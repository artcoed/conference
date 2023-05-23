import { List } from 'antd';
import React, { FC } from 'react';
import classes from "./QuestionsList.module.css";

const QuestionsList: FC<{ questions: string[] }> = ({ questions }) => {
    return (
        <div className={classes.List}>
            <List
                locale={{ emptyText: "������� �����������" }}
                size="small"
                header={<div>�������</div>}
                dataSource={questions}
                renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
            />
        </div>
    );
};

export default QuestionsList;