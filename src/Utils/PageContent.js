import React from 'react';
import {
    Switch,
    Route,
    withRouter,
    useRouteMatch,
    useParams
} from "react-router-dom";
import AddContact from '../Components/AddContact';
import DetailContact from '../Components/DetailContact';
import EditContact from '../Components/EditContact';


function PageContent() {
    let match = useRouteMatch();
    let path = match.path;
    let { id } = useParams();
    // console.log(match)
    if (path === '/tambah') {
        return (
            <Switch>
                <Route path={match.path}>
                    <AddContact />
                </Route>
            </Switch>
        );
    } else if (path === '/edit/:id') {
        return (
            <Switch>
                <Route path={match.path}>
                    <EditContact id={id} />
                </Route>
            </Switch>
        );
    } else if (path === '/detail/:id') {
        return (
            <Switch>
                <Route path={match.path}>
                    <DetailContact id={id} />
                </Route>
            </Switch>
        );
    } else {
        return <h3>Not Found</h3>;
    }
}

export default withRouter(PageContent);