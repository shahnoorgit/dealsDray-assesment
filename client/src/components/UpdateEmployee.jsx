import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useCreateEmployee from "../../Hooks/useCreateEmployee";
import useUpdate from "../../Hooks/useUpdate";

const UpdateEmployee = ({ offUpdate, user, item, add }) => {
  const [formData, setFormData] = useState({
    offUpdate,
    employee_id: item._id,
    employeer: user?._id,
    name: item.name,
    email: item.email,
    mobileNumber: item.mobileNumber,
    designation: item.designation,
    gender: item.gender,
    course: item.course,
    image: item.image,
  });
  console.log(formData.designation);

  const { loading, updateEmployee } = useUpdate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        if (checked) {
          return { ...prevData, course: [...prevData.course, value] };
        } else {
          return {
            ...prevData,
            course: prevData.course.filter((course) => course !== value),
          };
        }
      });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImage = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await updateEmployee(formData);
  };

  return (
    <div className=" relative overflow-auto bg-white w-[95vw] shadow-2xl rounded-md z-50 p-5 h-[85vh]">
      <div
        onClick={() => offUpdate()}
        className=" cursor-pointer absolute right-0 mr-5"
      >
        <IoIosCloseCircleOutline className=" text-xl" />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full px-3 py-1 border rounded"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full px-3 py-1 border rounded"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* mobileNumber Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="mobileNumber">
            Mobile No:
          </label>
          <input
            className="w-full px-3 py-1 border rounded"
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="designation">
            Designation:
          </label>
          <select
            className="w-full px-3 py-1 border rounded"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option className=" text-gray-500" value="">
              {formData.designation.toUpperCase()}
            </option>

            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gender:</label>
          <div className="flex items-center">
            <input
              className="mr-2"
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              required
            />
            <label className="mr-4" htmlFor="male">
              Male
            </label>
            <input
              className="mr-2"
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        {/* course */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">course:</label>
          <div className="flex flex-col">
            <div className="mb-2">
              <input
                className="mr-2"
                type="checkbox"
                id="mca"
                name="course"
                value="MCA"
                checked={formData.course.includes("MCA")}
                onChange={handleChange}
              />
              <label htmlFor="mca">MCA</label>
            </div>
            <div className="mb-2">
              <input
                className="mr-2"
                type="checkbox"
                id="bca"
                name="course"
                value="BCA"
                checked={formData.course.includes("BCA")}
                onChange={handleChange}
              />
              <label htmlFor="bca">BCA</label>
            </div>
            <div className="mb-2">
              <input
                className="mr-2"
                type="checkbox"
                id="bsc"
                name="course"
                value="BSC"
                checked={formData.course.includes("BSC")}
                onChange={handleChange}
              />
              <label htmlFor="bsc">BSC</label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Upload Image:
          </label>
          <input
            className="w-full px-3 py-1 border rounded"
            type="file"
            id="image"
            name="image"
            accept="image/jpeg, image/png"
            onChange={(e) => handleImage(e)}
          />
          {formData.image && (
            <img src={formData.image} width={200} height={100} />
          )}
        </div>

        <button
          className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-700"
          type="submit"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
