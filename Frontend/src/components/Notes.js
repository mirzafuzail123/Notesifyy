import React, { useEffect, useContext, useRef } from 'react'
import NotesItems from './NotesItems'
import Navbar from './Navbar';
import AddNote from './AddNote';
import Alerts from './Alerts';
import noteContext from '../context/NoteContext';
import modeContext from '../context/ModeContext';
import AlertContext from '../context/AlertContext';
import { useNavigate } from 'react-router-dom';
export default function Notes() {

  const navigate=useNavigate()
  const { allnotes, fetchNotes , userProfile  } = useContext(noteContext)
  const {style } = useContext(modeContext)
  const {alert} = useContext(AlertContext)

 
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token'))&&allnotes!=='undefined'){
    fetchNotes()
    userProfile()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line 
  }, [])
  const ref = useRef(null)
  const addNotePreview = async () => {
    ref.current.click()

  }

  const NoNotes = () => {
    return (
      <div className='container text-center' style={{ marginTop: "200px" }}>
        <h4 style={{ color: "gray" }}>No notes to display</h4>
      </div>
    )
  }


  return (
    JSON.parse((localStorage.getItem('token'))&&allnotes!=='undefined')&&<div>
      <Navbar addNote={addNotePreview} />
      <Alerts alert={alert}></Alerts>
      <button hidden type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddNote">
      </button>
      <AddNote/>


      <h1 className='text-center my-5' style={{color: style==='light'?'black':'white' , fontFamily:"cursive",fontSize:"xxx-large"}} >Let's note it</h1>
      <div className='container my-5'>
        <div className="row">
          {allnotes.length===0?NoNotes() : allnotes.map((post) => {
            return (        
            <div className="col-md-4 single-note-item all-category note-important my-3">
            <NotesItems key={post.id}  title={post.title} body={post.body} id={post.id} time={post.updated} />
          </div>
          )})}
          </div>
        </div>

    </div>
  )
}
