import {React, useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  
  const [items, setItems] = useState();

useEffect(() => {
axios.get('/gettodos')
.then(res => {
  setItems(res.data);
})
.catch(err => console.log(err))
}, [])

  return (
    <div>
      <h2>The Todoist</h2>
      <div className="seperator"></div>
      <h3>Tracking Tasks, So that you dont have to!</h3>
      <div className="seperator"></div>

        <div className="container">
        {
          items ? 
            items.map(item => 
              <div className="card" style={{background: `linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.imageURL}')`}}>
                <p>{item.title}</p>
                <div className="seperator"></div>
                <p>{item.description}</p>
              </div>
              )
          : 
          <h3>Loading...</h3>
        }
        </div>

    </div>
  );
}

export default App;