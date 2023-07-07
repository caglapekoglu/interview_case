import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8880/questions`);
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };
  const deletes = async (data) => {
    const confirmDelete = window.confirm("Bu öğeyi silmek istediğinizden emin misiniz?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8880/questions/${data?.id}`, {
          method: "DELETE"
        });
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>Soru Setleri</h1>
      <a href='/ekle' className="primarybutton">Ekle</a>
      <table className='border-collapse border-2'>
      <thead>
        <tr>
          <th>İsim</th>
          <th>İşlem</th>
        </tr>
        </thead>
        <tbody>
        {data &&
            data.map((item,i) => {
              return (<tr key={i}>
          <td>
           {item?.name}
          </td>
          <td>
            <div className='flex flex-col items-center justify-center gap-y-1'>
            <a
                      href={`/duzenle/${item?.id}`}
                      type="submit"
                     className='secbutton decoration-white'>
              Düzenle
            </a>
            <button onClick={ () => deletes(item)} className='secbutton'>
              Sil
            </button>
            </div>
          </td>
          </tr>)})}
          </tbody>
      </table>
    </div>
  )
}

export default Home