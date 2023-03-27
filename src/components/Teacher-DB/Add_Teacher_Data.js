import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Add_Teacher_Data = () => {
  const success = () =>
  toast.success("👍Successfully your data has been Added", {
    position: "top-center",
    autoClose: false,
    hideProgressBar:false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: "dark",
  });
  const [Btn_loading, setBtn_loading] = useState(true);

  //? useNavigate is the method from react-router-dom..
  const navigate = useNavigate();

  //? useFormik is used to validate the form and
  //? it provides  inbuilt functions =>
  //?  like (handleSubmit,handleChange,handleClick,handleBlur etc...)
  const Input_Form_Validation = useFormik({
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
        await axios.post(
          `https://63ae591c3e465169166faea4.mockapi.io/Teachers`,
          values
        );
 success();
        navigate("/dashboard/Teacher-Lists");
      } catch (error) {
        alert(`<<< ! Something went wrong >>>
        => ${error}`);
        console.error(error);
        setBtn_loading(true);
      }
    },
  });

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group col-md-10">
            <h1 className="add-edit-title">ミ★ 𝘈𝘋𝘋 𝘛𝘌𝘈𝘊𝘏𝘌𝘙 𝘋𝘈𝘛𝘈 ★彡</h1>
          </div>
          {/* onSubmit should be given to parent element (form) 
         bcoz if we given it to any input/button it will check the value of the particular field
         But , if we given it to <form> => parent element it will validate/check the value of the children also... */}

          <form onSubmit={Input_Form_Validation.handleSubmit}>
            <div className="form-row d-flex justify-content-center input-data-form col-md-9 ml-lg-5 p-3 mt-5 mb-4 bg-light form-div-element">
              {/* -------------------------------------------- */}

              {/* -------------------------------------------- */}
              {/* First Name */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputFirstName">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.UserName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="UserName"
                  value={Input_Form_Validation.values.UserName}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Full Name"
                />
                {Input_Form_Validation.errors.UserName ? (
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Input_Form_Validation.errors.UserName}
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
                    Input_Form_Validation.errors.Gender
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Gender"
                  value={Input_Form_Validation.values.Gender}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Your Gender"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Input_Form_Validation.errors.Gender}
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
                    Input_Form_Validation.errors.Email
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Email"
                  value={Input_Form_Validation.values.Email}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Your Email"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Input_Form_Validation.errors.Email}
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
                    Input_Form_Validation.errors.Contact
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Contact"
                  value={Input_Form_Validation.values.Contact}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Your Number"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Input_Form_Validation.errors.Contact}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputContact">Job-Type</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.Job ? "is-invalid" : "is-valid"
                  }`}
                  name="Job"
                  value={Input_Form_Validation.values.Job}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Your Job"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Input_Form_Validation.errors.Job}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputContact">Years Of Experience</label>
                <input
                  type="number"
                  className={`form-control ${
                    Input_Form_Validation.errors.Experience
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Experience"
                  value={Input_Form_Validation.values.Experience}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Your Experience"
                />
                {
                <span style={{ color: "red",fontSize:"12px",fontFamily:"cursive" }}>
                    {Input_Form_Validation.errors.Experience}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
            </div>

            <div className="form-group col-md-10 mt-2">
              <button
                type={"submit"}
                value={"submit"}
                className="btn btn-primary "
              >
                {Btn_loading ? (
                  "SUBMIT"
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

export default Add_Teacher_Data;
