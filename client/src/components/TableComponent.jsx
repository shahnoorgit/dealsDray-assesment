import React from "react";
import { formatDate } from "../../utils/formateDate";

const TableComponent = ({ data, handleEdit, loading, handleDelete }) => {
  return (
    <div className="overflow-auto h-screen w-screen">
      <table className="min-w-[90vw] overflow-auto bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Unique ID</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Mobile Number</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Designation</th>
            <th className="py-2 px-4 border-b">Create Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 && (
            <center>
              <h1 className=" text-2xl">no results found</h1>
            </center>
          )}
          {data.length > 0 &&
            data?.map((item) => (
              <tr key={item._id}>
                <td className="py-2 text-sm px-4 border-b">{item._id}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={item.image}
                    alt="User"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">{item.email}</td>
                <td className="py-2 px-4 border-b">{item.mobileNumber}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.gender}</td>
                <td className="py-2 px-4 border-b">{item.course}</td>
                <td className="py-2 px-4 border-b">
                  {item.designation.toUpperCase()}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(item.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-700"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
