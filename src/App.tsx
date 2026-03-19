import './App.css';
import { useState, useEffect } from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import type INote from './components/INote';
import createRequest from './createRequest';

const url = 'https://ra-6-2-back.onrender.com';

function App() {
  const [ notes, setNotes ] = useState<INote[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const requestToUpdateNotes = () => {
    setIsLoading(true);
    createRequest(url, 'Ошибка при загрузке заметок').then(data => {
      if (data) setNotes(data);
      setIsLoading(false);
    });
  };

  const requestToAddNote = (content: string) => {
    setIsLoading(true);
    createRequest(url, 'Ошибка при добавлении заметки',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      }
    ).then(() => requestToUpdateNotes());
  };

  const requestToDeleteNotes = (id: string) => {
    if (!window.confirm('Вы действительно хотите удалить эту заметку?')) {
      return;
    }
    setIsLoading(true);
    createRequest(`${url}/${id}`, 'Ошибка при удалении заметки',
      { method: 'DELETE' }
    ).then(() => requestToUpdateNotes());
  };

  useEffect(() => {
    requestToUpdateNotes();
  }, []);

  return (
    <div className="crud">
      <div className="crud__header">
        <h1>Notes</h1>
        <button
          className={
            (isLoading ? 'crud__update-button update' : 'crud__update-button') + ' material-icons'
          }
          onClick={requestToUpdateNotes}
          disabled={isLoading}
        >
          autorenew
        </button>
      </div>
      <NotesList notes={notes} onDelete={requestToDeleteNotes} />
      <NotesForm isLoading={isLoading} requestToAddNote={requestToAddNote} />
    </div>
  );
}

export default App;
