import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

function Home() {
  const [books, setBooks] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-alpha-eight.vercel.app/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center px-4 py-6">
          <h1 className="text-3xl text-blue-600 flex justify-center">
            <Link to="/">Book List</Link>
          </h1>
          <div className="flex items-center">
            <Link
              to="/books/create"
              className="text-blue-600 hover:text-blue-800"
            >
              <MdOutlineAddBox className="text-4xl" />
            </Link>
          </div>
        </div>
        {Loading ? (
          <Spinner />
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dataTable">
            <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                  Publish Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book, index) => (
                <tr
                  key={book._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {book.publishYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Link
                        to={`/books/details/${book._id}`}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <BsInfoCircle className="text-lg" />
                      </Link>
                      <Link
                        to={`/books/edit/${book._id}`}
                        className="text-yellow-600 hover:text-yellow-800 mr-2"
                      >
                        <AiOutlineEdit className="text-lg" />
                      </Link>
                      <Link
                        to={`/books/delete/${book._id}`}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdOutlineDelete className="text-lg" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Home;
