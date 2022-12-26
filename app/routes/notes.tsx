import NewNote,{links as newNoteLinks } from "~/components/NewNote"

export default function notes(){
    return (<main>
        <NewNote/>
        </main>)
}
export function action(){
    
}
export function links(){
    return [...newNoteLinks()]
}