import React from 'react';
import { ActionFunctionArgs, LinksFunction, MetaFunction, json, redirect } from '@remix-run/node';

import NewNote from '~/components/NewNote';
import NoteList from '~/components/NoteList';
import { Note, getStoredNotes, storeNotes } from '~/data/notes';
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';

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

    return (
        <main>
            <NewNote />
            <NoteList notes={notesList} />
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
                <NewNote />
                <div>
                    {/* <pre className='info-message'>{error.status}</pre> */}
                    {/* <pre className='info-message'>{error.statusText}</pre> */}
                    <pre className='info-message'>{error.status + ': ' + error.data.message}</pre>
                </div>
            </>
        );
    }
  
    return (
        <div className="error">
            <h1>App Error related to notes</h1>
            <pre>{
                'Oops! Something went wrong.'
            }</pre>
            <Link to="/">Return home</Link>
        </div>
    );
  
  }

export default NotesPage