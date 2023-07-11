import React, { useEffect, useState } from 'react'


const Interview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8880/interview`);
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>Mülakatlar</h1>
      <a href="/olustur" className="primarybutton">Oluştur</a>
      <table className='border-collapse border-2'>
        <thead>
          <tr>
            <th>Katılımcı</th>
            <th>Tarih</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, i) => {
              return (<tr key={i}>
                <td>
                  {item?.username}
                </td>
                <td>{item?.date}</td>
                <td>
                  <div className='flex flex-col items-center justify-center gap-y-1'>
                    <a
                      href={`/goruntule/${item?.id}`}
                      type="submit"
                      className='secbutton decoration-white'>
                      Görüntüle
                    </a>
                  </div>
                </td>
              </tr>)
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Interview