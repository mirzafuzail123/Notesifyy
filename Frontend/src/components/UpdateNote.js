import React from 'react'
import { useRef , useState , useContext} from 'react'
import noteContext from '../context/NoteContext'
import modeContext from '../context/ModeContext'
import AlertContext from '../context/AlertContext'

export default function UpdateNote(props) {

    const refclose = useRef(null)
    const [note, setNote] = useState({id:props.id, etitle:props.title , ebody:props.body})
    const {updateNote} = useContext(noteContext)
    const {style} = useContext(modeContext)
    const { showAlert} = useContext(AlertContext)

    const Onchange=(e)=>{
        setNote({...note , [e.target.name]:e.target.value})
    }

     const handleUpdateClick=()=>{
        refclose.current.click()
        updateNote(note.id, note.etitle , note.ebody)
        showAlert('Note has been updated successfully' , 'success')
        
     }
  return (
    <div>
        <div className="modal fade" id={`UpdateModal${props.id}`} tabIndex="-1" role="dialog" aria-labelledby="UpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{background:style==='light'?'white':'black' , color:style!=='light'?'whitesmoke':'black'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="UpdateModalLabel">Update</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" style={{ border: "None" , background:'None' , color:style==='light'?'black':'whitesmoke'}} >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label" >Title</label>
                                <input required type="text" className="form-control" id="etitle" name="etitle" onChange={Onchange} defaultValue={props.title} style={{background:style==='light'?'white':'dimgrey', color:style!=='light'?'white':'black'}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label" >Description</label>
                                <textarea required className="form-control" id="ebody" name="ebody" rows="15"  onChange={Onchange} defaultValue={props.body} style={{background:style==='light'?'white':'dimgrey', color:style!=='light'?'white':'black'}} ></textarea>
                            </div>                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
                            <button  type="submit" className="btn btn-success"  onClick={handleUpdateClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
