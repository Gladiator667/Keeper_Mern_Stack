import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import {Navigate} from 'react-router-dom';
import Blogs from "./Blogs";
import Createnote from "./Createnote";
function Dashboard() {
    const [user, setUser] = useState(" ");
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [show, setShow] = useState(""); 
    const callBackend = async ()=> {
        try{
            const response = await fetch('/api/dashboard', {
                method: 'GET', 
                headers: {
                    Accept: "applications/json",
                    "Content-Type": "application/json"
                }, 
                credentials: "include"
            })

            const data = await response.json();
            setUser(data.user);
            setBlogs(data.user.blogs)
        } catch (error){
            setError(error);
        }
    }


    useEffect(() => {
        callBackend();
    }, [])

    async function addNote() {
        callBackend();
    }

    async function deleteNote(id) {
        try{
            const response = await fetch(`/api/deletenote/${id}`, {method: 'DELETE'})
            const data = await response.json();
            if(data.status === 200){   
                callBackend();
            }
        } catch (error){
            setError(error);
        }
    }

    return (user?
    <>
    {error && show && <Alert variant='danger' onClose={() => setShow(false)} dismissible>{error}</Alert>}
    <Createnote onAdd={addNote} userId={user._id}></Createnote>
    {blogs.map((blog) => {
        return(
            <Blogs key={blog._id} id={blog._id} title={blog.heading} body={blog.body} onDelete={deleteNote}/>
        );
    })}</>:
    <Navigate to="/login"></Navigate>
    );
    
}

export default Dashboard;