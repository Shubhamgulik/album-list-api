import React from "react";
import "./Album.css";

// Destructuring props into respective names
function Album({ item, albums, setAlbums, setTitle, setUserId, setEdit }) {
  // Method to delete a album based on ID
  const deleteAlbum = (e) => {
    fetch("https://jsonplaceholder.typicode.com/albums/1", {
      method: "DELETE",
    });
    // Getting index ob album
    const index = albums.findIndex((item) => item.id == e.target.value);

    const newArray = [...albums];
    newArray.splice(index, 1);
    setAlbums(newArray);
  };

  // Method to edit the album
  const editAlbum = () => {
    setUserId(item.userId);
    setTitle(item.title);
    setEdit(item);
  };

  return (
    // Wrapper for album card
    <div className="album" key={`${item.title}-${item.id}`}>
      <h4>Title: {item.title}</h4>
      <h4>UserId: {item.userId}</h4>
      {/* Edit button */}
      <button className="edit__button" onClick={editAlbum}>
        Edit
      </button>
      {/* Delete button */}
      <button className="delete__button" value={item.id} onClick={deleteAlbum}>
        Delete
      </button>
    </div>
  );
}

export default Album;
