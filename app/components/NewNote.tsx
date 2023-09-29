import React from 'react';
import { LinksFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import pkg from '@material-tailwind/react';
const { Button, Textarea, Input, Typography } = pkg;

interface NoteErrors {
    message: string;
}

const NewNote = () => {
    const navigation = useNavigation();
    const data: NoteErrors | undefined = useActionData();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className='flex justify-center w-full'>
            <Form method="post" id="note-form" className='flex flex-col gap-3 mt-5'>
                {data && data?.message && <p className="message">{data.message}</p>}
                <Typography variant="h1" color='blue-gray' className='text-center'>New Note</Typography>
                <Input label='Title' type="text" id="title" name="title" required crossOrigin={undefined} />
                <Textarea resize label="Content" id="content" name="content" rows={5} required />
                <Button type='submit' disabled={isSubmitting}>
                    { isSubmitting ? 'Adding ... ' : 'Add Note'}
                </Button>
            </Form>
        </div>
    )
}

export default NewNote

