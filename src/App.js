import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [monitors, setMonitors] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    query: "",
    type: "",
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMonitors();
  }, []);

  const fetchMonitors = async () => {
    try {
      const response = await axios.get(
        "https://api.datadoghq.com/api/v1/monitors",
        {
          headers: {
            "DD-API-KEY": "YOUR_API_KEY",
            "DD-APPLICATION-KEY": "YOUR_APPLICATION_KEY",
          },
        }
      );
      setMonitors(response.data.monitors);
    } catch (error) {
      console.error("Error fetching monitors: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.datadoghq.com/api/v1/monitors",
        formData,
        {
          headers: {
            "DD-API-KEY": "dfc8e890e58031e8c89fabd715a3cbe6",
            "DD-APPLICATION-KEY": "44d0edc46f1ee3b5d24249701803d3a87c6315e4",
            "Content-Type": "application/json",
          },
        }
      );
      setMonitors([...monitors, response.data]);
      setFormData({
        message: "",
        name: "",
        query: "",
        type: "",
      });
    } catch (error) {
      console.error("Error creating monitor:", error);
    }
  };

  return (
    <div>
      <h1>DataDog Monitor Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Query</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor)=>(
            <tr key={monitor.id}>
              <td>{monitor.name}</td>
              <td>{monitor.message}</td>
              <td>{monitor.query}</td>
              <td>{monitor.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick = {()=>setShowForm(true)}>Create New Monitor</button>
      {
        showForm && (
          <form onSubmit={handleSubmit}>
            <label>
              Message :
              <input type="text"  name = "message" value = {formData.message} onChange={handleChange} />
            </label>
            <label>
              Name :
              <input type="text"  name = "name" value = {formData.name} onChange={handleChange} />
            </label>
            <label>
              Query :
              <input type="text"  name = "query" value = {formData.query} onChange={handleChange} />
            </label>
            <label>
              Type :
              <input type="text"  name = "type" value = {formData.type} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        )
      }
    </div>
  );
};

export default App;
