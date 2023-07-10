import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const initialFormValues = { username: "", date: "", questionset: [] };

const AddInterview = () => {
  const [formData, setFormData] = useState(initialFormValues);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedQuestions(e => [...e, {id: value}])
    } else {
      setSelectedQuestions(selectedQuestions.filter(item => item.id !== value))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let target = e.target[0];
      let nowDate = Date.now();
      setFormData(formData => ({ ...formData, date: nowDate, [target.name]: target.value }));
  
      const updatedFormData = { ...formData, date: nowDate, [target.name]: target.value };
      const response = await axios.post('http://localhost:8880/interview', updatedFormData);
  
      if (response.status === 200) {
        console.log("response", response?.data?.id)
        alert('Yeni mülakat oluşturuldu');
        navigate("/mulakat/baslat", {
          state: {
            interviewId: response?.data?.id
          }
        });
      } else {
        alert('Yeni mülakat oluşturulamadı!');
      }
    } catch (error) {
      console.error(error);
      alert('Mülakat oluşturulurken hata oluştu!');
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8880/questions');
      const jsonData = await response.json();
      setQuestions(jsonData.data);
      console.log("data",jsonData.data);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFormData(formData => ({ ...formData, questionset: selectedQuestions }));
  }, [selectedQuestions]);


  return (
    <div>
      <form className="flex flex-col justify-center items-center h-screen gap-y-3" onSubmit={handleSubmit}>
        <p className="w-[20rem] text-left text-3xl mb-0">Katılımcı:</p>
        <input className='input' type="text" name="username" placeholder="Add text" />
        <h1 className="mt-5">Sorular</h1>
        <p className="w-[20rem] text-left text-3xl mb-0">Soru Setleri</p>
        <div className="flex flex-col items-baseline justify-center">
          {questions &&
            questions.map((item, i) => (
              <div className="flex items-center justify-center gap-x-3" key={i}>
                <input type="checkbox" value={item.id} onChange={handleCheckboxChange} />
                {item.name}
              </div>
            ))}
        </div>
        <div className='flex'>
          {JSON.stringify(selectedQuestions)}
        </div>
        <Button  title="Başlat" type='submit'/>
      </form>
    </div>
  );
};

export default AddInterview;
