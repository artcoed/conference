import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

type ReportParams = {
    id: string;
};

const Report: FC = () => {
    const { id } = useParams<ReportParams>();

    return (
        <div>
            Report {id}
        </div>
    );
};

export default Report;
