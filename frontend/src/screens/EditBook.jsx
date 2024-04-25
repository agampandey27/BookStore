import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-alpha-eight.vercel.app/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://book-store-alpha-eight.vercel.app/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book Edited", { variant: "info" });
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
            Edit Book
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
            {Loading ? "Editing..." : "Edit Book"}
          </button>
        </div>
      )}
    </div>
  );
}

export default EditBook;
