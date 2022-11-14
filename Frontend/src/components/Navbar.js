import React , {useContext} from 'react'
import { faAdd , faMoon, faSun ,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link , useNavigate} from 'react-router-dom';
import modeContext from '../context/ModeContext';
import noteContext from '../context/NoteContext';
export default function Navbar(props) {

  const { addNote } = props
  const {style , toggleMode} = useContext(modeContext)
  const {userInfo} = useContext(noteContext)
  const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem('token' )
    localStorage.removeItem('rtoken' )
    localStorage.removeItem('user' )
    navigate('/login')
  }

  

  return (
    <>

    <nav className={` navbar navbar-expand-lg bg-${style} navbar-${style}`} >
        <div className="container-fluid w-100">
          <Link className="navbar-brand" to="/" style={{ marginLeft: "50px" , fontSize:"xx-large" , fontFamily:"cursive" }}>Notesify</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

            </ul>
            <ul className="navbar-nav w-100 justify-content-center">
                <li className="nav-item active">
                <button type="button" onClick={addNote} className={`d-flex btn btn-outline-${style==='light'?'dark':'light'}`} >Add note  <FontAwesomeIcon icon={faAdd} style={{margin:"auto" , marginLeft:"4px" , color:style==='light'?'grey':'white'}} /></button>
                </li>
                </ul>
    
            <ul className="navbar-nav ms-auto">

            <li className='nav-item'>
                  <h4 style={{fontFamily:"cursive" , color:style==='light'?'black':'white'}}><nobr>Welcome {userInfo.name}</nobr></h4>
                </li>           
                
                 <li className="nav-item">
            <div className="form-check form-switch " style={{marginLeft:"5px"}}>
                <button className="form-input" onClick={toggleMode}  id="flexSwitchCheckDefault" style={{border:'None' , backgroundColor:style==='light'?'whitesmoke':'black' , color:style==='light'?'black':'white' , marginRight:"40px" , fontSize:"x-large"}}>{style==='light'?<FontAwesomeIcon icon={faMoon} />:<FontAwesomeIcon icon={faSun} />}</button>
              </div>
                </li>

                <li className='nav-item'>
                <button type="button"  onClick={handleLogout}  className={`d-flex btn btn-outline-${style==='light'?'dark':'light'}`} style={{marginRight:"20px"}} >Logout </button>
                </li>  

                </ul>           
          </div>
        </div>
      </nav>
    </>
  )
}
