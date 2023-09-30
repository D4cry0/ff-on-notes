import React, { FC, useState } from 'react';
import { Link } from '@remix-run/react';

import pkg from '@material-tailwind/react';
const { Card, CardBody } = pkg;

import { Note } from '~/data/notes';

interface Props {
  notes: Note[];
  handleSelect: (event: React.MouseEvent<any>) => void;
}

const NoteList: FC<Props> = ({ notes, handleSelect }) => {

  return (
    <>
      {notes.map((note, index) => (
        <Card key={note.id} id={index.toString()} onClick={handleSelect} className='cursor-pointer hover:scale-105 transition-all duration-150 overflow-hidden break-words max-h-44'>
          <CardBody>
              <article>
                <header>
                  <span className="text-xs">
                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <h2>{note.title}</h2>
                </header>
                <p><small>{note.content}</small></p>
              </article>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default NoteList;