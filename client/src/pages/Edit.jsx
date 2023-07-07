import React, { useState, useEffect } from "react";
import axios from "axios";

const Edit = ({ questionSetId }) => {
  const [formData, setFormData] = useState({ name: "", questions: ["", ""] });
  const [value,setValue] = useState(formData.data)
  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8880/questions/${questionSetId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        alert("Veriler getirilirken hata oluştu");
      }
    };

    fetchQuestionSet();
  }, [questionSetId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: value,
      }));
    } else {
      const questionIndex = Number(name.split("[")[1].split("]")[0]);
      const updatedQuestions = [...formData.questions];
      updatedQuestions[questionIndex] = value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: updatedQuestions,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8880/questions/${questionSetId}`,
        formData
      );
      console.log(response.data);
      alert("Düzenlendi!");
    } catch (error) {
      console.error(error);
      alert("Düzenlenirken hata oluştu");
    }
  };
  var response = JSON.stringify(formData.data);
  if(response){
    console.log(JSON.parse(response).questions.length)
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-3">
       <h2>Başlık:</h2>
      <input
        type="text"
        className="input"
        name="name"
        value={JSON.stringify(value) && JSON.parse(JSON.stringify(value)).name}
        onChange={handleInputChange}
        onChangeText={(e)=>setValue(e.target.value)}
      />
      <h2>Sorular</h2>
      
      
      {JSON.stringify(formData.data) &&
        formData.data.questions.map((question, index) => (
          <input
  key={index}
  type="text"
  className="input"
  name={`questions[${index}]`}
  value={question || ""}
  onChange={handleInputChange}
/>
        ))}
        

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Edit;