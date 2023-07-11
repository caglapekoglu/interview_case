import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewInterview = ({ interviewId }) => {
  const [formData, setFormData] = useState(null);
  const [degrees, setDegrees] = useState(null)

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
    const fetchQuestionSetv2 = async () => {
      try {
        const response = await axios.get(`http://localhost:8880/answer/${interviewId}`);
        setDegrees(Object?.values(response.data?.data?.degrees))

      } catch (error) {
        console.error(error);
        alert('Veriler getirilirken hata oluştu');
      }
    };

    fetchQuestionSet();
    fetchQuestionSetv2();
  }, [interviewId]);


  console.log(degrees)

  return (
    <div className='flex flex-col justify-center items-center h-screen  '>
      <h1>{formData?.username}</h1> {/* formData.username ile kullanıcı adını yazdırıyoruz */}
      {formData?.questionset && formData?.questionset?.length > 0 && (
        <ul>
          {/* {formData?.questionset?.map((question, index) => (
            <li key={index}>{degrees}</li>
          ))} */}
          {degrees?.map((item, i) => (
            <li key={i}>{i}. soru: {item} puan</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewInterview;
