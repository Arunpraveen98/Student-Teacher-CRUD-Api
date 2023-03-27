import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./bootstrap.css";

import Base from "./components/Base_component/Base";
import Login from "./components/Base_component/Login";
import Add_Data from "./components/Student_DB/Add_Data";
import Edit_Data from "./components/Student_DB/Edit_Data";
import Student_Lists from "./components/Student_DB/Student_Lists";
import Student_Profile from "./components/Student_DB/Student_Profile";
import Teacher_Lists from "./components/Teacher-DB/Teachers_List";
import Teacher_Profile from "./components/Teacher-DB/Teacher_Profile";
import Add_Teacher_Data from "./components/Teacher-DB/Add_Teacher_Data";
import Edit_Teacher_Data from "./components/Teacher-DB/Edit_Teacher_Data";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --------------------------------------------------------
function App() {
  // --------------------------------------------------------
  //? Hooks state...
  const [Component_visible, setComponent_visible] = useState();
  const [Data_visible, setData_visible] = useState(true);
  const [Animate_visible, setAnimate_visible] = useState(true);

  // --------------------------------------------------------

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        {/* -------------------------------------------------------- */}
        <Routes>
          {/* -------------------------------------------------------- */}

          {/* LOGIN PAGE DEFAULT PATH */}
          <Route
            path="/"
            element={
              <Login
                setAnimate_visible={setAnimate_visible}
                setComponent_visible={setComponent_visible}
              />
            }
          />
          {/* -------------------------------------------------------- */}

          {/* PARENT PATH DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <Base
                Animate_visible={Animate_visible}
                setAnimate_visible={setAnimate_visible}
              />
            }
          >
            {/* -------------------------------------------------------- */}

            {/* CHILDREN INSIDE THE DASHBOARD */}
            {/* ADD STUDENT DATA */}
            <Route path="Add-Data" element={<Add_Data />} />
            {/* ADD TEACHER DATA */}
            <Route path="Add-Teacher-Data" element={<Add_Teacher_Data />} />
            {/* -------------------------------------------------------- */}
            {/* EDIT STUDENT DATA */}
            <Route path="Edit-Data/:StudentId" element={<Edit_Data />} />
            {/* EDIT TEACHER DATA */}
            <Route
              path="Edit-Teacher-Data/:TeacherId"
              element={<Edit_Teacher_Data />}
            />
            {/* -------------------------------------------------------- */}
            {/* STUDENT LISTS */}
            <Route
              path="Student-Lists"
              element={
                <Student_Lists
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            {/* TEACHER LISTS */}
            <Route
              path="Teacher-Lists"
              element={
                <Teacher_Lists
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            {/* -------------------------------------------------------- */}
            {/* STUDENT PROFILE */}
            <Route
              path="Student-Profile/:StudentId"
              element={
                <Student_Profile
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            {/* TEACHER PROFILE */}
            <Route
              path="Teacher-Profile/:TeacherId"
              element={
                <Teacher_Profile
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            {/* -------------------------------------------------------- */}
          </Route>
          {/* -------------------------------------------------------- */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
