import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewInterview = ({ interviewId }) => {
  const [formData, setFormData] = useState({ username: '', questionset: ['', ''] });

  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        const response = await axios.get(`http://localhost:8880/interview/${interviewId}`);
        setFormData(response.data.data); // response.data.data kullanarak doğru verilere erişiyoruz
      } catch (error) {
        console.error(error);
        alert('Veriler getirilirken hata oluştu');
      }
    };

    fetchQuestionSet();
  }, [interviewId]);

  console.log(formData);

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-y-3 '>
      <h1>{formData.username}</h1> {/* formData.username ile kullanıcı adını yazdırıyoruz */}
      {formData.questionset && formData.questionset.length > 0 && (
        <ul>
          {formData.questionset.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewInterview;
