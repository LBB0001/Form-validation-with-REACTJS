import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        countryCode: '',
        mobileNumber: '',
        age: ''
    });

    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const validate = () => {
        let errors = {};

        // Validate Name (only letters)
        if (!formData.name) {
            errors.name = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            errors.name = "Name must contain only letters";
        }

        // Validate Address
        if (!formData.address) {
            errors.address = "Address is required";
        } else if (formData.address.length < 10) {
            errors.address = "Address must be at least 10 characters long";
        }

        // Validate Country Code
        if (!formData.countryCode) {
            errors.countryCode = "Country code is required";
        }

        // Validate Mobile Number
        if (!formData.mobileNumber) {
            errors.mobileNumber = "Mobile number is required";
        } else if (!/^\d{10,}$/.test(formData.mobileNumber)) {
            errors.mobileNumber = "Mobile number must be at least 10 digits long and contain only numbers";
        }

        // Validate Age (only 18+)
        if (!formData.age) {
            errors.age = "Age is required";
        } else if (isNaN(formData.age) || formData.age < 18) {
            errors.age = "Age must be a number and at least 18";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (isEditing) {
                const updatedData = [...submittedData];
                updatedData[currentIndex] = formData;
                setSubmittedData(updatedData);
                setIsEditing(false);
                setCurrentIndex(null);
            } else {
                setSubmittedData([...submittedData, formData]);
            }
            setFormData({
                name: '',
                address: '',
                countryCode: '',
                mobileNumber: '',
                age: ''
            });
        }
    };

    const handleDelete = (index) => {
        const updatedData = submittedData.filter((_, i) => i !== index);
        setSubmittedData(updatedData);
    };

    const handleEdit = (index) => {
        setFormData(submittedData[index]);
        setIsEditing(true);
        setCurrentIndex(index);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div>
                    <label>Country Code:</label>
                    <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    >
                        <option value="">Select Country Code</option>
                        <option value="US">+91</option>
                        <option value="IN">+1</option>
                        <option value="CA">+44</option>
                        <option value="CA">+61</option>
                        
                    </select>
                    {errors.countryCode && <span className="error">{errors.countryCode}</span>}
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    />
                    {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="text"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                    {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <button type="submit">{isEditing ? "Update" : "Submit"}</button>
            </form>

            <div className="submitted-data">
                {submittedData.map((data, index) => (
                    <div key={index} className="data-item">
                        <p>Name: {data.name}</p>
                        <p>Address: {data.address}</p>
                        <p>Country Code: {data.countryCode}</p>
                        <p>Mobile Number: {data.mobileNumber}</p>
                        <p>Age: {data.age}</p>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegistrationForm;
