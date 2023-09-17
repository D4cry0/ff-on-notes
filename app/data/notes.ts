import { json } from '@remix-run/node';
import fs from 'fs/promises';

export async function getStoredNotes() {

  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  
  if (data.notes.length < 1) {
    throw json({message: 'No notes found' }, { status: 404, statusText: 'Not Found' });
  }

  return data.notes;
}

export function storeNotes(notes: Note[]) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}

export interface Note {
  title: string;
  content: string;
  id: string;
}