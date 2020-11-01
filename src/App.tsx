import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  // const [title, setTitle] = useState('')
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts/1')
  //        .then(res => {
  //          console.log(res)
  //          setTitle(res.data.title)
  //        })
  // }, [title]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formdata = new FormData()
      formdata.append(uploadedFile.name, uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts/', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
  return (
    <div className="App">
      <input type="file" onChange={handleFileChange}/>
    </div>
  );
}

export default App;
