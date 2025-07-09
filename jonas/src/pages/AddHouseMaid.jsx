import React, { useState } from "react";
import "../styles/forms.css";

const AddHouseMaid = () => {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedMaids = JSON.parse(localStorage.getItem("housemaids")) || [];
    localStorage.setItem("housemaids", JSON.stringify([...storedMaids, formData]));
    console.log("Housemaid added:", formData);
    setFormData({
      name: "",
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
  };

  return (
    <div className="container">
      <h2>Add New Housemaid</h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter the housemaid's information to add them to your database.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="col-span-full">Basic Information</h3>
        <div>
          <label>Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="input"
          />
        </div>

        <h3 className="col-span-full">Documentation</h3>
        <div>
          <label>Passport</label>
          <input
            name="passport"
            value={formData.passport}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>PCC</label>
          <input
            name="pcc"
            value={formData.pcc}
            onChange={handleChange}
            className="input"
          />
        </div>

        <h3 className="col-span-full">Professional Information</h3>
        <div>
          <label>Training</label>
          <select
            name="training"
            value={formData.training}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
        <div>
          <label>Office</label>
          <input
            name="office"
            value={formData.office}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Exit</label>
          <input
            name="exit"
            value={formData.exit}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Travel</label>
          <select
            name="travel"
            value={formData.travel}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select</option>
            <option value="Ready">Ready</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <h3 className="col-span-full">Medical & Payment</h3>
        <div>
          <label>Medical</label>
          <select
            name="medical"
            value={formData.medical}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select</option>
            <option value="Passed">Passed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <label>Payment</label>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <h3 className="col-span-full">Next of Kin</h3>
        <div>
          <label>Next of Kin Name</label>
          <input
            name="kinName"
            value={formData.kinName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Relationship</label>
          <input
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            name="kinContact1"
            value={formData.kinContact1}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Contact 2</label>
          <input
            name="kinContact2"
            value={formData.kinContact2}
            onChange={handleChange}
            className="input"
          />
        </div>

        <h3 className="col-span-full">Additional Information</h3>
        <div className="col-span-full">
          <label>Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="input"
            placeholder="Any additional notes or comments..."
          />
        </div>

        <div className="col-span-full flex gap-3 mt-4">
          <button type="submit">Add Housemaid</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddHouseMaid;
