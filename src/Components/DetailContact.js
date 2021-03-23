import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, } from 'reactstrap';
import { uAPI } from '../Utils/config';
import { SwalErrorThen } from '../Utils/func';

class DetailContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {
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
                    detail: response.data,
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
    componentDidMount() {
        // console.log(this.props)
        this.getData();
    }
    render() {
        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <FontAwesomeIcon icon={faUser} /> Detail Contact
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
                                <>
                                    <div className='text-center'>
                                        <img src={this.state.detail.photo} alt="img" style={{width: '120px',height:'120px', borderRadius:'100%', marginBottom:'20px'}} />
                                        <div>
                                            <h5 style={{fontWeight:'600'}}>{`${this.state.detail.firstName} ${this.state.detail.lastName}`}</h5>
                                            <p>{this.state.detail.age}</p>
                                            <h6>{this.state.detail.id}</h6>
                                        </div>
                                    </div>
                                    <Link to='/' className='btn btn-warning'>
                                        <FontAwesomeIcon icon={faArrowLeft} /> Kembali
                                    </Link>
                                </>
                            )
                        }
                    </CardBody>

                </Card>
            </>
        )
    }
}
export default DetailContact;