import Cookies from "js-cookie";
import React, { useState } from "react";
import { Button, Form, Input, Segment, TextArea } from "semantic-ui-react";

export default function Note({
  initialTitle,
  initialContent,
  initialPinned,
  allowArchive,
  allowAdd,
  allowSave,
  allowPin,
  getNotes,
  id,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [pinned, setPinned] = useState(initialPinned);
  const [archived, setArchived] = useState(false);

  const addNote = async () => {
    try {
      const response = await fetch("api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({ title, content, pinned }),
      });
      if (response.ok) getNotes();
    } catch (reason) {
      console.log(reason);
    } finally {
      setTitle("");
      setContent("");
      setPinned(false);
    }
  };

  const putPin = async (changePinned) => {
    try {
      const response = await fetch(`api/notes/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({ title, content, pinned: changePinned, archived }),
      });
      if (response.ok) getNotes();
    } catch (reason) {
      console.log(reason);
    }
  };

  const putArchive = async () => {
    try {
      const response = await fetch(`/api/notes/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({ title, content, pinned, archived: true }),
      });
      if (response.ok) getNotes();
    } catch (reason) {
      console.log(reason);
    }
  };

  return (
    <Segment>
      <Form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 0 1em",
          }}
        >
          <Input
            style={{ minWidth: "0" }}
            className="title-input"
            size="huge"
            value={title}
            onChange={(e, { value }) => setTitle(value)}
            placeholder="Title"
            transparent
          />
          <div
            style={{
              minWidth: "129px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {allowArchive ? (
              <Button
                icon="archive"
                circular
                basic
                style={{ marginRight: "0.5em" }}
                onClick={() => {
                  setArchived(true);
                  putArchive();
                }}
              />
            ) : null}
            {allowSave ? <Button icon="save" circular basic style={{ marginRight: "0.5em" }} /> : null}
            {allowPin ? (
              <Button
                icon="pin"
                basic={pinned ? false : true}
                circular
                style={{ marginRight: "0.5em" }}
                onClick={() => {
                  setPinned(!pinned);
                  putPin(!pinned);
                }}
              />
            ) : null}

            {allowAdd ? <Button icon="add" basic circular onClick={addNote} /> : null}
          </div>
        </div>
        <Form.Field>
          <TextArea
            value={content}
            onChange={(e, { value }) => setContent(value)}
            style={{
              border: "rgba(0,0,0,0)",
              padding: "0em",
            }}
            placeholder="Take a note"
          />
        </Form.Field>
      </Form>
    </Segment>
  );
}
