import { Button, List } from 'antd';
import React, { FC } from 'react';

const UsersList: FC<{ isLoadingDeleting: boolean, isLoading: boolean, users: IUserListRequest[], deleteUser: (user: IUserListRequest) => void }> = ({ isLoadingDeleting, isLoading, users, deleteUser }) => {
    return (
        <div 
            id="scrollableDiv"
            style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            marginTop: "20px"
            }}>
            <List
                loading={isLoading}
                dataSource={users}
                renderItem={(user: IUserListRequest) => (
                    <List.Item key={user.id}
                        actions={[<Button loading={isLoadingDeleting} disabled={user.role === "Администратор"} key={"Delete"} onClick={() => deleteUser(user)}>Удалить</Button>]}
                    >
                        <List.Item.Meta
                            title={ user.login }
                            description={`${user.name}, ${user.role}`} 
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default UsersList;