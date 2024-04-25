import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import CreateBook from "./screens/CreateBook";
import DeleteBook from "./screens/DeleteBook";
import EditBook from "./screens/EditBook";
import ShowBook from "./screens/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/books/create" element={<CreateBook />} />
      <Route exact path="/books/edit/:id" element={<EditBook />} />
      <Route exact path="/books/delete/:id" element={<DeleteBook />} />
      <Route exact path="/books/details/:id" element={<ShowBook />} />
    </Routes>
  );
};

export default App;
