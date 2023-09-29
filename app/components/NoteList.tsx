import React, { useState } from 'react';
import { Link } from '@remix-run/react';

import pkg from '@material-tailwind/react';
const { Card, CardBody } = pkg;

import { Note } from '~/data/notes';
import { ShowNoteFull } from './ShowNoteFull';

const NoteList = ({ notes }: { notes: Note[] }) => {

  const [open, setOpen] = useState(false);
  const [ selectedNote, setSelectedNote ] = useState(0);
 
  const handleOpen = (event: React.MouseEvent<any>) => {
    console.log(event.currentTarget.getAttribute('id'));
    setSelectedNote(parseInt(event.currentTarget.getAttribute('id')));
    setOpen(!open);
  }

  return (
    <div className='flex justify-center w-full'>
      <ul id="note-list" className='grid grid-cols-2 gap-4 mt-5'>
        {notes.map((note, index) => (
          <Card key={note.id} id={index.toString()} onClick={handleOpen}>
            <CardBody>
              <li className="note">
                {/* <Link to={note.id}> */}
                  <article>
                    <header>
                      <ul className="note-meta">
                        <li>#{index + 1}</li>
                        <li>
                          <time dateTime={note.id}>
                            {new Date(note.id).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </time>
                        </li>
                      </ul>
                      <h2>{note.title}</h2>
                    </header>
                    <p>{note.content}</p>
                  </article>
                {/* </Link> */}
              </li>
            </CardBody>
          </Card>
        ))}
      </ul>

      <ShowNoteFull title={notes[selectedNote].title} description={notes[selectedNote].content} open={open} handleOpen={handleOpen} />
    </div>
  );
}

export default NoteList;