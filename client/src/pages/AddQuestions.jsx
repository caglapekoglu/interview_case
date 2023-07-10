import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

const initialFormValues = { name: "", questions: [""] };

const AddQuestions = () => {
  const [formData, setFormData] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("question.")) {
      const questionIndex = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        questions: prevData.questions.map((question, index) =>
          index.toString() === questionIndex ? value : question
        )
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8880/questions", {
        ...formData,
        questions: formData.questions
      });
      console.log(response.data);
      alert("Yeni soru seti eklendi!");
    } catch (error) {
      console.error(error);
      alert("Soru seti eklenirken hata oluştu!");
    }
  };

  const addQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, ""]
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-3">
      <p className="w-[20rem] text-left text-3xl mb-0">Başlık:</p>
      <input
        className="input"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Add text"
      />
      <h1 className="mt-5">Sorular</h1>
      {formData.questions.map((question, index) => (
        <div key={index}>
          <p className="w-[20rem] text-left text-3xl mb-0">Soru:</p>
          <input
            className="input"
            type="text"
            name={`question.${index}`}
            value={question}
            onChange={handleInputChange}
            placeholder="Add text"
          />
        </div>
      ))}
      <button className="secbutton rounded-md mt-5" onClick={addQuestion}>
        Soru Ekle
      </button>
      <Button title="Kaydet" onClick={handleSubmit} />
    </div>
  );
};

export default AddQuestions;
