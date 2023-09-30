import React, { useState } from 'react';
import { ActionFunctionArgs, LinksFunction, MetaFunction, json, redirect } from '@remix-run/node';

import NewNote from '~/components/NewNote';
import NoteList from '~/components/NoteList';
import { Note, getStoredNotes, storeNotes } from '~/data/notes';
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { ShowNoteFull } from '~/components/ShowNoteFull';
import pkg from '@material-tailwind/react';
const { Card, CardBody } = pkg;


export const meta: MetaFunction = () => {
    return [
        {charset: 'utf-8'},
        {title: 'Notes'},
        {
            name: 'Notes',
            description: 'FF On Notes App. A simple note taking app built with Remix.'
        },
        {viewport: 'width=device-width, initial-scale=1'}
    ]
}

// when a post is successful, we redirect to the action function
export const action = async ({request}: ActionFunctionArgs) => {

    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    // const noteData = {
    //     title: formData.get('title') as string,
    //     content: formData.get('content') as string
    // }

    if (noteData.title.toString().trim().length < 5) {
        return {message: 'Title must be at least 5 characters long'}
    }


    const existingNotes = await getStoredNotes();

    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);

    await storeNotes(updatedNotes);

    return redirect('/notes');
}

export const loader = async () => {
    const notes = await getStoredNotes();
    // return json(notes);
    return notes;
}


const NotesPage = () => {
    const notesList = useLoaderData<typeof loader>();

    const [openFullNote, setOpenFullNote] = useState(false);
    const [openNewNote, setOpenNewNote] = useState(false);

    const [ selectedNote, setSelectedNote ] = useState(0);
    
    const handleOpenFullNote = (event: React.MouseEvent<any>) => {

        if(event.currentTarget.getAttribute('id') === null) 
            setSelectedNote(0);
        else
            setSelectedNote(parseInt(event.currentTarget.getAttribute('id')));

        setOpenFullNote(!openFullNote);
    }

    const handleOpenNewNote = () => {
        setOpenNewNote(!openNewNote);
    }

    return (
        <main className='flex justify-center'>
            <div className='justify-center w-full grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 m-4 mt-5'>
                <Card onClick={handleOpenNewNote} className='cursor-pointer bg-amber-300 hover:scale-105 transition-all duration-150'>
                    <CardBody>
                        <article>
                            <header className='flex flex-col'>
                                <span># ...</span>
                                <h2>New Note</h2>
                            </header>
                            <p>My note ...</p>
                        </article>
                    </CardBody>
                </Card>
                <NoteList notes={notesList} handleOpen={handleOpenFullNote}/>
            </div>
            <ShowNoteFull title={notesList[selectedNote].title} description={notesList[selectedNote].content} open={openFullNote} handleOpen={handleOpenFullNote} />
            <NewNote open={openNewNote} handleOpen={handleOpenNewNote} />
        </main>
    )
} 


export const ErrorBoundary = () => {
    const error = useRouteError();
  
    // Catch errors that are thrown in your app, but not explicitly handled
    // CatchBoundary
    if (isRouteErrorResponse(error)) {

        return (
            <>
                <div>
                    {/* <pre className='info-message'>{error.status}</pre> */}
                    <pre className='info-message'>{error.statusText}</pre>
                    <pre className='info-message'>{error.status + ': ' + error.data.message}</pre>
                </div>
            </>
        );
    }
  
    return (
        <div className='error'>
            <h1>App Error related to notes</h1>
            <pre>{
                'Oops! Something went wrong.'
            }</pre>
            <Link to='/'>Return home</Link>
        </div>
    );
  
  }

export default NotesPage