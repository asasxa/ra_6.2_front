import { useState, type FormEvent } from 'react';

interface NotesFormProp {
  isLoading: boolean,
  requestToAddNote: (content: string) => void
}

function NotesForm({ isLoading, requestToAddNote }: NotesFormProp) {
  const [ value, setValue ] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && value.trim()) {
      requestToAddNote(value);
      setValue('');
    }
  };

  return (
    <form className="crud__form" onSubmit={onSubmit}>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        maxLength={3000}
        placeholder="Новая заметка..."
        required
      />
      <button className="material-symbols-outlined">line_end_arrow_notch</button>
    </form>
  );
}

export default NotesForm;