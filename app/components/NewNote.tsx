import React from 'react';
import { LinksFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';

import newNoteStyles from './NewNote.css';

export const links: LinksFunction = () => [{ rel: "stylesheet", href: newNoteStyles }];

interface NoteErrors {
    message: string;
}

const NewNote = () => {
    const navigation = useNavigation();
    const data: NoteErrors | undefined = useActionData();

    const isSubmitting = navigation.state === 'submitting'

    return (
        <Form method="post" id="note-form">
            {data && data?.message && <p className="message">{data.message}</p>}
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows={5} required />
            </p>
            <div className="form-actions">
                <button disabled={isSubmitting}>
                    { isSubmitting ? 'Adding ... ' : 'Add Note'}
                </button>
            </div>
        </Form>
    )
}

export default NewNote
