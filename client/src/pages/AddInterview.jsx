import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormValues = { username: "", date: "", questionset: [] };

const AddInterview = () => {
  const [formData, setFormData] = useState(initialFormValues);
  const [questions, setQuestions] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedQuestionset = [...formData.questionset];

    if (checked) {
      updatedQuestionset.push(value);
    } else {
      updatedQuestionset = updatedQuestionset.filter((item) => item !== value);
    }

    setFormData({ ...formData, questionset: updatedQuestionset });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8880/interview', formData);
      console.log(response.data);
      alert('Yeni mülakat oluşturuldu!');
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
      console.log(jsonData);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form className="flex flex-col justify-center items-center h-screen gap-y-3" onSubmit={handleSubmit}>
        <p className="w-[20rem] text-left text-3xl mb-0">Katılımcı:</p>
        <input className="input" type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Add text" />
        <h1 className="mt-5">Sorular</h1>
        <p className="w-[20rem] text-left text-3xl mb-0">Soru Setleri</p>
        <div className="flex flex-col items-baseline justify-center">
          {questions &&
            questions.map((item, i) => (
              <div className="flex items-center justify-center gap-x-3" key={i}>
                <input type="checkbox" value={item.name} onChange={handleCheckboxChange} />
                {item.name}
              </div>
            ))}
        </div>
        <a href='mulakat/baslat' className="primarybutton" type="submit">
          Başlat
        </a>
      </form>
    </div>
  );
};

export default AddInterview;
