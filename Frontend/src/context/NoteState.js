import NoteContext from "./NoteContext";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";

const NoteState = (props) => {



    const [allnotes, setallnotes] = useState([])

    // Fetching notes
    const fetchNotes = async () => {

        try {
            const res = await axiosInstance.get('/api/noteslist/')
            setallnotes(res.data)
        }
        catch (error) {
            setallnotes(error.data)
        }
    }

   

    // Adding Notes
    const addNote= async (title , body)=>{
        const res=await axiosInstance.post('/api/addnote/',{
            data:{
                'title':title,
                'body':body,
                'user':localStorage.getItem('user')
            }        })
        setallnotes(allnotes.concat(res.data))
    }

    //Deleting Notes
    const deleteNote=async (id)=>{
        await axiosInstance.delete(`/api/rudnote/${id}`)
            const NewNote=allnotes.filter((note)=>{return note.id!==id})
            setallnotes(NewNote)        
    }
    

    //Update Notes
    const updateNote=async (id , title , body)=>{  
        await axiosInstance.put(`/api/rudnote/${id}`,{
            data:{
                'id':id,
                'title':title,
                'body':body,
                'user':localStorage.getItem('user')
            }
        })
        
        // Lgic to dispay updated data
        fetchNotes()
    }

    const [userInfo, setuserInfo] = useState({name:'' , email:""})
    const userProfile=async ()=>{
        const res=await axiosInstance.get('/api/profile/')
        setuserInfo({
            name:res.data.name,
            email:res.data.email
        })
    }


    return (
        <NoteContext.Provider value={{ allnotes, fetchNotes , addNote , deleteNote , updateNote , userProfile , userInfo }}>
            {props.children}
        </NoteContext.Provider>
        )
}

export default NoteState;