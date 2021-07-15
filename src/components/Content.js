import React, { useEffect } from "react";
import { useState } from "react";
import Detail from "./Detail";

const Content = (props) => {
  const [inputData, setInputData] = useState("");
  const [dataset, setDataset] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    handleGetData();
    console.log("get data ran in content.js");
  }, [props.loggedIn, submittedData]);

  const handleGetData = async () => {
    console.log("handleGetData ran");
    try {
      const { data, dataLink } = await props.mySky.getJSON(props.filePath);
      if (data) {
        setDataset(data);
        console.log("From Get Data(data): ", data);
        console.log("From Get Data(dataset): ", dataset);
      } else {
        console.log("Error getting data using getJSON");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (inputData.length === 0) {
        return;
      }
      const jsonData = [
        ...dataset,
        { result: inputData, id: inputData.toString(), isCompleted: false },
      ];
      const { data, dataLink } = await props.mySky.setJSON(
        props.filePath,
        jsonData
      );
      setSubmittedData(data);

      // await props.contentRecord.recordInteraction({
      //   skylink: dataLink,
      //   metadata: { action: "updatedTodoList" },
      // });

      console.log("data submitted");
    } catch (error) {
      console.log("Submit Error: ", error.message);
    }
    setInputData("");
  };

  const handleDelete = async (id) => {
    try {
      console.log("handleDelete ID: ", id);
      const newData = dataset.filter((data) => data.id !== id);
      const { data, dataLink } = await props.mySky.setJSON(
        props.filePath,
        newData
      );
      setSubmittedData(data);
      console.log("data deleted");
    } catch (err) {
      console.log("Delete Error: ", err.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      console.log("handleComplete ran");
      const newData = dataset;
      for (const i in newData) {
        if (newData[i].id === id) {
          newData[i].isCompleted = !newData[i].isCompleted;
          break;
        }
      }
      const { data, dataLink } = await props.mySky.setJSON(
        props.filePath,
        newData
      );
      setSubmittedData(data);
      console.log("handleComplete is done");
    } catch (err) {
      console.log("Handle Complete Error: ", err.message);
    }
  };

  return (
    <div className="flex flex-col p-10 min-h-screen">
      {props.loggedIn !== null && !props.loggedIn && (
        <h1 className="text-center text-3xl">
          Please Login or Signup First !!!
        </h1>
      )}
      {props.loggedIn !== null && props.loggedIn && (
        <div className="flex justify-center items-center">
          <input
            className="shadow appearance-none border rounded-l w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="input"
            type="text"
            value={inputData}
            placeholder="Add your new todo"
            onChange={(e) => setInputData(e.target.value)}
          />
          <div onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 p-1 bg-blue-500 rounded-r text-white hover:bg-blue-400 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      {props.loggedIn != null && props.loggedIn && (
        <Detail
          dataset={dataset}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default Content;
