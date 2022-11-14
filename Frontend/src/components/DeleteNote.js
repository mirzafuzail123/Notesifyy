import React from 'react'
import noteContext from '../context/NoteContext'
import { useContext , useRef} from 'react'
import modeContext from '../context/ModeContext'
import AlertContext from '../context/AlertContext'

export default function DeleteNote(props) {

    const {deleteNote}=useContext(noteContext)
    const {style} = useContext(modeContext)
    const {showAlert} = useContext(AlertContext)
    const closeref = useRef(null)

    const handleDeleteClick=()=>{
        deleteNote(props.id)
        closeref.current.click()
        showAlert('Note has been deleted successfully' , 'success')

    }
  return (
    <div>
        <div className="modal fade" id="DeleteModal" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content" style={{background:style==='light'?'white':'black' , color:style!=='light'?'whitesmoke':'black'}}>
      <div className="modal-header">
        <h5 className="modal-title" id="DeleteModalLabel" style={{color:style==='light'?'black':'whitesmoke'}}>Are you sure?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ backgroundColor:'white'}}></button>
      </div>
      {/* <div className="modal-body">
      </div> */}
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={closeref} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" onClick={handleDeleteClick} >Delete</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
