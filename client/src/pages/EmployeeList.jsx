import React, { useCallback, useEffect, useState } from "react";
import CreateEmployee from "../components/CreateEmployee";
import TableComponent from "../components/TableComponent";
import useCreateEmployee from "../../Hooks/useCreateEmployee";
import useFetchallemp from "../../Hooks/useFetchallemp";
import UpdateEmployee from "../components/UpdateEmployee";
import toast from "react-hot-toast";
import Search from "../components/Search";

const EmployeeList = ({ user }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [selectedsort, setSelected] = useState("date");
  const [showUpdate, setUpdatecompo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateitem, setUpdateItem] = useState("");
  const [list, setList] = useState([]);
  const [searchlist, setSearchList] = useState(list);
  const [load, setload] = useState(false);
  const { loading, fetchall } = useFetchallemp();
  const off = () => {
    setShowEdit(false);
  };

  console.log(selectedsort);
  const offup = () => {
    setUpdatecompo(false);
  };

  useEffect(() => {
    fetchall(user?._id).then((data) => {
      setList(data), setSearchList(data);
    });
  }, [showEdit, showUpdate, load]);
  const addlist = (data) => {
    console.log("list", data);
    setList({ ...data });
  };
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  const handleDelete = async (employee_id) => {
    setdeleting(true);
    try {
      const res = await fetch(
        "https://dealsdray-assesment.onrender.com/api/delete-employee/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee_id,
            employer_id: user._id,
          }),
        }
      );

      const data = await res.json();

      toast.success(data.message);
      setdeleting(false);
      setload(!load);
    } catch (error) {
      console.log(error);
      setdeleting(false);
    }
  };

  const handleEdit = (item) => {
    setUpdateItem(item);
    setUpdatecompo(true);
  };

  const sortItems = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedArray = [...list].sort((a, b) => {
      if (key === "name") {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          return direction === "asc" ? 1 : -1;
        }
      } else {
        if (a[key] < b[key]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

    setSearchList(sortedArray);
    setSelected(key);
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce((query) => {
      const filteredItems = list.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchList(filteredItems);
    }, 200),
    [list]
  );
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };
  console.log(searchlist);
  return (
    <main>
      <header className=" w-full h-10 mt-2 flex gap-2 justify-evenly items-center p-2">
        <div className=" relative flex gap-2 justify-center items-center mt-8">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            id="default-search"
            className=" relative w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
          />
        </div>
        <div className=" flex gap-2 justify-center items-center mt-8">
          <span>Total Count : {list.length}</span>
        </div>
        <div className=" border-2 rounded-lg border-gray-800 p-2 flex gap-2 mt-8 justify-start items-center">
          <span>Sort by:</span>
          <button
            onClick={() => {
              sortItems("createdAt"), setSelected("date");
            }}
            className={`${
              selectedsort === "date" && "bg-gray-500"
            } px-2 py-1 border rounded`}
          >
            Date
          </button>
          <button
            onClick={() => sortItems("name")}
            className={`${
              selectedsort == "name" && "bg-gray-500"
            } px-2 py-1 border rounded`}
          >
            Name
          </button>
        </div>

        <button
          onClick={() => setShowEdit(!showEdit)}
          className=" flex transition-all ease-linear justify-center items-center hover:shadow-2xl hover:scale-105 h-12 mt-8 mr-5 bg-gray-400 max-sm:p-0 p-5 rounded-xl"
        >
          <span className=" text-gray-950 font-bold">Create new employee</span>
        </button>
      </header>
      {showEdit && (
        <div className=" flex justify-center items-center">
          <CreateEmployee add={addlist} user={user} off={off} />
        </div>
      )}

      {showUpdate && (
        <div className=" flex justify-center items-center">
          <UpdateEmployee
            add={addlist}
            item={updateitem}
            user={user}
            offUpdate={offup}
          />
        </div>
      )}

      <center className=" mt-12">
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>
            {list.length == 0 ? (
              <div className=" flex flex-col gap-2 mt-28">
                <span className=" text-2xl text-gray-900 font-medium">
                  {!loading &&
                    "You have not added any employees yet please please add employess."}
                </span>
                <span className=" text-xl text-gray-900 font-normal">
                  {!loading &&
                    "please click on create new employee button at top menu."}
                </span>
              </div>
            ) : (
              <TableComponent
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                data={searchlist}
                loading={deleting}
              />
            )}
          </div>
        )}
      </center>
    </main>
  );
};

export default EmployeeList;
