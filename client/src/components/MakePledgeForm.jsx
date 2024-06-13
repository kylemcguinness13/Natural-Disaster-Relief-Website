import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MakePledgeForm.css'; // Ensure you've created this CSS file

function MakePledgeForm() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = () => {
    fetch("http://localhost:3000/api/requests/getcategories")
        .then((response) => response.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => {
            console.error(error);
        });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const requestData = {
        Category: formData.get('category'),
        RequestQuantity: formData.get('quantity'),
        UserId : localStorage.getItem("id") // set this based on user
    };

    const resp = await fetch("http://localhost:3000/api/users/makepledge", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
      })
      
      const data = await resp.json();
      if(!resp.ok) throw new Error(`Error: ${resp.status} - ${data.Result}`);
      else
      {
        alert("Pledge has been made!");
        navigate("/donor-dashboard");
      }
  };

  return (
    <form onSubmit={handleSubmit} className="make-pledge-form">
      <h2>Make a Pledge</h2>
      <div className="form-group">
          <label>Category:</label>
          <select name="category" required>
              {categories.map((category, index) => (
                  <option key={index} value={category.Category}>{category.Category} : {category.CategoryDescription}</option>
              ))}
          </select>
      </div>
      <div className="form-group" color="black">
          <label>Quantity:</label>
          <input type="number" name = "quantity" required min="1"/>
      </div>
      <button type="submit">Submit Pledge</button>
    </form>
  );
}

export default MakePledgeForm;
