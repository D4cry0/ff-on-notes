import React, { FC } from 'react';
import { LinksFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import pkg from '@material-tailwind/react';
const { Button, Textarea, Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } = pkg;

interface NoteErrors {
    message: string;
}

interface Props {
    open: boolean;
    handleOpen: () => void;
}

const NewNote: FC<Props> = ({open, handleOpen}) => {
    const navigation = useNavigation();
    const data: NoteErrors | undefined = useActionData();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <Form method="post" id="note-form">
                    <DialogHeader>New Note</DialogHeader>
                    <DialogBody divider>
                        <div className='flex flex-col justify-center gap-3 w-full'>
                                {data && data?.message && <p className="message">{data.message}</p>}
                                <Input label='Title' type="text" id="title" name="title" required crossOrigin={undefined} />
                                <Textarea resize label="Content" id="content" name="content" rows={5} required />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="gray"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button type='submit' disabled={isSubmitting} variant="gradient" onClick={handleOpen}>
                            { isSubmitting ? 'Adding ... ' : 'Add Note'}
                        </Button>
                    </DialogFooter>
                </Form>
        </Dialog>
    )
}

export default NewNote

