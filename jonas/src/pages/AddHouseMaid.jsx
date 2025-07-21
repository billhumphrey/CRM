import React, { useState } from "react";
import "../styles/forms.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase"; 

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
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
      medical: "",
      payment: "",
      kinName: "",
      relationship: "",
      kinContact1: "",
      kinContact2: "",
      comments: "",
    });
  } catch (error) {
    console.error("Error adding housemaid:", error);
    alert("Failed to add housemaid. Please try again.");
  }
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
              <option value="Ready">Ready</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Medical & Payment */}
          <h3 className="col-span-full font-semibold text-lg">Medical & Payment</h3>
          <div>
            <label>Medical</label>
            <select name="medical" value={formData.medical} onChange={handleChange} className="input short-field">
              <option value="">Select</option>
              <option value="Passed">Passed</option>
              <option value="Pending">Pending</option>
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
            <label>Next of Kin Name</label>
            <input name="kinName" value={formData.kinName} onChange={handleChange} className="input short-field" />
          </div>
          <div>
            <label>Relationship</label>
            <input name="relationship" value={formData.relationship} onChange={handleChange} className="input short-field" />
          </div>
          <div>
            <label>Phone</label>
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
            <label>Contact 2</label>
            <input
              type="tel"
              name="kinContact2"
              value={formData.kinContact2}
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
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHouseMaid;
