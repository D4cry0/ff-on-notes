import React, { FC } from "react";
import pkg from '@material-tailwind/react';
import { Form, useActionData, useNavigation } from "@remix-run/react";
const { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Textarea, Input, Typography } = pkg;

interface NoteErrors {
    message: string;
}

interface Props {
    title: string;
    description: string;
    open: boolean;
    handleOpen: () => void;
}

export const ShowNoteFull: FC<Props> = ({title, description, open, handleOpen}) => {
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
            <Form method="post" id="note-edit-form">
                <DialogHeader>{title}</DialogHeader>
                <DialogBody divider>
                    {data && data?.message && <p className="message">{data.message}</p>}
                    <div className="hidden">
                        <Input label="Title" id="title" name="title" value={title} crossOrigin={undefined}/>
                    </div>
                    <Textarea defaultValue={description} resize label="Content" id="content" name="content" rows={5} required />
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
                    <Button type="submit" variant="gradient" onClick={handleOpen}>
                        { isSubmitting ? 'Updating ... ' : 'Update Note'}
                    </Button>
                </DialogFooter>
            </Form>
        </Dialog>
    );
  }