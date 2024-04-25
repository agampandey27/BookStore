import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error Occurred", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      {Loading ? (
        <Spinner />
      ) : (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Create New Book
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="publishYear"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Publish Year:
            </label>
            <input
              type="text"
              id="publishYear"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            onClick={handleSaveBook}
            disabled={Loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
          >
            {Loading ? "Creating..." : "Create Book"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateBook;
