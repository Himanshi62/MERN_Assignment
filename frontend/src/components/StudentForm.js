import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: '',
    toeflScore: '',
    greScore: '',
    tenthMarks: '',
    twelfthMarks: '',
    graduationMarks: '',
    applications: []
  });

  const [universities, setUniversities] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [uniResponse, consultantResponse] = await Promise.all([
          axios.get('http://localhost:3000/universities'), 
          axios.get('http://localhost:3000/consultants') 
        ]);
        setUniversities(uniResponse.data);
        setConsultants(consultantResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown data', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleApplicationChange = (index, e) => {
    const { name, value } = e.target;
    const applications = [...studentData.applications];
    applications[index] = {
      ...applications[index],
      [name]: value
    };
    setStudentData({ ...studentData, applications });
  };

  const addApplication = () => {
    setStudentData({
      ...studentData,
      applications: [...studentData.applications, { universityId: '', targetDegree: '', targetCourse: '', consultantId: '', status: '' }]
    });
  };

  const removeApplication = (index) => {
    const applications = [...studentData.applications];
    applications.splice(index, 1);
    setStudentData({ ...studentData, applications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidObjectId = (id) => /^[0-9a-f]{24}$/.test(id);

    const hasInvalidIds = studentData.applications.some(app =>
      !isValidObjectId(app.universityId) || !isValidObjectId(app.consultantId)
    );

    if (hasInvalidIds) {
      alert('Please provide valid university and consultant IDs.');
      return;
    }

    const marks = {
      tenth: parseFloat(studentData.tenthMarks),
      twelfth: parseFloat(studentData.twelfthMarks),
      graduation: parseFloat(studentData.graduationMarks)
    };

    const newStudent = {
      ...studentData,
      marks,
      toeflScore: parseInt(studentData.toeflScore),
      greScore: parseInt(studentData.greScore)
    };

    console.log('Submitting student data:', newStudent);

    try {
      const response = await axios.post('http://localhost:3000/students', newStudent);
      alert('Student data submitted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting student data', error);
      alert('Failed to submit student data: ' + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Student Application Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(studentData).filter(key => key !== 'applications').map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key}:
            </label>
            <input
              type={key === 'dateOfBirth' ? 'date' : key.includes('Score') || key.includes('Marks') ? 'number' : 'text'}
              name={key}
              value={studentData[key]}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            />
          </div>
        ))}

        {/* Application fields */}
        {studentData.applications.map((application, index) => (
          <div key={index} className="border p-4 rounded-md mb-4">
            <h3 className="text-lg font-semibold">Application {index + 1}</h3>
            <button type="button" onClick={() => removeApplication(index)} className="text-red-500">Remove Application</button>
            <div className="space-y-2">

              {/* University dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">University:</label>
                <select
                  name="universityId"
                  value={application.universityId}
                  onChange={(e) => handleApplicationChange(index, e)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                >
                  <option value="">Select University</option>
                  {universities.map((uni) => (
                    <option key={uni._id} value={uni._id}>{uni.name}</option>
                  ))}
                </select>
              </div>

              {/* Consultant dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Consultant:</label>
                <select
                  name="consultantId"
                  value={application.consultantId}
                  onChange={(e) => handleApplicationChange(index, e)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                >
                  <option value="">Select Consultant</option>
                  {consultants.map((consultant) => (
                    <option key={consultant._id} value={consultant._id}>{consultant.name}</option>
                  ))}
                </select>
              </div>

              {/* Target Degree and Target Course */}
              {['targetDegree', 'targetCourse'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field} : 
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={application[field]}
                    onChange={(e) => handleApplicationChange(index, e)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                  />
                </div>
              ))}

              

            </div>
          </div>
        ))}

        <button type="button" onClick={addApplication} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mb-4">
          Add Application
        </button>

        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
