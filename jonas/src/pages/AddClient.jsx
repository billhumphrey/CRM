import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../styles/forms.css";
import {  useRef, useEffect } from "react";


const AddClient = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    email: "",
    phone: "",
    phoneNumber: "",
    contact1: "",
    contact2: "",
    address: "",
    passport: "",
    pcc: "",
    field: "",
    designation: "",
    registrationStatus: "",
    office: "",
    medical: "",
    payment: "",
    travel: "",
    interview: "",
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () =>
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      age: "",
      email: "",
      phone: "",
      phoneNumber: "",
      contact1: "",
      contact2: "",
      address: "",
      passport: "",
      pcc: "",
      field: "",
      designation: "",
      registrationStatus: "",
      office: "",
      medical: "",
      payment: "",
      travel: "",
      travelDate:"",
      interview: "",
      comments: "",
    });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const clientData = {
      ...formData,
      createdAt: Timestamp.now(),
    };
    await addDoc(collection(db, "clients"), clientData);
    console.log("Client added to Firestore:", clientData);
    resetForm();
    setSuccessMessage("Client added successfully!");

    timeoutRef.current = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error adding client:", error);
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

        <h2 className="text-2xl font-bold mb-2">Add New Client</h2>
        <p className="text-gray-600 mb-6">Enter client information to add them to your database</p>



        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">


          {/* Personal Information */}
          <div className="col-span-full">
            <h3 className="font-semibold text-lg mb-1">Personal Information</h3>
            <p className="text-sm text-gray-500 mb-3">Please fill in all required fields.</p>
          </div>

          <div>
            <label className="block mb-1">First Name *</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" required />
          </div>

          <div>
            <label className="block mb-1">Last Name *</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" required />
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="input" />
          </div>

          {/* Contact Info */}
          <div className="col-span-full mt-4">
            <h3 className="font-semibold text-lg mb-1">Contact Information</h3>
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Contact</label>
            <input type="text" name="contact1" value={formData.contact1} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Contact 2</label>
            <input type="text" name="contact2" value={formData.contact2} onChange={handleChange} className="input" />
          </div>

<div>
  <label className="block mb-1">Address</label>
  <input type="text" name="address" value={formData.address} onChange={handleChange} className="input" />
</div>


          {/* Documentation */}
          <div className="col-span-full mt-4">
            <h3 className="font-semibold text-lg mb-1">Documentation</h3>
          </div>

          <div>
            <label className="block mb-1">Passport</label>
            <input type="text" name="passport" value={formData.passport} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">PCC</label>
            <input type="text" name="pcc" value={formData.pcc} onChange={handleChange} className="input" />
          </div>

          {/* Service Information */}
          <div className="col-span-full mt-4">
            <h3 className="font-semibold text-lg mb-1">Service Information</h3>
          </div>

          <div>
            <label className="block mb-1">Field</label>
            <input type="text" name="field" value={formData.field} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Designation</label>
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Registration Status</label>
            <input type="text" name="registrationStatus" value={formData.registrationStatus} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="block mb-1">Office</label>
            <input type="text" name="office" value={formData.office} onChange={handleChange} className="input" />
          </div>

          {/* Additional Info */}
          <div className="col-span-full mt-4">
            <h3 className="font-semibold text-lg mb-1">Additional Information</h3>
          </div>

          <div>
            <label className="block mb-1">Medical</label>
            <select name="medical" value={formData.medical} onChange={handleChange} className="input">
              <option value="">Select</option>
              <option value="Completed">Cleared</option>
              <option value="Pending">Not Cleared</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Payment</label>
            <select name="payment" value={formData.payment} onChange={handleChange} className="input">
              <option value="">Select</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Travel</label>
            <select name="travel" value={formData.travel} onChange={handleChange} className="input">
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

          <div>
            <label className="block mb-1">Interview</label>
            <input type="text" name="interview" value={formData.interview} onChange={handleChange} className="input" />
          </div>

          <div className="col-span-full">
            <label className="block mb-1">Comments</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange} className="input" rows="3" placeholder="Any additional notes or comments..." />
          </div>

       {successMessage && (
       <div className="col-span-full mb-4 p-3 text-green-600 font-semibold bg-green-100 border border-green-300 rounded">
          {successMessage}
       </div>
        )}

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
              Add Client
            </button>
            <button
              type="button"
              onClick={() => setFormData({
                firstName: "",
                lastName: "",
                dob: "",
                age: "",
                email: "",
                phone: "",
                phoneNumber: "",
                contact1: "",
                contact2: "",
                address: "",
                passport: "",
                pcc: "",
                field: "",
                designation: "",
                registrationStatus: "",
                office: "",
                medical: "",
                payment: "",
                travel: "",
                interview: "",
                comments: "",
              })}
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

export default AddClient;
