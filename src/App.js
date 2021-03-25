import { useEffect, useState } from "react";
import { Container, Header } from "semantic-ui-react";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await fetch("api/notes/?archived=False");
    if (response.ok) {
      setNotes(await response.json());
      return;
    }
    console.log(response.status);
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <Container style={{ padding: "2em 1em" }}>
      <Note
        initalTitle=""
        initialContent=""
        allowArchive={false}
        allowAdd={true}
        allowSave={false}
        allowPin={true}
        getNotes={getNotes}
      />
      <Header as="h5">Pinned</Header>
      <div className="notes-container">
        {notes
          .filter((note) => note.pinned === true)
          .sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified))
          .map((note) => (
            <Note
              id={note.id}
              key={note.id}
              initialTitle={note.title}
              initialContent={note.content}
              allowArchive={true}
              allowAdd={false}
              allowSave={true}
              allowPin={true}
              initialPinned={true}
              getNotes={getNotes}
            />
          ))}
      </div>
      <Header as="h5">Others</Header>
      <div className="notes-container">
        {notes
          .filter((note) => note.pinned === false)
          .sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified))
          .map((note) => (
            <Note
              id={note.id}
              key={note.id}
              initialTitle={note.title}
              initialContent={note.content}
              allowArchive={true}
              allowAdd={false}
              allowSave={true}
              allowPin={true}
              initialPinned={false}
              getNotes={getNotes}
            />
          ))}
      </div>
    </Container>
  );
}

export default App;
