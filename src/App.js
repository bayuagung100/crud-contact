import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import ListContact from './Components/ListContact';
import PageContent from './Utils/PageContent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    render() {
        const match = this.props.match.path;
        console.log("app:" + match);
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{ margin: "20px 0" }}>CRUD Contract</h1>
                        </Col>
                    </Row>

                    <Container fluid>
                        <Row>
                            <Col>
                                {
                                    match === '/' ? (
                                        <ListContact tbl='listcontact' path={match} />
                                    ) : (
                                        <PageContent />
                                    )
                                }
                            </Col>
                        </Row>
                    </Container>

                </Container>
            </>
        )
    }
}
export default withRouter(App);