import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Teacher_Profile = ({ Data_visible, setData_visible }) => {
  const [View_Teacher, setView_Teacher] = useState([]);
  const { TeacherId } = useParams();
  // --------------------------------------------------------
  useEffect(() => {
    getTeacherData();
    async function getTeacherData() {
      try {
        setData_visible(true);
        const TeacherData = await axios.get(
          `https://63ae591c3e465169166faea4.mockapi.io/Teachers/${TeacherId}`
        );

        setView_Teacher(TeacherData.data);
        console.log(TeacherData.data);
        setData_visible(false);
      } catch (error) {
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
            <img
              className="card-image"
              src={`${View_Teacher.Image}`}
              alt="404"
            ></img>

            <div className="card-info">
              <div>
                <span className="key-title">PROFESSOR:</span>{" "}
                <span className="key-body">{View_Teacher.UserName}</span>
              </div>
              <div>
                <span className="key-title">JOB-TYPE:</span>{" "}
                <span className="key-body">{View_Teacher.Job}</span>
              </div>
              <div>
                <span className="key-title">EMAIL:</span>{" "}
                <span className="key-body">{View_Teacher.Email}</span>
              </div>
              <div>
                <span className="key-title">CONTACT:</span>{" "}
                <span className="key-body">{View_Teacher.Contact}</span>
              </div>
              <div>
                <span className="key-title">EXPERIENCE:</span>{" "}
                <span className="key-body">{View_Teacher.Experience}</span>
              </div>
              <div>
                <span className="key-title">GENDER:</span>{" "}
                <span className="key-body">{View_Teacher.Gender}</span>
              </div>
              {/* <div>
                <span className="key-title">STATE:</span>{" "}
                <span className="key-body">{View_Teacher.State}</span>
              </div>
              <div>
                <span className="key-title">COUNTRY:</span>{" "}
                <span className="key-body">{View_Teacher.Country}</span>
              </div>
              <div>
                <span className="key-title">PINCODE:</span>{" "}
                <span className="key-body">{View_Teacher.Pincode}</span>
              </div> */}
              <Link
                type="button"
                className="back-btn"
                to={"/dashboard/Teacher-Lists"}
              >
                BACK
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Teacher_Profile;
