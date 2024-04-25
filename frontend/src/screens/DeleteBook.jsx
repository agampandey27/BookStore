import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function DeleteBook() {
  const [book, setBook] = useState({});
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-alpha-eight.vercel.app/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Something Went Wrong", { variant: "error" });
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-alpha-eight.vercel.app/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      {Loading ? (
        <Spinner />
      ) : (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Delete Book
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Are you sure you want to delete the book "{book.title}"?
          </p>
          <div className="flex justify-between mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
            >
              Cancle
            </button>
            <button
              onClick={handleDeleteBook}
              disabled={Loading}
              className="bg-red-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-red-600"
            >
              {Loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteBook;
