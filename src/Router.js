import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import App from './App';

function NoMatchRoute() {
    return (<Redirect to='/' />);
}
function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/tambah" component={App} />
                <Route path="/detail/:id" component={App} />
                <Route path="/edit/:id" component={App} />
                <NoMatchRoute />
            </Switch>

        </BrowserRouter>
    );
}


export default Router;
