import { Button, List } from 'antd';
import React, { FC } from 'react';
import { IUser } from '../../models/domain/IUser';
import classes from "./UsersList.module.css";

const UsersList: FC<{
    isLoadingDeleting: boolean,
    isLoading: boolean,
    users: IUser[],
    deleteUser: (user: IUser) => void
}> = ({
    isLoadingDeleting,
    isLoading,
    users,
    deleteUser
}) => {
    return (
        <div className={classes.ListContainer}>
            <List
                loading={isLoading}
                dataSource={users}
                renderItem={(user) => (
                    <List.Item key={user.id}
                        actions={[
                            <Button
                                key={"Удалить"}
                                loading={isLoadingDeleting}
                                disabled={user.role === "Секретарь"}
                                onClick={() => deleteUser(user)}
                            >
                                Удалить
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={ user.login }
                            description={`${user.displayingName}, ${user.role}`} 
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default UsersList;