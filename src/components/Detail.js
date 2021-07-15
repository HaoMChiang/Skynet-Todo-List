import React from "react";

const Detail = (props) => {
  return (
    <div className="mt-10 justify-center flex flex-col items-center mb-auto">
      {props.dataset.map((data, id) => (
        <div className="flex justify-center items-center w-8/12 mb-3" key={id}>
          <div
            className={`overflow-y-hidden text-xl border-2 flex-grow pl-5 h-10 pt-1 ${
              data.isCompleted && "line-through"
            }`}
            key={data.id}
          >
            {data.result}
          </div>
          <div onClick={() => props.handleComplete(data.id)}>
            <svg
              className={`w-10 h-10 p-1 text-white cursor-pointer ${
                data.isCompleted
                  ? "bg-gray-400 hover:bg-gray-300"
                  : "bg-green-400 hover:bg-green-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div onClick={() => props.handleDelete(data.id)}>
            <svg
              className="w-10 h-10 bg-red-400 p-1 text-white cursor-pointer hover:bg-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
