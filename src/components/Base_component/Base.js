import React, { useEffect, useState } from "react";

import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import TopNavBar from "./Topbar";
import Confetti from "react-confetti";

const Base = ({ Animate_visible, setAnimate_visible }) => {
  const [boolean, setboolean] = useState();
  useEffect(() => {
    const visible = JSON.parse(window.localStorage.getItem("dashboard"));
    // console.log(typeof (window.localStorage.getItem("dashboard") ));
    setboolean(visible);
  }, []);
  return (
    <>
      {/*Page Wrapper*/}
      <div id="wrapper">
        <SideBar setAnimate_visible={setAnimate_visible} />
        {/* ---------------------------*/}
        {/*Content Wrapper*/}
        <div id="content-wrapper" className="d-flex flex-column">
          {/*Main Content*/}
          <div id="content">
            <TopNavBar />
            {/* ---------------------------*/}
            {/*Begin Page Content*/}
            {/* start container-fluid*/}
            <div className="container-fluid bg-color">
              {/* outlet holds all the children components... */}

              {Animate_visible ? (
                <div className="row ">
                  <div className="dash-title col-md-8 col-lg-12 col-lg-6">
                    {boolean
                      ? "Welcome to Students Database"
                      : "Welcome to Teachers Database"}
                  </div>

                  <Confetti className="confetti-animate" />

                  {boolean ? (
                    /* -------------------------------------- */

                    <div className="lottie-welcome col-lg-12">
                      <div className="col-md-8 col-lg-12 col-lg-6 dash-sub-title">
                        <p>
                          Students can CREATE data, have access to the added
                          data,
                          <br />
                          UPDATE or EDIT the data, and DELETE the data.
                        </p>
                      </div>

                      <lottie-player
                        src="https://assets3.lottiefiles.com/packages/lf20_aao5ezov.json"
                        background="transparent"
                        speed="1"
                        className="lottie-dash-animation"
                        style={{
                          width: "vw",
                          height: "500px",
                        }}
                        loop
                        autoplay
                      ></lottie-player>
                    </div>
                  ) : (
                    /* -------------------------------------- */

                    <div className="lottie-welcome col-lg-12">
                      <div className="col-md-8 col-lg-12 col-lg-6 dash-sub-title">
                        <p>
                          Teachers can CREATE data, have access to the added
                          data,
                          <br />
                          UPDATE or EDIT the data, and DELETE the data.
                        </p>
                      </div>
                      <>
                        <lottie-player
                          src="https://assets2.lottiefiles.com/private_files/lf30_Fy9W8c.json"
                          background="transparent"
                          speed="1"
                          style={{
                            width: "vw",
                            height: "500px",
                          }}
                          loop
                          autoplay
                        ></lottie-player>
                      </>
                    </div>
                    /* -------------------------------------- */
                  )}
                </div>
              ) : (
                <Outlet></Outlet>
              )}
            </div>
            {/*End container-fluid*/}

            {/* ---------------------------*/}
            {/*End Main Content*/}
          </div>
          {/* ---------------------------*/}
          {/*Footer*/}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright 2023 &copy; All rights Reserved</span>
              </div>
            </div>
          </footer>
          {/*End of Footer*/}

          {/* --------------------------------------------- */}
          {/*End Content Wrapper*/}
        </div>

        {/*End of Wrapper*/}
      </div>
    </>
  );
};

export default Base;
