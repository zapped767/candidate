import React, { useState, useEffect, useRef } from 'react';
import './TrailRequestForm.css';



const TrailRequestForm = () => {
  const [formData, setFormData] = useState({
    lPermitDate: '',
    drivingSchoolName: '',
    lPermit: null,
    medicalFront: null,
    medicalBack: null,
  });

  const [pdfPreviews, setPdfPreviews] = useState({
    lPermit: null,
    medicalFront: null,
    medicalBack: null,
  });

  // Store created URLs to properly clean them up
  const urlRefs = useRef({
    lPermit: null,
    medicalFront: null,
    medicalBack: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      
      // Revoke previous URL if exists
      if (urlRefs.current[name]) {
        URL.revokeObjectURL(urlRefs.current[name]);
      }

      // Create new URL and store it
      const newUrl = URL.createObjectURL(file);
      urlRefs.current[name] = newUrl;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setPdfPreviews((prev) => ({
        ...prev,
        [name]: newUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('lPermitDate', formData.lPermitDate);
    payload.append('drivingSchoolName', formData.drivingSchoolName);
    payload.append('lPermit', formData.lPermit);
    payload.append('medicalFront', formData.medicalFront);
    payload.append('medicalBack', formData.medicalBack);

    try {
      const res = await fetch('http://localhost:8080/api/trail-request', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Trail Request Submitted Successfully!');
      setFormData({
        lPermitDate: '',
        drivingSchoolName: '',
        lPermit: null,
        medicalFront: null,
        medicalBack: null,
      });
      setPdfPreviews({
        lPermit: null,
        medicalFront: null,
        medicalBack: null,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to submit trail request. Please try again.');
    }
  };

  useEffect(() => {
    return () => {
      // Clean up all URLs when component unmounts
      Object.values(urlRefs.current).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleViewPdf = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="form-container">
      <h2>Request Trail Date</h2>
      <form onSubmit={handleSubmit}>
        <label>L Permit Date</label>
        <input
          type="date"
          name="lPermitDate"
          value={formData.lPermitDate}
          onChange={handleChange}
          required
        />

        <label>Driving School Name</label>
        <input
          type="text"
          name="drivingSchoolName"
          value={formData.drivingSchoolName}
          onChange={handleChange}
          required
        />

        <label>L Permit (PDF)</label>
        <input
          type="file"
          name="lPermit"
          accept="application/pdf"
          onChange={handleChange}
          required
        />
        {pdfPreviews.lPermit && (
          <button type="button" onClick={() => handleViewPdf(pdfPreviews.lPermit)}>
            View L Permit
          </button>
        )}

        <label>Medical (Front and Back PDFs)</label>
        <div className="medical-uploads">
          <div>
            <input
              type="file"
              name="medicalFront"
              accept="application/pdf"
              onChange={handleChange}
              required
            />
            {pdfPreviews.medicalFront && (
              <button type="button" onClick={() => handleViewPdf(pdfPreviews.medicalFront)}>
                View Front
              </button>
            )}
          </div>

          <div>
            <input
              type="file"
              name="medicalBack"
              accept="application/pdf"
              onChange={handleChange}
              required
            />
            {pdfPreviews.medicalBack && (
              <button type="button" onClick={() => handleViewPdf(pdfPreviews.medicalBack)}>
                View Back
              </button>
            )}
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">SUBMIT</button>
          <button type="button" onClick={() => window.location.href = '/dashboard'}>
            Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrailRequestForm;