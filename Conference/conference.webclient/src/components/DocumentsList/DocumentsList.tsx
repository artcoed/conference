import { Button, List } from 'antd';
import React, { FC } from 'react';
import { downloadDocument } from '../../http/meetings';
import { IDocument } from '../../models/domain/IDocument';
import classes from "./DocumentsList.module.css"

const DocumentsList: FC<{ documents: IDocument[] }> = ({ documents }) => {
    const tryDownloadDocument = (myDocument: IDocument) => {
        downloadDocument(myDocument);
    }

    return (
        <div className={classes.ListContainer}>
            <List
                header={"Документы"}
                locale={{ emptyText: "Документов нет" }}
                dataSource={documents}
                renderItem={(document) => (
                    <List.Item key={document.id}
                        actions={[<Button key={"Download"} onClick={() => { tryDownloadDocument(document) }}>Скачать</Button>]}
                    >
                        <List.Item.Meta
                            title={document.name}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default DocumentsList;