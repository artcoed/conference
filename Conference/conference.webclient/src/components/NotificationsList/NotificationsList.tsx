import { Button, List } from "antd";
import React, { FC } from "react";
import { INotification } from "../../models/domain/INotification";
import { ListButton } from "../../models/domain/ListButton";
import classes from "./NotificationsList.module.css";

const NotificationsList: FC<{ isLoading: boolean, notifications: INotification[], buttons: ListButton<INotification>[] }> = ({ isLoading, notifications, buttons }) => {
    return (
        <div className={classes.ListContainer}>
            <List
                header={"Уведомления"}
                loading={isLoading}
                dataSource={notifications}
                locale={{ emptyText: "Уведомлений нет" }}
                renderItem={(notification) => (
                    <List.Item key={notification.id}
                        actions={buttons.map(button =>
                            <Button
                                key={button.content}
                                onClick={() => button.onClick(notification)}
                            >
                                {button.content}
                            </Button>
                        )}
                    >
                        <List.Item.Meta
                            title={"Вы были приглашены на совещание по теме: " + notification.meeting?.meetingTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationsList;