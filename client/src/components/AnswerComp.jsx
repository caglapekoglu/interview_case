import axios from "axios";
import React, { useEffect, useState } from "react";
const AnswerComp = ({ interviewId }) => {
  const [questions, setQuestions] = useState([]);
  const [degrees, setdegrees] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8880/interview/${interviewId}`
      );
      if (response.status === 200) {
        const data = response.data.data;
        if (Array.isArray(data.questionset)) {
          data?.questionset?.forEach((val) => {
            getQuestions(val);
          });
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

  const getQuestions = async (data) => {
    const responseQuestion = await axios.get(
      `http://localhost:8880/questions/${data.id}`
    );
    setQuestions((quest) => [
      ...quest,
      ...responseQuestion.data.data.questions,
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [interviewId]);

  return (
    <div>
      <div>
        {questions &&
          questions.map((question, i) => {
            return (
              <div>
                <h2 key={i}>{question}</h2>
                <div className="grid">
                {options.map((item,i)=>{
                    return(
                       <label className="flex" key={i}>
                         <input type="radio" value={item.level} checked={item.level==degrees} onChange={()=>setdegrees(item.level)}/>
                         <p>{item.title}</p>
                       </label>
                    );
                })}
                </div>
               
                <input type="radio" />
              </div>
            );
          })}

      </div>
      <button className="primarybutton">İlerle</button>
    </div>
  );
};

export default AnswerComp;
