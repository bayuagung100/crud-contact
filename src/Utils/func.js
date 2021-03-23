import React from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, useHistory } from 'react-router-dom';



const $ = require('jquery');
$.Datatable = require('datatables.net-bs4');

export function BtnBack() {
    let history = useHistory();
    return (
        <button type="button"  className="btn btn-warning" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft}/> Batal
        </button>
    );
}

function DtDefault(props) { //type=default
    return (
        <>
            <div className='btn-group'>
                <button type="button" className="btn btn-success btn-sm" onClick={() => props.handleAksi('detail', props.id)} > <FontAwesomeIcon icon={faEye} /> Detail</button> <button type="button" className="btn btn-warning btn-sm" onClick={() => props.handleAksi('edit', props.id)} > <FontAwesomeIcon icon={faEdit} /> Edit</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => props.handleAksi('delete', props.id)} > <FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>

        </>
    )
}
function DtDetailDelete(props) { //type=detail-delete
    return (
        <>
            <div className='btn-group'>
                <button type="button" className="btn btn-success btn-sm" onClick={() => props.handleAksi('detail', props.id)} > <FontAwesomeIcon icon={faEye} /> Detail</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => props.handleAksi('delete', props.id)} > <FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>
        </>
    )
}
function DtEditDelete(props) { //type=edit-delete
    return (
        <>
            <div className='btn-group'>
                <button type="button" className="btn btn-warning btn-sm" onClick={() => props.handleAksi('edit', props.id)} > <FontAwesomeIcon icon={faEdit} /> Edit</button> <button type="button" className="btn btn-danger btn-sm" onClick={() => props.handleAksi('delete', props.id)} > <FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>
        </>
    )
}
function DtDetail(props) { //type=detail
    return (
        <>
            <button type="button" className="btn btn-success btn-sm" onClick={() => props.handleAksi('detail', props.id)} > <FontAwesomeIcon icon={faEye} /> Detail</button>
        </>
    )
}
function DtDelete(props) { //type=delete
    return (
        <>
            <div className='btn-group'>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => props.handleAksi('delete', props.id)} > <FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>
        </>
    )
}


export async function ReloadDt(id) {
    // console.log('reload dt')
    return $(`#${id}`).DataTable().ajax.reload();
}
export async function Dt(id, url, columns = [], aksi = true, type = 'default', handleAksi) {
    let newColumns = []
    if (columns.length > 0) await columns.forEach(el => {
        newColumns.push(el)
    });
    // console.log('columns', columns)
    let columnDefs
    if (aksi) {
        // await newColumns.push({ title: "Aksi" })
        if (type === 'default') {
            columnDefs = [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            {<DtDefault id={cellData} handleAksi={handleAksi} />}
                        </BrowserRouter>, td),
            }]
        } else if (type === 'detail-delete') {
            columnDefs = [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            {<DtDetailDelete id={cellData} handleAksi={handleAksi} />}
                        </BrowserRouter>, td),
            }]
        } else if (type === 'edit-delete') {
            columnDefs = [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            {<DtEditDelete id={cellData} handleAksi={handleAksi} />}
                        </BrowserRouter>, td),
            }]
        } else if (type === 'detail') {
            columnDefs = [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            {<DtDetail id={cellData} handleAksi={handleAksi} />}
                        </BrowserRouter>, td),
            }]
        } else if (type === 'delete') {
            columnDefs = [{
                targets: -1,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            {<DtDelete id={cellData} handleAksi={handleAksi} />}
                        </BrowserRouter>, td),
            }]
        }
    }
    return await $(`#${id}`).DataTable({
        order: [[0, "desc"]],
        processing: true,
        ajax: url,
        columns: newColumns,
        columnDefs: [
            ...columnDefs,
            { 
                //photo
                targets: -2,
                createdCell: (td, cellData, rowData, row, col) =>
                    ReactDOM.render(
                        <BrowserRouter>
                            {/* {console.log('cellData: ' + cellData)}
                            {console.log('rowData: ' + rowData)}
                            {console.log('row: ' + row)}
                            {console.log('col: ' + col)} */}
                            <img src={cellData} style={{ height: '120px' }} alt={'img'} />
                        </BrowserRouter>, td),
            }
        ],
    });
}

export function DtTable(props) {
    require('datatables.net-bs4/css/dataTables.bootstrap4.min.css');
    const id = props.id;
    return (
        <div className="table-responsive">
            <table id={id} className="table table-striped table-bordered" width="100%" >
            </table>
        </div>
    )
}

export function SwalConfirmDt(id, idTable, title, text, handleFetch, callback = { title: '', html: '' }) {
    Swal.fire({
        icon: 'warning',
        title: title,
        html: text,
        showCancelButton: true,
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        preConfirm: () => {
            return handleFetch(id);
        },

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: callback.title,
                html: callback.html,
            }).then(() => {
                ReloadDt(idTable);
            })
        }
    })

}

export function SwalError(text) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text,
        allowOutsideClick: false,
    })
}

export function SwalErrorThen(text, callback) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text,
        allowOutsideClick: false,
    }).then(()=>{
        // this.setState({redirect:true})
        return callback();
    })
}