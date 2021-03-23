import { faArrowLeft, faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import { uAPI } from '../Utils/config';
import { SwalError, SwalErrorThen } from '../Utils/func';

class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: {
                id: '',
                firstName: '',
                lastName: '',
                age: '',
                photo: '',
            },
            loading: true,
            redirect: false,
        }
        this.setRedirect = this.setRedirect.bind(this);
        this.getData = this.getData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    async setRedirect() {
        await this.setState({ redirect: true })
    }
    async getData() {
        await axios.get(`${uAPI}/contact/${this.props.id}`)
            .then(function (response) {
                return response.data;
            })
            .then(response => {
                // console.log(response);
                this.setState({
                    edit: response.data,
                    loading: false,
                });
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    if (error.response.status) {
                        console.log(error.response)
                        SwalErrorThen(error.response.data.message, this.setRedirect)
                        if (error.response.status === 500) SwalErrorThen(error.response.data, this.setRedirect)
                        if (error.response.status === 404) SwalErrorThen(`Api URL: ${error.response.statusText}`, this.setRedirect)

                    }
                } else {
                    SwalErrorThen('Something went wrong!', this.setRedirect)
                }
            });
    }
    onChange(e) {
        let newedit = { ...this.state.edit };
        newedit[e.target.name] = e.target.value;
        this.setState({
            edit: newedit
        });
    }
    onSubmit(e) {
        e.preventDefault();
        // console.log('submit', this.state.edit)
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
                return axios.put(`${uAPI}/contact/${this.state.edit.id}`, {
                    firstName: this.state.edit.firstName,
                    lastName: this.state.edit.lastName,
                    age: this.state.edit.age,
                    photo: this.state.edit.photo,
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
                    text: 'Success edit data',
                    icon: 'success',
                    allowOutsideClick: false,
                }).then(() => this.setState({ redirect: true }))
            }
        })
    }

    componentDidMount() {
        this.getData()
        // "data": [
        //     {
        //       "id": "93ad6070-c92b-11e8-b02f-cbfa15db428b",
        //       "firstName": "Bilbo",
        //       "lastName": "Baggins",
        //       "age": 111,
        //       "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
        //     },
        //     {
        //       "id": "b3abd640-c92b-11e8-b02f-cbfa15db428b",
        //       "firstName": "Luke",
        //       "lastName": "Skywalker",
        //       "age": 20,
        //       "photo": "N/A"
        //     },
        //     {
        //       "firstName": "asd",
        //       "lastName": "asd",
        //       "age": 20,
        //       "photo": "qw",
        //       "id": "194a1730-8bf0-11eb-9558-732a44de4044"
        //     },
        //     {
        //       "firstName": "asd",
        //       "lastName": "asd",
        //       "age": 1,
        //       "photo": "dsa",
        //       "id": "5291c970-8bf0-11eb-9558-732a44de4044"
        //     },
        //     {
        //       "firstName": "bayu",
        //       "lastName": "agung123",
        //       "age": 22,
        //       "photo": "edited",
        //       "id": "63a5edd0-8bf1-11eb-9558-732a44de4044"
        //     }
        //   ]
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
                            <FontAwesomeIcon icon={faUser} /> Edit Contact
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            this.state.loading ? (
                                <div className="text-center" >
                                    <Loader type="Bars" color="#00BFFF" height={60} width={100} />
                                        Loading ...
                                </div>
                            ) : (
                                <Form onSubmit={this.onSubmit}>
                                    <p>Field with (<span style={{ color: 'red' }}>*</span>) is required.</p>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label> <span style={{ color: 'red' }}>*</span>
                                        <Input type="text" name="firstName" id="firstName" value={this.state.edit.firstName} onChange={this.onChange} placeholder="First name" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label> <span style={{ color: 'red' }}>*</span>
                                        <Input type="text" name="lastName" id="lastName" value={this.state.edit.lastName} onChange={this.onChange} placeholder="Last name" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="age">Age</Label> <span style={{ color: 'red' }}>*</span>
                                        <Input type="number" min={0} name="age" id="age" value={this.state.edit.age} onChange={this.onChange} placeholder="Age" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="photo">Photo</Label> <span style={{ color: 'red' }}>*</span>
                                        <Input type="text" name="photo" id="photo" value={this.state.edit.photo} onChange={this.onChange} placeholder="Link to Profile Pic" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <button type="submit" className="btn btn-primary">
                                                <FontAwesomeIcon icon={faSave} /> Simpan
                                    </button> <Link to='/' className='btn btn-warning'>
                                                <FontAwesomeIcon icon={faArrowLeft} /> Kembali
                                    </Link>
                                        </div>
                                    </FormGroup>
                                </Form>
                            )
                        }
                    </CardBody>
                </Card>
            </>
        )
    }
}
export default EditContact;