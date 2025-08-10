import React, { useState } from "react";
import "../styles/forms.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase"; 
import {  useRef, useEffect } from "react";
import { serverTimestamp } from "firebase/firestore";


const db = getFirestore(app);


const AddHouseMaid = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    contact: "",
    passport: "",
    pcc: "",
    training: "",
    office: "",
    exit: "",
    travel: "",
    medical: "",
    payment: "",
    kinName: "",
    relationship: "",
    kinContact1: "",
    kinContact2: "",
    comments: "",
  });


    const [successMessage, setSuccessMessage] = useState("");
    const timeoutRef = useRef(null);
  
    useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "dob") {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setFormData({
      ...formData,
      dob: value,
      age: age >= 0 ? age : ""
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleNumericChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      handleChange(e);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "maid"), formData);
    console.log("Housemaid added with ID:", docRef.id);

    alert("Housemaid added successfully!");

    setFormData({
      name: "",
      lastName: "",
      contact: "",
      passport: "",
      pcc: "",
      training: "",
      office: "",
      exit: "",
      travel: "",
      travelDate:"",
      medical: "",
      payment: "",
      kinName: "",
      kinName2: "",
      kinName3: "",
      relationship: "",
      kinContact1: "",
      kinContact2: "",
      kinContact3: "",
      comments: "",
      createdAt: serverTimestamp(),
    });

    setSuccessMessage("Client added successfully!");

    timeoutRef.current = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error adding housemaid:", error);
    alert("Failed to add housemaid. Please try again.");
  }
};

const handleDateChange = (e) => {
  let { name, value } = e.target;

  // Remove all non-digits
  value = value.replace(/\D/g, "");

  // Insert slashes for DD/MM/YYYY
  if (value.length > 4) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
  } else if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};





  return (
    <div className="container min-h-screen bg-[#f3f4f6] px-4 py-6">
      <div className="form-wrapper max-w-4xl mx-auto shadow-md p-6 bg-white rounded-md">
        <h2 className="text-2xl font-bold mb-2">Add New Housemaid</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the housemaid's information to add them to your database.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <h3 className="col-span-full font-semibold text-lg">Basic Information</h3>
          <div>
            <label>First Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input short-field"
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input short-field"
            />
          </div>
          <div>
            <label>Contact</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleNumericChange}
              className="input short-field"
              maxLength={15}
            />
          </div>

{/* DOB field */}
<div>
  <label className="block mb-1">Date of Birth</label>
  <input
    type="date"
    name="dob"
    value={formData.dob}
    onChange={handleChange}
    className="input"
  />
</div>

{/* Age field */}
<div>
  <label className="block mb-1">Age</label>
  <input
    type="number"
    name="age"
    value={formData.age}
    onChange={handleChange}
    className="input"
    disabled={!formData.dob}
    style={{ backgroundColor: !formData.dob ? "#f3f4f6" : "white" }}
  />
</div>

          {/* Documentation */}
          <h3 className="col-span-full font-semibold text-lg">Documentation</h3>
          <div>
            <label>Passport</label>
            <input name="passport" value={formData.passport} onChange={handleChange} className="input short-field" />
          </div>
          <div>
            <label>PCC</label>
            <input name="pcc" value={formData.pcc} onChange={handleChange} className="input short-field" />
          </div>

          {/* Professional */}
          <h3 className="col-span-full font-semibold text-lg">Professional Information</h3>
          <div>
            <label>Training</label>
            <select name="training" value={formData.training} onChange={handleChange} className="input short-field">
              <option value="">Select</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
          <div>
            <label>Office</label>
            <input name="office" value={formData.office} onChange={handleChange} className="input short-field" />
          </div>
          <div>
            <label>Exit</label>
            <input name="exit" value={formData.exit} onChange={handleChange} className="input short-field" />
          </div>
          <div>
            <label>Travel</label>
            <select name="travel" value={formData.travel} onChange={handleChange} className="input short-field">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
           <label>Travel Date</label>
           <input
            name="travelDate"
            value={formData.travelDate}
            onChange={handleDateChange}
            className="input short-field"
            placeholder="DD/MM/YYYY"
            pattern="\d{2}/\d{2}/\d{4}"
            title="Enter date in DD/MM/YYYY format"
            maxLength={10}
           />
          </div>


          {/* Medical & Payment */}
          <h3 className="col-span-full font-semibold text-lg">Medical & Payment</h3>
          <div>
            <label>Medical</label>
            <select name="medical" value={formData.medical} onChange={handleChange} className="input short-field">
              <option value="">Select</option>
              <option value="Passed">Cleared</option>
              <option value="Pending">Not Cleared</option>
            </select>
          </div>
          <div>
            <label>Payment</label>
            <select name="payment" value={formData.payment} onChange={handleChange} className="input short-field">
              <option value="">Select</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          {/* Kin */}
          <h3 className="col-span-full font-semibold text-lg">Next of Kin</h3>
          <div>
            <label>Kin name 1</label>
            <input name="kinName" value={formData.kinName} onChange={handleChange} className="input short-field" />
          </div>

          <div>
            <label>Kin 1 Contact</label>
            <input
              type="tel"
              name="kinContact1"
              value={formData.kinContact1}
              onChange={handleNumericChange}
              className="input short-field"
              maxLength={15}
            />
          </div>
<div>
  <label>Kin Name 2</label>
  <input
    type="text" 
    name="kinName2"
    value={formData.kinName2 || ""}
    onChange={handleChange}
    className="input short-field"
  />
</div>

          <div>
            <label>kin 2 Contact </label>
            <input
              type="tel"
              name="kinContact2"
              value={formData.kinContact2}
              onChange={handleNumericChange}
              className="input short-field"
              maxLength={15}
            />
          </div>

          <div>
            <label>Kin name 3</label>
            <input name="kinName3" value={formData.kinName3} onChange={handleChange} className="input short-field" />
          </div>

          <div>
            <label>Kin 3 Contact</label>
            <input
              type="tel"
              name="kinContact3"
              value={formData.kinContact3}
              onChange={handleNumericChange}
              className="input short-field"
              maxLength={15}
            />
          </div>

          {/* Comments */}
          <h3 className="col-span-full font-semibold text-lg">Additional Information</h3>
          <div className="col-span-full">
            <label>Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="input short-field"
              placeholder="Any additional notes or comments..."
            />
          </div>

       {successMessage && (
       <div className="col-span-full mb-4 p-3 text-green-600 font-semibold bg-green-100 border border-green-300 rounded">
          {successMessage}
       </div>
        )}


          {/* Buttons */}
          <div className="col-span-full" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                backgroundColor: '#1f2937',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Add Housemaid
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  lastName: "",
                  contact: "",
                  passport: "",
                  pcc: "",
                  training: "",
                  office: "",
                  exit: "",
                  travel: "",
                  travelDate: "",
                  medical: "",
                  payment: "",
                  kinName: "",
                  relationship: "",
                  kinContact1: "",
                  kinContact2: "",
                  comments: "",
                })
              }
              style={{
                flex: 1,
                backgroundColor: 'white',
                color: 'red',
                border: '1.5px solid red',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Clear Entries
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHouseMaid;
