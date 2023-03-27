import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit_Data = () => {
  //--------------------------------------------------------------------
  //? toast for updated...
  const success = () =>
    toast.success("Your Data is Updated", {
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
  //? React hook useState...
  const [Btn_loading, setBtn_loading] = useState(true);
  //-------------------------------------------------------------------
  //? useParams function from react-router-dom...
  const { StudentId } = useParams();

  //-------------------------------------------------------------------
  //? useNavigate is the method from react-router-dom..
  const navigate = useNavigate();
  //-------------------------------------------------------------------
  const Edit_Student_Data = useFormik({
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
    validate: (values) => {
      const errors = {};
      if (!values.FirstName) {
        errors.FirstName = "please enter first name";
      } else if (values.FirstName.length > 10) {
        errors.FirstName = " Characters should be below 10 ";
      } else if (values.FirstName.length <= 3) {
        errors.FirstName = "Characters should be above 3";
      }
      //--------------------------------------------------------------------
      if (!values.LastName) {
        errors.LastName = "please enter Last name";
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
      if (!values.Address) {
        errors.Address = "please enter Address";
      }
      //--------------------------------------------------------------------
      if (!values.State) {
        errors.State = "please Select State";
      }
      //--------------------------------------------------------------------
      if (!values.Country) {
        errors.Country = "please Select Country";
      }
      //--------------------------------------------------------------------
      if (!values.Pincode) {
        errors.Pincode = "please enter Pincode";
      }
      //--------------------------------------------------------------------
      if (!values.Gender) {
        errors.Gender = "please enter Gender";
      }
      //--------------------------------------------------------------------

      return errors;
    },
    onSubmit: async (values) => {
      try {
        //--------------------------------------------------------------------
        setBtn_loading(false);
        //--------------------------------------------------------------------
        //? Update values...
        //? After edited data validation is completed take the particular student id and add the updated values...
        await axios.put(
          `https://63ae591c3e465169166faea4.mockapi.io/student/${StudentId}`,
          values
        );
        //--------------------------------------------------------------------
        success();
        navigate("/dashboard/Student-Lists");
        //--------------------------------------------------------------------
      } catch (error) {
        alert(`<<< ! Something went wrong >>>
        => ${error}`);
        //--------------------------------------------------------------------
        setBtn_loading(true);
      }
    },
  });
  //-------------------------------------------------------------------
  useEffect(() => {
    Set_Student_Values();
    async function Set_Student_Values() {
      try {
        //? If we fetch data without await keyword means it will return response as a promise object...
        //? To handle the promise object we should use await keyword ...
        //? when edit button is clicked we have to set the values to the input fields
        //? For that we need to get the data from the server and then set the values to the useFormik initialvalues property...
        //-------------------------------------------------------------------
        const SetData = await axios.get(
          `https://63ae591c3e465169166faea4.mockapi.io/student/${StudentId}`
        );
        //-------------------------------------------------------------------
        //console.log(SetData.data);
        //? Before useFormik(object) we cannot (setValues => is a formik inbuilt function) to the initialvalues...
        Edit_Student_Data.setValues(SetData.data);
        //-------------------------------------------------------------------
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
            <h1 className="add-edit-title">ミ★ 𝘌𝘋𝘐𝘛 𝘋𝘈𝘛𝘈 ★彡</h1>
          </div>
          {/* onSubmit should be given to parent element (form) 
         bcoz if we given it to any input/button it will check the value of the particular field
         But , if we given it to <form> => parent element it will validate/check the value of the children also... */}
          <form onSubmit={Edit_Student_Data.handleSubmit}>
            <div className="form-row d-flex justify-content-center col-md-9 ml-lg-5 input-data-form p-3 bg-light form-div-element">
              {/* -------------------------------------------- */}

              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5 ">
                <label htmlFor="inputFirstName">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Edit_Student_Data.errors.FirstName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="FirstName"
                  value={Edit_Student_Data.values.FirstName}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter First Name"
                />
                {Edit_Student_Data.errors.FirstName ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.FirstName}
                  </span>
                ) : null}
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputLastName">Last Name</label>
                <input
                  type="lastname"
                  className={`form-control ${
                    Edit_Student_Data.errors.LastName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="LastName"
                  value={Edit_Student_Data.values.LastName}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter Last Name"
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.LastName}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className={`form-control ${
                    Edit_Student_Data.errors.Email ? "is-invalid" : "is-valid"
                  }`}
                  name="Email"
                  value={Edit_Student_Data.values.Email}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter Your Email"
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.Email}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputContact">Contact</label>
                <input
                  type="number"
                  className={`form-control ${
                    Edit_Student_Data.errors.Contact ? "is-invalid" : "is-valid"
                  }`}
                  name="Contact"
                  value={Edit_Student_Data.values.Contact}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter Your Number"
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.Contact}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-10">
                <label htmlFor="inputAddress">Address</label>
                <textarea
                  type="textarea"
                  className={`form-control ${
                    Edit_Student_Data.errors.Address ? "is-invalid" : "is-valid"
                  }`}
                  name="Address"
                  value={Edit_Student_Data.values.Address}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter Full Address"
                ></textarea>
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.Address}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* State */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputState">State</label>

                <input
                  id="State"
                  list="StateTypes"
                  name="State"
                  value={Edit_Student_Data.values.State}
                  onChange={Edit_Student_Data.handleChange}
                  className={`form-control ${
                    Edit_Student_Data.errors.State ? "is-invalid" : "is-valid"
                  }`}
                  placeholder="Enter Your State"
                />
                <datalist id="StateTypes">
                  <option value={""}>--Select--</option>
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
                    {Edit_Student_Data.errors.State}
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
                  value={Edit_Student_Data.values.Country}
                  onChange={Edit_Student_Data.handleChange}
                  className={`form-control ${
                    Edit_Student_Data.errors.Country ? "is-invalid" : "is-valid"
                  }`}
                  placeholder="Enter Your Country"
                />
                <datalist id="CountryTypes">
                  <option value={""}>--Select--</option>
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
                    {Edit_Student_Data.errors.Country}
                  </span>
                }
                {/* ---IF ERRORS--- */}
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputZip">Pincode</label>
                <input
                  type="number"
                  className={`form-control ${
                    Edit_Student_Data.errors.Pincode ? "is-invalid" : "is-valid"
                  }`}
                  name="Pincode"
                  value={Edit_Student_Data.values.Pincode}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter Your Pincode"
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.Pincode}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              <div className="form-group col-lg-5">
                <label htmlFor="inputGender">Gender</label>
                <input
                  type="text"
                  className={`form-control ${
                    Edit_Student_Data.errors.Gender ? "is-invalid" : "is-valid"
                  }`}
                  name="Gender"
                  value={Edit_Student_Data.values.Gender}
                  onChange={Edit_Student_Data.handleChange}
                  placeholder="Enter Your Gender"
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Student_Data.errors.Gender}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
            </div>

            <div className="form-group col-md-10 mt-2">
              <button
                type={"submit"}
                value={"UPDATE"}
                className="btn btn-primary "
              >
                {Btn_loading ? (
                  "UPDATE"
                ) : (
                  <div class="loader">
                    <div class="face">
                      <div class="circle"></div>
                    </div>
                    <div class="face">
                      <div class="circle"></div>
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

export default Edit_Data;
