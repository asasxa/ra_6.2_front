import type INote from './INote';

interface NoteCardProps {
  note: INote,
  onDelete: (id: string) => void
}

function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div key={note.id} className="crud__item">
      <p>{note.content}</p>
      <button className="material-icons" onClick={() => onDelete(note.id)}>close</button>
    </div>
  );
}

export default NoteCard;