
import './App.css';

import { Routes, Route } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Chat } from "./Pages/Chat";
import { SetAvatar } from "./Pages/SetAvatar";

function App() {
  return (
    <>
      <Routes>

        <Route path="/register" element={
          <>
            <Register />
          </>
        }></Route>
        <Route path="/login" element={
          <>
            <Login />
          </>
        }></Route>
        <Route path="/" element={
          <>
            <Chat />
          </>
        }></Route>
        <Route path="/setAvatar" element={
          <>
            <SetAvatar />
          </>
        }></Route>
      </Routes>
    </>
  );
}

export default App;
