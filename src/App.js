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

  const dataDomain = "localhost";

  useEffect(() => {
    setFilePath(dataDomain + "/" + dataKey);
  }, [dataKey]);

  useEffect(() => {
    async function initMySky() {
      try {
        const mySky = await client.loadMySky(dataDomain);

        await mySky.loadDacs(contentRecord);

        const loggedIn = await mySky.checkLogin();

        setMySky(mySky);
        setLoggedIn(loggedIn);

        if (loggedIn) {
          setUserID(await mySky.userID());
        }
      } catch (error) {
        console.log(`initMySky Error: ${error.message}`);
      }
    }
    initMySky();
  }, []);

  const handleLogin = async () => {
    const status = await mySky.requestLoginAccess();
    setLoggedIn(status);
    if (status) {
      setUserID(await mySky.userID());
    }
  };

  const handleLogout = async () => {
    await mySky.logout();
    setLoggedIn(false);
    setUserID("");
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
    userID,
    contentRecord,
  };

  return (
    <div>
      <Header {...headerProps} />
      <Content {...contentProps} />
      <Footer />
    </div>
  );
}

export default App;
