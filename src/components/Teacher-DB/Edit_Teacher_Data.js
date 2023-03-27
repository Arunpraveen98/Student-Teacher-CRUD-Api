import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit_Teacher_Data = () => {
  const success = () =>
  toast.success("Your Data is Updated", {
    position: "top-center",
    autoClose: false,
    hideProgressBar:false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: "dark",
  });
  //? React hook useState...
  const [Btn_loading, setBtn_loading] = useState(true);
  //-------------------------------------------------------------------
  //? useParams function from react-router-dom...
  const { TeacherId } = useParams();

  //-------------------------------------------------------------------
  //? useNavigate is the method from react-router-dom..
  const navigate = useNavigate();
  //-------------------------------------------------------------------
  const Edit_Teacher_Data = useFormik({
    initialValues: {
        UserName: "",
        Email: "",
        Contact: "",
        Gender: "",
        Job: "",
        Experience: "",
      },
      validate: (values) => {
        const errors = {};
        if (!values.UserName) {
          errors.UserName = "please enter first name";
        } else if (values.UserName.length > 20) {
          errors.UserName = " Characters should be below 20 ";
        } else if (values.UserName.length <= 3) {
          errors.UserName = "Characters should be above 3";
        }
        //--------------------------------------------------------------------
        if (!values.Email) {
          errors.Email = "please enter email";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
        ) {
          errors.Email = "Invalid email address";
        }
        //--------------------------------------------------------------------
        if (!values.Contact) {
          errors.Contact = "please enter Mobile Number";
        } else if (
          JSON.stringify(values.Contact).length < 10 &&
          JSON.stringify(values.Contact).length > 0
        ) {
          errors.Contact = "Number must be 10 digits";
        }
        //--------------------------------------------------------------------
        if (!values.Job) {
          errors.Job = "Please enter Job Type";
        }
        //--------------------------------------------------------------------
        if (!values.Experience) {
          errors.Experience = "Please enter Years of Experience";
        }
  
        //--------------------------------------------------------------------
        if (!values.Gender) {
          errors.Gender = "please enter Gender";
        }
        //--------------------------------------------------------------------
  
        return errors;
      },
    onSubmit: async (values) => {
      setBtn_loading(false);
      try {
        await axios.put(
          `https://63ae591c3e465169166faea4.mockapi.io/Teachers/${TeacherId}`,
          values
        );
        success();
        navigate("/dashboard/Teacher-Lists");
      } catch (error) {
        alert(`<<< ! Something went wrong >>>
        => ${error}` );
       
        setBtn_loading(true);
      }
    },
  });
  //-------------------------------------------------------------------
  useEffect(() => {
    Set_Teacher_Values();
    async function Set_Teacher_Values() {
      try {
        //? If we fetch data without await keyword means it will return response as a promise object...
        //? To handle the promise object we should use await keyword ...
        const SetData = await axios.get(
          `https://63ae591c3e465169166faea4.mockapi.io/Teachers/${TeacherId}`
        );
        //console.log(SetData.data);
        //? Before useFormik(object) we cannot (setValues => is a formik inbuilt function) to the initialvalues...
        Edit_Teacher_Data.setValues(SetData.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <>
   
      <div className="row">
        <div className="col-lg-12">
        <div className="form-group col-md-10">
                <h1 className="add-edit-title">ミ★ 𝘌𝘋𝘐𝘛 𝘛𝘌𝘈𝘊𝘏𝘌𝘙 𝘋𝘈𝘛𝘈 ★彡</h1>
              </div>
          {/* onSubmit should be given to parent element (form) 
         bcoz if we given it to any input/button it will check the value of the particular field
         But , if we given it to <form> => parent element it will validate/check the value of the children also... */}
         
         <form onSubmit={Edit_Teacher_Data.handleSubmit}>
            <div className="form-row d-flex justify-content-center input-data-form col-md-9 ml-lg-5 p-3 mt-5 mb-4 bg-light form-div-element">
              {/* -------------------------------------------- */}

              {/* -------------------------------------------- */}
              {/* First Name */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputFirstName">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Edit_Teacher_Data.errors.UserName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="UserName"
                  value={Edit_Teacher_Data.values.UserName}
                  onChange={Edit_Teacher_Data.handleChange}
                  placeholder="Enter Full Name"
                />
                {Edit_Teacher_Data.errors.UserName ? (
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Edit_Teacher_Data.errors.UserName}
                  </span>
                ) : null}
              </div>
              {/* -------------------------------------------- */}
              {/* Gender */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputGender">Gender</label>
                <input
                  type="text"
                  className={`form-control ${
                    Edit_Teacher_Data.errors.Gender
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Gender"
                  value={Edit_Teacher_Data.values.Gender}
                  onChange={Edit_Teacher_Data.handleChange}
                  placeholder="Enter Your Gender"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Edit_Teacher_Data.errors.Gender}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* Email */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className={`form-control ${
                    Edit_Teacher_Data.errors.Email
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Email"
                  value={Edit_Teacher_Data.values.Email}
                  onChange={Edit_Teacher_Data.handleChange}
                  placeholder="Enter Your Email"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Edit_Teacher_Data.errors.Email}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* Contact */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputContact">Contact</label>
                <input
                  type="number"
                  className={`form-control ${
                    Edit_Teacher_Data.errors.Contact
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Contact"
                  value={Edit_Teacher_Data.values.Contact}
                  onChange={Edit_Teacher_Data.handleChange}
                  placeholder="Enter Your Number"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Edit_Teacher_Data.errors.Contact}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputContact">Job-Type</label>
                <input
                  type="text"
                  className={`form-control ${
                    Edit_Teacher_Data.errors.Job
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Job"
                  value={Edit_Teacher_Data.values.Job}
                  onChange={Edit_Teacher_Data.handleChange}
                  placeholder="Enter Your Job"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Edit_Teacher_Data.errors.Job}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputContact">Years Of Experience</label>
                <input
                  type="number"
                  className={`form-control ${
                    Edit_Teacher_Data.errors.Experience
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Experience"
                  value={Edit_Teacher_Data.values.Experience}
                  onChange={Edit_Teacher_Data.handleChange}
                  placeholder="Enter Your Experience"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Edit_Teacher_Data.errors.Experience}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
            </div>

            <div className="form-group col-md-10 mt-2">
              <button
                type={"submit"}
                value={"Update"}
                className="btn btn-primary "
              >
                {Btn_loading ? (
                  "UPDATE"
                ) : (
                  <div className="loader">
                    <div className="face">
                      <div className="circle"></div>
                    </div>
                    <div className="face">
                      <div className="circle"></div>
                    </div>
                  </div>
                )}
              </button>
            </div>
            {/* -------------------------------------------- */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_Teacher_Data;
