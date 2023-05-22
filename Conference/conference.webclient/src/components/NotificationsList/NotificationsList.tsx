import { Button, List } from "antd";
import { FC } from "react";
import { INotification } from "../../models/domain/INotification";
import { ListButton } from "../../models/domain/ListButton";
import classes from "./NotificationsList.module.css";

const NotificationsList: FC<{ isLoading: boolean, notifications: INotification[], buttons: ListButton<INotification>[] }> = ({ isLoading, notifications, buttons }) => {
    return (
        <div className={classes.ListContainer}>
            <List
                header={"�����������"}
                loading={isLoading}
                dataSource={notifications}
                locale={{ emptyText: "����������� ���" }}
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
                            title={"�� ���� ���������� �� ��������� �� ����: " + notification.meeting?.meetingTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationsList;