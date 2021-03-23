import React, { Component } from 'react';
import { Redirect, } from 'react-router-dom';
import { uAPI } from '../config';
import { DtTable, Dt, SwalConfirmDt, SwalError } from '../func';
import axios from 'axios';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: this.props.path,
            idTable: this.props.id,
            columns: this.props.columns,
            endpoint: this.props.endpoint,
            aksi: this.props.aksi !== undefined ? this.props.aksi : true,
            type: this.props.type !== undefined ? this.props.type : 'default',
            redirect: '',
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAksi = this.handleAksi.bind(this);
    }
    async handleDelete(id) {
        console.log('handleDelete', id);
        await axios.delete(`${uAPI}/contact/` + String(id))
            .catch(function (error) {
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
    async handleAksi(type, id) {
        console.log("handleAksi type", type)
        console.log("handleAksi id", id)
        if (type === 'edit') {
            await this.setState({
                redirect: `${this.state.path}edit`,
                url: `${this.state.path}edit/` + id
            })
        } else if (type === 'detail') {
            await this.setState({
                redirect: `${this.state.path}detail`,
                url: `${this.state.path}detail/` + id
            })
        } else if (type === 'delete') {
            await SwalConfirmDt(id, this.state.idTable, 'Delete Data', `Are you sure ?`, this.handleDelete, { title: 'Deleted!', html: 'Data has been deleted.' });
        }
    }
    async componentDidMount() {
        // console.log(this.props)
        await Dt(this.state.idTable, this.state.endpoint, this.state.columns, this.state.aksi, this.state.type, this.handleAksi);
    }
    render() {
        if (this.state.redirect !== '') {
            // console.log('redirect', this.state.redirect)
            // console.log('url', this.state.url)
            return (<Redirect to={this.state.url} />)
        }
        return (
            <>
                <DtTable id={this.state.idTable} />
            </>
        )
    }
}
export default Index;