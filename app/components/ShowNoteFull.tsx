import React, { FC } from "react";
import pkg from '@material-tailwind/react';
const { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Textarea } = pkg;

interface Props {
    title: string;
    description: string;
    open: boolean;
    handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ShowNoteFull: FC<Props> = ({title, description, open, handleOpen}) => {
    return (
        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader>{title}</DialogHeader>
            <DialogBody divider>
                <Textarea defaultValue={description} resize label="Content" id="content" name="content" rows={5} />
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
  }