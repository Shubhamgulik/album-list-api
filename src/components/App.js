import "./App.css";
import Album from "./Album";
import { useEffect, useState } from "react";

function App() {
  // Creating hooks
  const [albums, setAlbums] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState({});

  // Fetch All Records for the initial render
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      });
  }, []);

  // Add Album to albums
  const addAlbum = () => {
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        title,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.id = albums.length + 1;
        const newArray = [data, ...albums];
        setAlbums(newArray);
        console.log("Added record2: ", data);
      });
    return;
  };

  // Update Album with given id
  const updateAlbum = (id) => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id,
        userId,
        title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const index = albums.findIndex((item) => item.id === id);
        const newArray = [...albums];
        newArray[index] = { id, userId, title };
        setAlbums(newArray);
      });
  };

  // method to handle the submit action to check whether it is an update or new album
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userId !== "" && title !== "") {
      if (JSON.stringify(edit) !== "{}") {
        updateAlbum(edit.id);
        setEdit({});
      } else {
        addAlbum();
      }
      setTitle("");
      setUserId("");
    }
  };

  return (
    <div className="App">
      {/* Heading of the app */}
      <div className="heading">
        <h1>Albums App using ReactJS</h1>
      </div>
      {/* Form to Add new or update album */}
      <div className="form">
        <form className="input__form" action="" method="post">
          <input
            type="text"
            placeholder="UserId"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          />
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            className="submit__button"
            type="submit"
            onClick={handleSubmit}
          />
        </form>
      </div>

      {/* traverse each album and pass props to Album card */}
      {albums.map((item, index) => {
        return (
          <Album
            item={item}
            albums={albums}
            setAlbums={setAlbums}
            key={`${item.title}-${item.id}`}
            setTitle={setTitle}
            setUserId={setUserId}
            userId={userId}
            title={title}
            edit={edit}
            setEdit={setEdit}
          />
        );
      })}
    </div>
  );
}

export default App;
