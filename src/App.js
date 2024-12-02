import { useEffect, useState } from "react";
import { Data } from "./employeeData";

function App() {
  // State for managing table data
  const [data, setData] = useState([]);
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  // Load initial data on component mount
  useEffect(() => {
    setData(Data);
  }, []);

  // Handle edit action: populate fields with data to edit
  const handleEdit = (id) => {
    const userToEdit = data.find(user => user.id === id);
    if (userToEdit) {
      setId(id);
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setAge(userToEdit.age);
      setIsUpdate(true);
    }
  };

  // Handle delete action: filter out the deleted record
  const handleDelete = (id) => {
    if (id > 0 && window.confirm("Are you sure to delete?")) {
      const updatedData = data.filter(user => user.id !== id);
      setData(updatedData);
    }
  };

  // Handle save action: add a new record
  const handleSave = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !age) {
      alert("Please fill in all fields before saving.");
      return;
    }
    const newRecord = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      firstName,
      lastName,
      age,
    };
    setData([...data, newRecord]);
    handleClear(); // Reset fields after saving
  };

  // Handle update action: modify an existing record
  const handleUpdate = () => {
    const updatedData = data.map(user => 
      user.id === id ? { ...user, firstName, lastName, age } : user
    );
    setData(updatedData);
    handleClear(); // Reset fields after updating
  };

  // Reset form fields
  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  };

  return (
    <div className="text-center my-3">
      <h2>CRUD OPERATION</h2>
      <h4>Create - Read - Update - Delete</h4>
      {/* <p className="text-">Using useState and useEffect</p> */}
      <div class="badge text-bg-primary text-wrap mb-3" style={{width: "12rem"}}>
      Using useState and useEffect
</div>
      {/* Input Form */}
      <div className="form-container" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <div>
          <label>
            First Name
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label>
            Age
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        {!isUpdate ? (
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Table for Displaying Data */}
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
