import React, { useState } from "react";
import "../styles/forms.css";


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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
    localStorage.setItem("clients", JSON.stringify([...storedClients, formData]));
    console.log("Client added:", formData);
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
      interview: "",
      comments: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
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

        <div className="col-span-full">
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
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
            <option value="Scheduled">Scheduled</option>
            <option value="Not Scheduled">Not Scheduled</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Interview</label>
          <input type="text" name="interview" value={formData.interview} onChange={handleChange} className="input" />
        </div>

        <div className="col-span-full">
          <label className="block mb-1">Comments</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange} className="input" rows="3" placeholder="Any additional notes or comments..." />
        </div>

        <div className="col-span-full flex gap-4 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Client</button>
          <button type="button" onClick={() => setFormData({})} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
