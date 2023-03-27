import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Student_Profile = ({ Data_visible, setData_visible }) => {
  // --------------------------------------------------------
  //? React hook UseState...
  const [view, setView] = useState([]);
  // --------------------------------------------------------
  //? React-router-dom => useParams ...
  const { StudentId } = useParams();
  // --------------------------------------------------------
  useEffect(() => {
    // --------------------------------------------------------
    getEditData();

    async function getEditData() {
      try {
        setData_visible(true);
        // --------------------------------------------------------
        const EditData = await axios.get(
          `https://63ae591c3e465169166faea4.mockapi.io/student/${StudentId}`
        );
        setView(EditData.data);
        // --------------------------------------------------------
        setData_visible(false);
      } catch (error) {
        // alert(`error.message
        // Something went wrong`)
        console.log(error);
      }
    }
  }, []);
  // --------------------------------------------------------
  return (
    <>
      <div>
        <h2 className="component-title">ミ★ 𝘚𝘌𝘓𝘌𝘊𝘛𝘌𝘋 𝘗𝘙𝘖𝘍𝘐𝘓𝘌 ★彡</h2>
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
        <div className="selected-profile">
          <div className="selected-cards">
            <img className="card-image" src={`${view.Image}`} alt="404"></img>
            <div className="card-info">
              <div>
                <span className="key-title">NAME:</span>{" "}
                <span className="key-body">
                  {view.FirstName} {view.LastName}
                </span>
              </div>
              <div>
                <span className="key-title">EMAIL:</span>{" "}
                <span className="key-body">{view.Email}</span>
              </div>
              <div>
                <span className="key-title">CONTACT:</span>{" "}
                <span className="key-body">{view.Contact}</span>
              </div>
              <div>
                <span className="key-title">ADDRESS:</span>{" "}
                <span className="key-body">{view.Address}</span>
              </div>
              <div>
                <span className="key-title">GENDER:</span>{" "}
                <span className="key-body">{view.Gender}</span>
              </div>
              <div>
                <span className="key-title">STATE:</span>{" "}
                <span className="key-body">{view.State}</span>
              </div>
              <div>
                <span className="key-title">COUNTRY:</span>{" "}
                <span className="key-body">{view.Country}</span>
              </div>
              <div>
                <span className="key-title">PINCODE:</span>{" "}
                <span className="key-body">{view.Pincode}</span>
              </div>
            </div>
            {/* -------------------------------------------------------- */}
           {/* Back button... */}
            <Link
              type="button"
              className="back-btn"
              to={"/dashboard/Student-Lists"}
            >
              BACK
            </Link>
            {/* -------------------------------------------------------- */}
          </div>
        </div>
      )}
    </>
  );
};

export default Student_Profile;
