import { faDeleteLeft, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Teacher_Lists = ({ Data_visible, setData_visible }) => {
  const Delete = (Teacher_UserName) =>
    toast.error(`" ${Teacher_UserName} " Data is Deleted`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  const Delete_confirmation = (selected_id,Teacher_UserName) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => destroy(selected_id,Teacher_UserName),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };
  //? React hook...
  const [Teacher_Data, setTeacher_Data] = useState([]);

  async function destroy(selected_id,Teacher_UserName) {
    try {
      setData_visible(true);
      await axios.delete(
        `https://63ae591c3e465169166faea4.mockapi.io/Teachers/${selected_id}`
      );
      Delete(Teacher_UserName);
      const GetData = await axios.get(
        "https://63ae591c3e465169166faea4.mockapi.io/Teachers"
      );
      setData_visible(false);
      setTeacher_Data(GetData.data);
    } catch (error) {
      console.log(error);
    }
  }
  // --------------------------------------------------------
  //? useEffect will execute one time On initial Mounting stage...
  useEffect(() => {
    Get_Teacher_Data();
    // --------------------------------------------------------
    async function Get_Teacher_Data() {
      setData_visible(true);
      try {
        const User_Data = await axios.get(
          "https://63ae591c3e465169166faea4.mockapi.io/Teachers"
        );
        setTeacher_Data(User_Data.data);
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
        <h2 className="component-title">ミ★ 𝘛𝘌𝘈𝘊𝘏𝘌𝘙 𝘓𝘐𝘚𝘛𝘚 ★彡</h2>
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
        <div className="row">
          <div className="col-md-12">
            {Teacher_Data.map((item, index) => {
              return (
                <div className="student-card shadow-inset-center" key={index}>
                  <div className="card-border-top"></div>
                  <div>
                    <img
                      src={item.Image}
                      alt="404"
                      className="student-img"
                    ></img>
                  </div>
                  <div className="key-name">PROFESSOR</div>
                  <div className="key-value">{item.UserName}</div>
                  <div className="key-name">JOB-TYPE</div>
                  <div className="key-value">{item.Job}</div>
                  <div className="card-buttons">
                    <Link
                      type="button"
                      className="nav-link card-button"
                      to={`/dashboard/Teacher-Profile/${item.id}`}
                    >
                      View{" "}
                      <FontAwesomeIcon className="crud-btn-icon" icon={faEye} />
                    </Link>
                    <Link
                      type="button"
                      className="nav-link card-button"
                      to={`/dashboard/Edit-Teacher-Data/${item.id}`}
                    >
                      Edit{" "}
                      <FontAwesomeIcon
                        className="crud-btn-icon"
                        icon={faEdit}
                      />
                    </Link>
                    <button
                      type="button"
                      className="nav-link card-button"
                      onClick={() => Delete_confirmation(item.id,item.UserName)}
                    >
                      Delete{" "}
                      <FontAwesomeIcon
                        className="crud-btn-icon"
                        icon={faDeleteLeft}
                      />
                    </button>
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

export default Teacher_Lists;
