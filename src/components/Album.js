import React from "react";
import "./Album.css";
function Album({
  item,
  albums,
  setAlbums,
  setTitle,
  setUserId,
  userId,
  title,
  setEdit,
}) {
  const deleteAlbum = (e) => {
    console.log("In delete");
    fetch("https://jsonplaceholder.typicode.com/albums/1", {
      method: "DELETE",
    });
    const newArray = albums.filter((album) => album.id != e.target.value);
    console.log("new Array: ", newArray);
    setAlbums(newArray);
  };

  const editAlbum = () => {
    console.log("in update", item.userId);

    setUserId(item.userId);
    setTitle(item.title);
    setEdit(item);
  };
  return (
    <div className="album" key={`${item.title}-${item.id}`}>
      <h4>Title: {item.title}</h4>
      <h4>UserId: {item.userId}</h4>
      <button className="edit__button" onClick={editAlbum}>
        Edit
      </button>
      <button
        className="delete__button"
        placeholder={item.id}
        value={item.id}
        onClick={deleteAlbum}
      >
        Delete
      </button>
    </div>
  );
}

export default Album;
