import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Add_Data = () => {
  //--------------------------------------------------------------------
  // ? Toast => for Success...
  const success = () =>
    toast.success("👍Successfully your data has been Added", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  //--------------------------------------------------------------------
  // const failed = () => toast("Please! Kindly fill your data");
  //--------------------------------------------------------------------
  //? React hook useState...
  const [Btn_loading, setBtn_loading] = useState(true);
  //--------------------------------------------------------------------
  //? useNavigate is the method from react-router-dom...
  const navigate = useNavigate();
  //--------------------------------------------------------------------
  //? useFormik is used to validate the form and
  //? it provides  inbuilt functions =>
  //? like (handleSubmit,handleChange,handleClick,handleBlur etc...)
  const Input_Form_Validation = useFormik({
    //? Default initial value for input fields...
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Contact: "",
      Address: "",
      State: "",
      Country: "",
      Pincode: "",
      Gender: "",
    },
    //--------------------------------------------------------------------
    //? When onSubmit function is invoked
    //? it will validate the value of the input fields...
    //? validate => is the property/key and
    //? (values) => is the parameter and it holds the initial value of the input field...
    validate: (values) => {
      //? when errors will be empty object then only onSubmit function will be executed...
      //? otherwise it will not be executed...
      const errors = {};
      //? Conditions for validation...
      //? input fields are null,"",undefined...
      //? First Name Condition...
      if (!values.FirstName) {
        errors.FirstName = "Please enter first name";
      } else if (values.FirstName.length > 10) {
        errors.FirstName = " Characters should be below 10 ";
      } else if (values.FirstName.length <= 3) {
        errors.FirstName = "Characters should be above 3";
      }
      //--------------------------------------------------------------------
      //? LastName Condition...
      if (!values.LastName) {
        errors.LastName = "Please enter Last name";
      }
      //--------------------------------------------------------------------
      //? Email Condition...
      if (!values.Email) {
        errors.Email = "Please enter email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
      ) {
        errors.Email = "Invalid email address";
      }
      //--------------------------------------------------------------------
      //? Contact Condition...
      if (!values.Contact) {
        errors.Contact = "Please enter Mobile Number";
      } else if (
        JSON.stringify(values.Contact).length < 10 &&
        JSON.stringify(values.Contact).length > 0
      ) {
        errors.Contact = "Number must be 10 digits";
      }
      //--------------------------------------------------------------------
      //? Address Condition...
      if (!values.Address) {
        errors.Address = "Please enter Address";
      }
      //--------------------------------------------------------------------
      //? State Condition...
      if (!values.State) {
        errors.State = "Please Select State";
      }
      //--------------------------------------------------------------------
      //? Country Condition...
      if (!values.Country) {
        errors.Country = "Please Select Country";
      }
      //--------------------------------------------------------------------
      //? Pincode Condition...
      if (!values.Pincode) {
        errors.Pincode = "Please enter Pincode";
      }
      //--------------------------------------------------------------------
      //? Gender Condition...
      if (!values.Gender) {
        errors.Gender = "Please enter Gender";
      }
      //--------------------------------------------------------------------

      return errors;
    },
    //--------------------------------------------------------------------
    //? If errors returned empty object then onSubmit property will be executed...
    onSubmit: async (values) => {
      try {
        setBtn_loading(false);
        //--------------------------------------------------------------------
        //? Creating a Student data...
        //? POST => METHOD...
        //? To Post the newly created Student data take the student api and add the entered values...
        await axios.post(
          `https://63ae591c3e465169166faea4.mockapi.io/student`,
          values
        );
        //--------------------------------------------------------------------
        success();
        navigate("/dashboard/Student-Lists");
        //--------------------------------------------------------------------
      } catch (error) {
        alert(`<<< ! Something went wrong >>>
        => ${error}`);
        console.error(error);
        //--------------------------------------------------------------------
        setBtn_loading(true);
      }
    },
  });
  //--------------------------------------------------------------------
  return (
    <>
      <div className="row">
        <div className="col-lg-12 ">
          <div className="form-group col-md-10">
            <h1 className="add-edit-title">ミ★ 𝘈𝘋𝘋 𝘋𝘈𝘛𝘈 ★彡</h1>
          </div>
          {/*  onSubmit should be given to parent element (form) 
         bcoz if we given it to any input/button it will check the value of the particular field
         But , if we given it to <form> => parent element 
         it will validate/check the value of the each input field/children also... */}

          <form onSubmit={Input_Form_Validation.handleSubmit}>
            <div className="form-row d-flex justify-content-center input-data-form col-md-9 ml-lg-5 p-3 bg-light form-div-element">
              {/* -------------------------------------------- */}
              {/* First Name */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputFirstName">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.FirstName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  //? For name attribute...
                  //? Same (initialvalues) keyname => will be given
                  //? to this <input field/> name attribute
                  //? bcoz to identify the input field...
                  name="FirstName"
                  //? For value attribute...
                  //? The value for this input field will be empty
                  //? whenever the user makes changes on this input field => formik handleChange inbuilt function
                  //? is called and the initialvalues will be changed...
                  value={Input_Form_Validation.values.FirstName}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter First Name"
                />
                {/* ---IF ERRORS--- */}
                {Input_Form_Validation.errors.FirstName ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.FirstName}
                  </span>
                ) : null}
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              {/* Last Name */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputLastName">Last Name</label>
                <input
                  type="lastname"
                  className={`form-control ${
                    Input_Form_Validation.errors.LastName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="LastName"
                  value={Input_Form_Validation.values.LastName}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Last Name"
                />
                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.LastName}
                  </span>
                }
                {/* ---IF ERRORS--- */}
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
                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Email}
                  </span>
                }
                {/* ---IF ERRORS--- */}
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
                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Contact}
                  </span>
                }
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              {/* Address */}
              <div className="form-group col-lg-10">
                <label htmlFor="inputAddress">Address</label>
                <textarea
                  type="textarea"
                  className={`form-control ${
                    Input_Form_Validation.errors.Address
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Address"
                  value={Input_Form_Validation.values.Address}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Full Address"
                ></textarea>
                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Address}
                  </span>
                }
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              {/* State */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputState">State</label>

                <input
                  id="State"
                  list="StateTypes"
                  name="State"
                  value={Input_Form_Validation.values.State}
                  onChange={Input_Form_Validation.handleChange}
                  className={`form-control ${
                    Input_Form_Validation.errors.State
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  placeholder="Enter Your State"
                />
                <datalist id="StateTypes">
                  <option value={"TAMILNADU"}>TAMILNADU</option>
                </datalist>

                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.State}
                  </span>
                }
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              {/* Country */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputCountry">Country</label>
                <input
                  id="Country"
                  list="CountryTypes"
                  name="Country"
                  value={Input_Form_Validation.values.Country}
                  onChange={Input_Form_Validation.handleChange}
                  className={`form-control ${
                    Input_Form_Validation.errors.Country
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  placeholder="Enter Your Country"
                />
                <datalist id="CountryTypes">
                  <option value={"INDIA"}>INDIA</option>
                </datalist>

                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Country}
                  </span>
                }
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              {/* Pincode */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputZip">Pincode</label>
                <input
                  type="number"
                  className={`form-control ${
                    Input_Form_Validation.errors.Pincode
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Pincode"
                  value={Input_Form_Validation.values.Pincode}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Your Pincode"
                />
                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Pincode}
                  </span>
                }
                {/* ---IF ERRORS--- */}
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
                {/* ---IF ERRORS--- */}
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Gender}
                  </span>
                }
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              {/* End of Form Row */}
            </div>
            {/* -------------------------------------------- */}
            {/* SUBMIT BUTTON */}
            <div className="form-group col-md-10 mt-2">
              <button
                type={"submit"}
                value={"submit"}
                className="btn btn-primary "
              >
                {Btn_loading ? (
                  "SUBMIT"
                ) : (
                  //? SUBMIT BTN LOADER...
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

export default Add_Data;
