import { useState, useEffect } from "react";

function TestPage() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    message: "",
  });
  const [names, setNames] = useState([]);

  function handleChange(e) {
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    // e.preventDefault(); // Stops the page reload

    try {
      const response = await fetch("/api/storeInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInfo),
      });

      const data = await response.json();

      setFormInfo({
        name: "",
        message: "",
      });
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  }

  async function getData() {
    try {
      const response = await fetch("/api/getInfo", {
        method: "GET",
      });

      const data = await response.json();

      setNames(data);

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>

        <input
          type='text'
          id='name'
          name='name'
          value={formInfo.name}
          onChange={handleChange}
        />

        <br />

        <label htmlFor='message'>Message:</label>

        <input
          type='text'
          id='message'
          name='message'
          value={formInfo.message}
          onChange={handleChange}
        />

        <input type='submit' value='Submit' />
      </form>

      <button onClick={getData}>Get Names</button>

      {names.map((info, index) => {
        return (
          <div key={index}>
            {info.name}
            <br />
            {info.message}
          </div>
        );
      })}
    </div>
  );
}

export default TestPage;
