import React from 'react'
import { useRef, useContext } from 'react'
import {faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UpdateNote from './UpdateNote';
import DeleteNote from './DeleteNote'
import modeContext from '../context/ModeContext';
import { formatDistance } from 'date-fns'

export default function NotesItems(props) {

    const { style } = useContext(modeContext)
    const updateref = useRef(null)
    const deleteref = useRef(null)

    const handleDeletePreviewClick = () => {
        deleteref.current.click()
    }
    const handleUpdatePreviewClick = () => {
        updateref.current.click()
    }

    return (
        <>
            <button hidden type="button" ref={updateref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#UpdateModal${props.id}`}>
            </button>
            <UpdateNote id={props.id} title={props.title} body={props.body}></UpdateNote>

            <button hidden type="button" ref={deleteref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#DeleteModal">
            </button>
            <DeleteNote id={props.id} ></DeleteNote>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            <div className="card card-body" key={props.id} style={{ background: style === 'light' ? 'white' : 'dimgrey', color: style === 'light' ? 'black' : 'whitesmoke' }}>
                <span className="side-stick"></span>
                <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Go for lunch">{props.title}</h5>
                <p className={`note-date font-12 text-muted-${style === 'light' ? 'dark' : 'light'}`}> {formatDistance(
                    new Date(props.time),
                    new Date(),
                    { addSuffix: true }
                )}</p>
                <div className="note-content">
                    <p className={`note-inner-content text-muted-${style === 'light' ? 'dark' : 'light'}`} data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">{props.body.slice(0, 50)}...</p>
                </div>
                <div className="d-flex align-items-center">
                    <span className="mr-1"><button type='submit' onClick={handleUpdatePreviewClick} style={{ border: "None", background: "None" }}><FontAwesomeIcon icon={faPenToSquare} /></button></span>
                    <span className="mr-1"><button type='submit' onClick={handleDeletePreviewClick} style={{ border: "None", background: "None" }}><i className="fa fa-trash remove-note"  ></i></button></span>
                    <div className="ml-auto">
                    </div>
                </div>
            </div>
        </>
    )
}
