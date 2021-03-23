import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, Button } from 'reactstrap';
import { uAPI } from '../Utils/config';
import NewTbl from '../Utils/Datatables/Index';


class ListContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tbl: this.props.tbl,
            path: this.props.path,
        }
    }
    componentDidMount() {
        // console.log(this.props)
    }
    render() {
        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <FontAwesomeIcon icon={faUser} /> List Contact
                            <Link to='/tambah' >
                                <Button style={{ float: 'right' }} color="primary">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah
                                </Button>
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <NewTbl path={this.state.path} id={this.state.tbl} columns={[
                            { "data": 'id', 'title':'Id' },
                            { "data": 'firstName', 'title':'First Name' },
                            { "data": 'lastName', 'title':'Last Name' },
                            { "data": 'age', 'title':'Age' },
                            { "data": 'photo', 'title':'Photo' },
                            { "data": 'id', 'title':'Aksi', 'width':'20%' },
                        ]} endpoint={`${uAPI}/contact`} />
                    </CardBody>
                </Card>
            </>
        )
    }
}
export default ListContact;