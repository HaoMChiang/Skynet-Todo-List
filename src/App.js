import "./App.css";
import { SkynetClient } from "skynet-js";
import { useState, useEffect } from "react";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;

const client = new SkynetClient(portal);

const contentRecord = new ContentRecordDAC();

function App() {
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);
  const [userID, setUserID] = useState();
  const [filePath, setFilePath] = useState();
  const [dataKey, setDataKey] = useState("testing");
  // const [inputData, setInputData] = useState("");

  const [result, setResult] = useState("");
  const [submittedLink, setSubmittedLink] = useState("");
  const [submittedData, setSubmittedData] = useState();
  const [requestedLink, setRequestedLink] = useState("");
  const [requestedData, setRequestedData] = useState();
  const [link, setLink] = useState("");
  // const [dataset, setDataset] = useState([]);

  const dataDomain = "localhost";

  useEffect(() => {
    setFilePath(dataDomain + "/" + dataKey);
    //console.log("File Path: ", filePath);
  }, [dataKey]);

  // useEffect(() => {
  //   handleGetData();
  //   console.log("Dataset once the site is loaded: ", dataset);
  // }, [mySky, submittedData]);

  useEffect(() => {
    async function initMySky() {
      //console.log("initMySky ran");
      try {
        const mySky = await client.loadMySky(dataDomain);
        await mySky.loadDacs(contentRecord);

        const loggedIn = await mySky.checkLogin();
        setMySky(mySky);
        setLoggedIn(loggedIn);
        //await handleGetData();
        if (loggedIn) {
          setUserID(await mySky.userID());
        }

        // console.log("initMySky mySky: ", mySky);
        // console.log("initMySky loggedIn: ", loggedIn);
        // console.log("initMySky userID: ", userID);
      } catch (error) {
        console.log(`initMySky Error: ${error.message}`);
      }
    }
    initMySky();
  }, []);

  const handleLogin = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();
    //console.log("handleLogin status: ", status);

    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }

    // console.log("handleLogin loggedIn: ", loggedIn);
    // console.log("handleLogin userID: ", userID);
  };

  const handleLogout = async () => {
    await mySky.logout();

    setLoggedIn(false);
    setUserID("");

    // console.log("handleLogout loggedIn: ", loggedIn);
    // console.log("handleLogout userID: ", userID);
  };

  // const handleSubmit = async () => {
  //   try {
  //     //await handleGetData();
  //     // setDataset((arr) => [...arr, { id: dataset.length, input: inputData }]);
  //     // setInputData("");
  //     // const jsonData = {
  //     //   result: inputData,
  //     //   id: 1
  //     // };

  //     const jsonData = [...dataset, { result: inputData, id: 0 }];

  //     const { data, dataLink } = await mySky.setJSON(filePath, jsonData);
  //     setSubmittedLink(dataLink);
  //     setSubmittedData(data);
  //     setLink(dataLink);
  //     // console.log("From handleSubmit: ", data);
  //     // try {
  //     //   await contentRecord.recordNewContent({
  //     //     skylink: link,
  //     //   });
  //     // } catch (error) {
  //     //   console.log(`error with CR DAC: ${error.message}`);
  //     // }
  //     // await contentRecord.recordInteraction({
  //     //   skylink: link,
  //     //   metadata: { action: "updatedTodoList" },
  //     // });
  //     // console.log("Data Submitted");
  //   } catch (error) {
  //     console.log("Submit Error: ", error.message);
  //   }
  // };

  // const handleGetData = async () => {
  //   console.log("handleGetData ran");
  //   try {
  //     const { data, dataLink } = await mySky.getJSON(filePath);
  //     if (data) {
  //       setDataset(data);

  //       setResult(data);

  //       // console.log("From Get Data(data): ", data);
  //       // console.log("From Get Data(dataset): ", dataset);
  //     } else {
  //       console.log("Error getting data using getJSON");
  //     }
  //     setRequestedLink(dataLink);
  //     setRequestedData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const reset = async () => {
    try {
      //await handleGetData();
      // setDataset((arr) => [...arr, { id: dataset.length, input: inputData }]);
      // setInputData("");
      // const jsonData = {
      //   result: inputData,
      //   id: 1
      // };

      const jsonData = [{ result: "test1", id: 0, isCompleted: false }];

      const { data, dataLink } = await mySky.setJSON(filePath, jsonData);
      setSubmittedLink(dataLink);
      setSubmittedData(data);
      setLink(dataLink);
      console.log("From reset: ", data);
      // try {
      //   await contentRecord.recordNewContent({
      //     skylink: link,
      //   });
      // } catch (error) {
      //   console.log(`error with CR DAC: ${error.message}`);
      // }
      // await contentRecord.recordInteraction({
      //   skylink: link,
      //   metadata: { action: "updatedTodoList" },
      // });
      console.log("Data Reset");
    } catch (error) {
      console.log("Submit Error: ", error.message);
    }
  };

  const headerProps = {
    mySky,
    loggedIn,
    userID,
    handleLogin,
    handleLogout,
  };

  const contentProps = {
    mySky,
    filePath,
    loggedIn,
    contentRecord,
  };

  return (
    <div>
      <Header {...headerProps} />
      <Content {...contentProps} />
      {/* <button onClick={reset}>reset</button> */}
      <Footer />
    </div>
  );
}

export default App;
