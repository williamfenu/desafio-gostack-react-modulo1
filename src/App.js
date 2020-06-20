import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setProjects(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `New Project ${new Date()}`,
      url: "letslaunch.com.br",
      techs: ["Nodejs", "ReactJS", "Javascrip"],
    });
    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const index = projects.findIndex((project) => project.id === id);
    const newArr = [...projects];
    newArr.splice(index, 1);
    setProjects(newArr);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
