import { faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import { uAPI } from '../Utils/config';
import { BtnBack, SwalError } from '../Utils/func';

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: {
                firstName: '',
                lastName: '',
                age: '',
                photo: '',
            },
            redirect: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChange(e) {
        let newadd = { ...this.state.add };
        newadd[e.target.name] = e.target.value;
        this.setState({
            add: newadd
        });
    }
    onSubmit(e) {
        e.preventDefault();
        // console.log('submit', this.state.add)
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                return axios.post(`${uAPI}/contact`, {
                    firstName: this.state.add.firstName,
                    lastName: this.state.add.lastName,
                    age: this.state.add.age,
                    photo: this.state.add.photo,
                }).catch(function (error) {
                        console.log(error);
                        if (error.response) {
                            if (error.response.status) {
                                console.log(error.response)
                                SwalError(error.response.data.message)
                                if (error.response.status === 500) SwalError(error.response.data)
                                if (error.response.status === 404) SwalError(`Api URL: ${error.response.statusText}`)
                            }
                        } else {
                            SwalError('Something went wrong!')
                        }
                    });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Success tambah data',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }

    componentDidMount() {

    }
    render() {
        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }
        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <FontAwesomeIcon icon={faUser} /> Tambah Contact
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={this.onSubmit}>
                            <p>Field with (<span style={{ color: 'red' }}>*</span>) is required.</p>
                            <FormGroup>
                                <Label for="firstName">First Name</Label> <span style={{ color: 'red' }}>*</span>
                                <Input type="text" name="firstName" id="firstName" value={this.state.add.firstName} onChange={this.onChange} placeholder="First name" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label> <span style={{ color: 'red' }}>*</span>
                                <Input type="text" name="lastName" id="lastName" value={this.state.add.lastName} onChange={this.onChange} placeholder="Last name" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="age">Age</Label> <span style={{ color: 'red' }}>*</span>
                                <Input type="number" min={0} name="age" id="age" value={this.state.add.age} onChange={this.onChange} placeholder="Age" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="photo">Photo</Label> <span style={{ color: 'red' }}>*</span>
                                <Input type="text" name="photo" id="photo" value={this.state.add.photo} onChange={this.onChange} placeholder="Link to Profile Pic" required/>
                            </FormGroup>
                            <FormGroup>
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-primary">
                                        <FontAwesomeIcon icon={faSave} /> Simpan
                                    </button> <BtnBack />
                                </div>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </>
        )
    }
}
export default AddContact;