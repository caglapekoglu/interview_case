import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";

const Edit = ({ questionSetId }) => {
  const [formData, setFormData] = useState({ name: "", questions: [] });

  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        const response = await axios.get(`http://localhost:8880/questions/${questionSetId}`);
        console.log(response.data)
        setFormData(response.data.data);
      } catch (error) {
        console.error(error);
        alert("Veriler getirilirken hata oluştu");
      }
    };

    fetchQuestionSet();
  }, [questionSetId]);

  const handleInputChange = (e, qId) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: value,
      }));
    } else {
      const updatedQuestions = [...formData.questions];
      updatedQuestions[qId] = value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: updatedQuestions,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8880/questions/${questionSetId}`, formData);
      console.log(response.data);
      alert("Düzenlendi!");
    } catch (error) {
      console.error(error);
      alert("Düzenlenirken hata oluştu");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-3">
      <h2>Başlık:</h2>
      <input
        className="input"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <h2>Sorular</h2>
      {formData.questions.map((question, index) => (
        <div key={index}>
          <p className="w-[20rem] text-left text-3xl mb-0">Soru:</p>
          <input
            className="input"
            type="text"
            name={`questions.${index}`}
            value={question || ""}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Add text"
          />
        </div>
      ))}
      <Button title="Kaydet" onClick={handleSave} />
    </div>
  );
};

export default Edit;
