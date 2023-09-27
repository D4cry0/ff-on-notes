import React from 'react';
import { Link, useLoaderData } from '@remix-run/react'

import { Note, getStoredNotes } from '~/data/notes';
import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';


export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        {charset: 'utf-8'},
        {title: data?.title || 'Notes'},
        {
            name: data?.title || 'Notes',
            description: data?.content || 'FF On Notes App. A simple note taking app built with Remix.'
        },
        {viewport: 'width=device-width, initial-scale=1'}
    ]
}

export async function loader({ params }: LoaderFunctionArgs) {

    const notes: Note[] = await getStoredNotes();
    const selectedNote = notes.find(note => note.id === params.noteId);


    if (!selectedNote) {
        throw json(
            { message: 'Note not found'},
            { status: 404}
        ); 
    }

    return selectedNote;
}

const $noteId = () => {
    const selectedNote = useLoaderData<typeof loader>();

    return (
        <main id='note-details'>
            <header>
                <nav>
                    <Link to='/note'>Back to all notes</Link>
                </nav>
                <h1>{selectedNote.title}</h1>
            </header>
            <p id='note-details-content'>{selectedNote.content}</p>
        </main>
    )
}

export default $noteId