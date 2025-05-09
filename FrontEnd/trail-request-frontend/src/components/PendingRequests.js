import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [pdfPreview, setPdfPreview] = useState({ show: false, url: '', title: '' });

  const API_BASE = 'http://localhost:8080/api/trail-request';

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${API_BASE}/approve/${id}`);
      setAlert({ show: true, message: 'Approved successfully', type: 'success' });

      setRequests(prev => prev.map(req =>
        req.id === id ? { ...req, status: 'approved' } : req
      ));

      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error approving request:', err);
      setAlert({ show: true, message: 'Error approving request', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.post(`${API_BASE}/deny/${id}`);
      setAlert({ show: true, message: 'Denied successfully', type: 'success' });

      setRequests(prev => prev.map(req =>
        req.id === id ? { ...req, status: 'denied' } : req
      ));

      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error denying request:', err);
      setAlert({ show: true, message: 'Error denying request', type: 'error' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    }
  };

  const handleViewPdf = (filePath, title) => {
    if (!filePath) return;
    const filename = filePath.split(/[/\\]/).pop();
    const fullUrl = `${API_BASE}/files/${filename}`;
  
    setPdfPreview({
      show: true,
      url: fullUrl,
      title: title,
    });
  };
  
  

  const closePdfPreview = () => {
    setPdfPreview({ show: false, url: '', title: '' });
  };

  const filteredRequests = requests.filter(req =>
    req.drivingSchoolName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!req.status || req.status === 'pending')
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{
        fontWeight: 'bold',
        fontSize: '24px',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        <span style={{ backgroundColor: '#E0E7FF', padding: '5px 15px', borderRadius: '20px' }}>
          Pending Requests
        </span>
      </h2>

      {/* Alert notification */}
      {alert.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: alert.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: alert.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${alert.type === 'success' ? '#10b981' : '#ef4444'}`,
          borderRadius: '6px',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {alert.message}
        </div>
      )}

      {/* PDF Preview Modal */}
      {pdfPreview.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <h3>{pdfPreview.title}</h3>
              <button
                onClick={closePdfPreview}
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #ef4444',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <iframe
                src={pdfPreview.url}
                style={{ width: '100%', height: '70vh', border: 'none' }}
                title="PDF Preview"
              >
                <p>Your browser does not support PDFs. Please download the PDF to view it: 
                  <a href={pdfPreview.url}>Download PDF</a>.
                </p>
              </iframe>
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      {/* Requests Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Medical Report</th>
            <th>L - Permit</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req, index) => (
            <tr key={req.id} style={{
              textAlign: 'center',
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff'
            }}>
              <td>{index + 1}</td>
              <td>CD{req.id.toString().padStart(4, '0')}</td>
              <td>
                <button
                  onClick={() => handleViewPdf(req.medicalFrontPath, 'Medical Report - Front')}
                  style={{
                    color: 'green',
                    border: '1px solid green',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    marginRight: '5px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  MF
                </button>
                <button
                  onClick={() => handleViewPdf(req.medicalBackPath, 'Medical Report - Back')}
                  style={{
                    color: 'green',
                    border: '1px solid green',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  MB
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleViewPdf(req.lpermitPath,'L-Permit')}
                  style={{
                    color: 'red',
                    border: '1px solid red',
                    padding: '2px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  L
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleApprove(req.id)}
                  style={{
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    marginRight: '8px',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Approval
                </button>
                <button
                  onClick={() => handleDeny(req.id)}
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    border: '1px solid #ef4444',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Denied
                </button>
              </td>
            </tr>
          ))}
          {filteredRequests.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No pending requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRequests;
