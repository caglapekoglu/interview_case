import React, { useState } from 'react';
import axios from 'axios';

const initialFormValues = { name: '', questions: ['', ''] };

const AddQuestions = () => {
  const [formData, setFormData] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith('questions')) {
      const questionIndex = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        questions: { ...prevData.questions, [questionIndex]: value }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8880/questions', { ...formData, questions: Object.values(formData.questions) });
      console.log(response.data);
      alert('Yeni soru seti eklendi!');
    } catch (error) {
      console.error(error);
      alert('Soru seti eklenirken hata oluştu!');
    }
  };
  
  return (
    <div>
      <form className='flex flex-col justify-center items-center h-screen gap-y-3' onSubmit={handleSubmit}>
        <p className='w-[20rem] text-left text-3xl mb-0'>Başlık:</p>
        <input className='input' type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Add text' />
        <h1 className='mt-5'>Sorular</h1>
        <p className='w-[20rem] text-left text-3xl mb-0'>Soru:</p>
        <input className='input' type='text' name='questions.0' value={formData.questions[0]} onChange={handleInputChange} placeholder='Add text' />
        <p className='w-[20rem] text-left text-3xl mt-4 mb-0'>Soru:</p>
        <input className='input' type='text' name='questions.1' value={formData.questions[1]} onChange={handleInputChange} placeholder='Add text' />
        <button className='primarybutton' type='submit'>Kaydet</button>
      </form>
    </div>
  );
};

export default AddQuestions;