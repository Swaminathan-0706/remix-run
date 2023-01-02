import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote,{links as newNoteLinks } from "~/components/NewNote"
import NoteList, { links as noteListLinks } from '~/components/NoteList';

import {getStoredNotes, storeNotes} from "~/data/note"

// any get call returns this
export default function notes(){
    const notes=useLoaderData()
    return (<main>
        <NewNote/>
        <NoteList notes={notes}/>
        </main>)
}
// this function also tuns on server side to fetch any data( not on browser) 
export async function loader(){
 const notes=await getStoredNotes();
 return notes;
}
// any non-get call returns this (server side code executed to post the form action)
export async function action(data:any){
   const formData= await data.request.formData();

//    const noteData={
//     title:formData.get('title'),
//     content:formData.get('content')
//    }
// short way of assigning values to object
const noteData=Object.fromEntries(formData)
// Add Validation later

const existingNotes= await getStoredNotes();
noteData.id= new Date().toISOString();
const updatedNotes=existingNotes.concat(noteData)
await storeNotes(updatedNotes)
return redirect('/notes');
    
}
export function links(){
    return [...newNoteLinks(),...noteListLinks()]
}