import NoteCard from './NoteCard';
import type INote from './INote';

interface NotesListProps {
  notes: INote[],
  onDelete: (id: string) => void
}

function NotesList({ notes, onDelete }: NotesListProps) {
  return (
    <div className="crud__list">
      {notes.map(n => (
        <NoteCard key={n.id} note={n} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NotesList;