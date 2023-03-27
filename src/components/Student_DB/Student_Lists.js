import { faDeleteLeft, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Student_Lists = ({ Data_visible, setData_visible }) => {
  //-------------------------------------------------------------------
  //? toast for deleting the data...
  const Delete = (Student_First_Name, Student_Last_Name) =>
    toast.error(
      `" ${Student_First_Name} ${Student_Last_Name} " Data is Deleted`,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      }
    );
  //-------------------------------------------------------------------
  //? Delete Confirmation alert message...
  const Delete_confirmation = (
    selected_id,
    Student_First_Name,
    Student_Last_Name
  ) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            destroy(selected_id, Student_First_Name, Student_Last_Name),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };
  //-------------------------------------------------------------------
  //? React hook...
  const [student_data, setstudent_data] = useState([]);
  //-------------------------------------------------------------------
  async function destroy(selected_id, Student_First_Name, Student_Last_Name) {
    try {
      //-------------------------------------------------------------------
      setData_visible(true);
      //-------------------------------------------------------------------
      await axios.delete(
        `https://63ae591c3e465169166faea4.mockapi.io/student/${selected_id}`
      );
      //-------------------------------------------------------------------
      Delete(Student_First_Name, Student_Last_Name);
      //-------------------------------------------------------------------
      const GetData = await axios.get(
        "https://63ae591c3e465169166faea4.mockapi.io/student"
      );
      //-------------------------------------------------------------------
      setData_visible(false);
      setstudent_data(GetData.data);
      //-------------------------------------------------------------------
    } catch (error) {
      console.log(error);
    }
  }
  // --------------------------------------------------------
  //? useEffect will execute one time On initial Mounting stage...
  useEffect(() => {
    Get_Student_Data();
    // --------------------------------------------------------
    async function Get_Student_Data() {
      //-------------------------------------------------------------------
      setData_visible(true);
      //-------------------------------------------------------------------
      try {
        const User_Data = await axios.get(
          "https://63ae591c3e465169166faea4.mockapi.io/student"
        );
        setstudent_data(User_Data.data);
        //-------------------------------------------------------------------
        setData_visible(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  // --------------------------------------------------------
  // //? On Unmounting statge this useEffect function executes...
  // //? We can write operations when Component destruction...
  // useEffect(() => {
  //   //? If useEffect Returns a function means => Component is destroyed...
  //   return () => {
  //     console.log("Component destroyed");
  //   };
  // }, []);

  // --------------------------------------------------------

  // --------------------------------------------------------
  return (
    <>
      <div>
        <h2 className="component-title">ミ★ 𝘚𝘛𝘜𝘋𝘌𝘕𝘛𝘚 𝘓𝘐𝘚𝘛 ★彡</h2>
      </div>

      {Data_visible ? (
        <div className="row data-loading">
          <lottie-player
            src="https://assets3.lottiefiles.com/private_files/lf30_xyrusege.json"
            background="transparent"
            speed="1"
            style={{
              width: "vw",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
            }}
            loop
            autoplay
          ></lottie-player>
        </div>
      ) : (
        //-------------------------------------------------------------------
        <div className="row">
          <div className="col-md-12">
            {/* ------------------------------------------------------------------- */}
            {/*  mapping the student data... */}
            {student_data.map((item, index) => {
              return (
                <div className="student-card shadow-inset-center" key={index}>
                  <div className="card-border-top"></div>
                  {/* ------------------------------------------------------------------- */}
                  {/* Image for the student... */}
                  <div>
                    <img
                      src={item.Image}
                      alt="404"
                      className="student-img"
                    ></img>
                  </div>
                  {/* ------------------------------------------------------------------- */}
                 {/* FirstName and LastName for the student... */}
                  <div className="key-name">NAME</div>
                  <div className="key-value">
                    {item.FirstName} {item.LastName}
                  </div>
                  {/* ------------------------------------------------------------------- */}
                  {/* Country of the student... */}
                  <div className="key-name">COUNTRY</div>
                  <div className="key-value">{item.Country}</div>
                  {/* ------------------------------------------------------------------- */}
                  <div className="card-buttons">
                    {/* ------------------------------------------------------------------- */}
                    {/* View button ... */}
                    <Link
                      type="button"
                      className="nav-link card-button"
                      to={`/dashboard/Student-Profile/${item.id}`}
                    >
                      View{" "}
                      <FontAwesomeIcon className="crud-btn-icon" icon={faEye} />
                    </Link>
                    {/* ------------------------------------------------------------------- */}
                    {/* Edit button... */}
                    <Link
                      type="button"
                      className="nav-link card-button"
                      to={`/dashboard/Edit-Data/${item.id}`}
                    >
                      Edit{" "}
                      <FontAwesomeIcon
                        className="crud-btn-icon"
                        icon={faEdit}
                      />
                    </Link>
                    {/* ------------------------------------------------------------------- */}
                     {/* Delete button... */}
                    <button
                      type="button"
                      className="nav-link card-button"
                      onClick={() =>
                        Delete_confirmation(
                          item.id,
                          item.FirstName,
                          item.LastName
                        )
                      }
                    >
                      Delete{" "}
                      <FontAwesomeIcon
                        className="crud-btn-icon"
                        icon={faDeleteLeft}
                      />
                    </button>
                    {/* ------------------------------------------------------------------- */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Student_Lists;
