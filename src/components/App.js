import "./App.css";
import Album from "./Album";
import { useEffect, useState } from "react";

function App() {
  // All Records

  const [albums, setAlbums] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState({});
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        console.log("1");
        setAlbums(data);
        console.log("Albums in loop ", albums);
      });
  }, []);

  // Add Album

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

  // Update Album

  const updateAlbum = (id, userId, title) => {
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
        console.log("Updated data : ", data);
        const newArray = albums.map((item) => {
          if (item.id === id) {
            item.userId = userId;
            item.title = title;
          }
        });
        setAlbums(newArray);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("id : ", userId);
    console.log("title : ", title);
    if (userId !== "" && title !== "") {
      if (edit) {
        console.log("Eddit :", edit);
        updateAlbum(edit.id, edit.userId, edit.title);
        setEdit({});
      } else {
        addAlbum();
      }
      setTitle("");
      setUserId("");
    }
  };

  // Fetch single record
  // fetch("https://jsonplaceholder.typicode.com/albums/101")
  //   .then((response) => response.json())
  //   .then((json) => console.log("getting record: 1", json));

  // Update record

  return (
    <div className="App">
      <div className="heading">
        <h1>Albums App using ReactJS</h1>
      </div>
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
      {albums.map((item, index) => {
        // console.log("Item : ", item);
        return (
          <Album
            item={item}
            albums={albums}
            setAlbums={setAlbums}
            key={`album-${item.id}`}
            setTitle={setTitle}
            setUserId={setUserId}
            userId={userId}
            title={title}
            edit={edit}
            setEdit={setEdit}
          />
        );
        // return (

        // );
      })}
      {/* <Album />
      <Album />
      <Album />
      <Album />
      <Album />
      <Album />
      <Album /> */}
    </div>
  );
}

export default App;
