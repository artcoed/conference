import { Layout } from 'antd';
import React, { FC } from 'react';
import './App.css';
import AppRouter from './components/AppRouter/AppRouter';

const App: FC = () => {
    return (
        <Layout>
            <AppRouter/>
        </Layout>
    );
};

export default App;
