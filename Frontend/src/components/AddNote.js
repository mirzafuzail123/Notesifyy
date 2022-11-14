import React from 'react'
import { useContext, useState , useRef } from 'react'
import noteContext from '../context/NoteContext'
import modeContext from '../context/ModeContext'
import AlertContext from '../context/AlertContext'

export default function AddNote() {
    const { addNote } = useContext(noteContext)
    const {style} = useContext(modeContext)
    const { showAlert} = useContext(AlertContext)

    const [note, setNote] = useState({ title: "", body: "" })
    const refclose = useRef(null)

    const handleOnClick = (e) => {
        if (note.title && note.body!=='') {
            refclose.current.click()
            addNote(note.title, note.body)
            let title=document.getElementById('title')
            let body=document.getElementById('body')
            title.value=''
            body.value=''
            setNote({ title: "", body: "" })
            showAlert('Note has been added successfully' , 'success')
        }

    }

    const Onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <div>

            <div className="modal fade" id="AddNote" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document" >
                    <div className="modal-content" style={{background:style==='light'?'white':'black' , color:style!=='light'?'whitesmoke':'black'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" style={{ border: "None" , background:'None' , color:style==='light'?'black':'whitesmoke'}} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label" >Title</label>
                                <input required type="text" className="form-control" id="title" name="title" onChange={Onchange}  style={{background:style==='light'?'white':'dimgrey', color:style!=='light'?'white':'black'}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label" >Description</label>
                                <textarea required className="form-control" id="body" name="body" rows="15" onChange={Onchange} style={{background:style==='light'?'white':'dimgrey', color:style!=='light'?'white':'black'}} ></textarea>
                            </div>                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
                            <button  type="submit"  className="btn btn-success"  onClick={handleOnClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
