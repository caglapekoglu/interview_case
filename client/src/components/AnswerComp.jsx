import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
const AnswerComp = ({ interviewId }) => {
  const [questions, setQuestions] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const options = [
    {
      title: "yetersiz",
      level: 0,
    },
    {
      title: "Orta",
      level: 1,
    },
    {
      title: "İyi",
      level: 2,
    },
    {
      title: "Çok iyi",
      level: 3,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8880/interview/${interviewId}`);
        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data.questionset)) {
            const questionIds = data.questionset.map((val) => val.id);
            getQuestions(questionIds);
          } else {
            alert("Veri yapısı hatalı. Beklenen dizi bulunamadı.");
          }
        } else {
          alert("Mülakat başlarken sorun oluştu!");
        }
      } catch (error) {
        console.error(error);
        alert("Bir hata oluştu. Veri alınamadı.");
      }
    };

    const getQuestions = async (questionIds) => {
      try {
        const questionPromises = questionIds.map(async (questionId) => {
          const response = await axios.get(`http://localhost:8880/questions/${questionId}`);
          return response.data.data.questions;
        });
        const questionResponses = await Promise.all(questionPromises);
        const newQuestions = questionResponses.flat();
        setQuestions(newQuestions);
      } catch (error) {
        console.error(error);
        alert("Bir hata oluştu. Sorular alınamadı.");
      }
    };

    if (interviewId) {
      fetchData();
    }
  }, [interviewId]);

  const handleAnswerChange = (i, level) => {
    setDegrees((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[i] = level;
      return newAnswers;
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-y-6 pt-8 items-start mx-[30%]">
        {questions.map((question, i) => (
          <div className="flex justify-center flex-col " key={i}>
            <h2 className="px-7 py-3 w-[500px] border-[#D1D1D1] border-2">{question}</h2>
            <div className="grid">
              {options.map((item) => (
                <label className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    value={item.level}
                    checked={degrees[i] === item.level}
                    onChange={() => handleAnswerChange(i, item.level)}
                  />
                  <p className="mb-0">{item.title}</p>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div>
        <Button title="İlerle"/>
        </div>
      </div>
      
    </div>
  );
};

export default AnswerComp;
