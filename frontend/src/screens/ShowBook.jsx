import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

function ShowBook() {
  const [book, setBook] = useState({});
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-alpha-eight.vercel.app${id}`)
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
    <div>
      <h1 className="text-3xl text-blue-600 flex justify-center mt-7">
        Book Details
      </h1>
      {Loading ? (
        <Spinner />
      ) : (
        <div className="relative">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg mx-auto z-10">
              <button className="absolute top-0 right-0 text-gray-600 hover:text-gray-800 p-4">
                <Link to="/">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </button>
              <div className="p-4 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  {book.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <p className="text-sm md:text-base text-gray-600 font-semibold">
                      Author:
                    </p>
                    <p className="text-sm md:text-base text-gray-900 ml-2">
                      {book.author}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm md:text-base text-gray-600 font-semibold">
                      Publish Year:
                    </p>
                    <p className="text-sm md:text-base text-gray-900 ml-2">
                      {book.publishYear}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm md:text-base text-gray-600 font-semibold">
                      Book ID:
                    </p>
                    <p className="text-sm md:text-base text-gray-900 ml-2">
                      {book._id}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm md:text-base text-gray-600 font-semibold">
                      Create Time:
                    </p>
                    <p className="text-sm md:text-base text-gray-900 ml-2">
                      {new Date(book.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm md:text-base text-gray-600 font-semibold">
                      Last Updated:
                    </p>
                    <p className="text-sm md:text-base text-gray-900 ml-2">
                      {new Date(book.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
                <Link to={`/books/edit/${id}`}>
                  <button className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg border border-blue-600 mr-2">
                    Edit
                  </button>
                </Link>
                <button className="text-red-600 hover:text-red-800 px-4 py-2 rounded-lg border border-red-600">
                  <Link to={`/books/delete/${id}`}>Delete</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;
