/*const url = 'http://localhost:3004/agents'
const fetchData = async () => {
}

const createTable = (arr) => {
}

const renderData = async () => {
}

renderData()*/

function populateAgentTable(data) {
    var tableBody = document.getElementById("agentTableBody");
    tableBody.innerHTML = "";
  
    data.forEach(function(agent, index) {
      var row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${agent.first_name}</td>
        <td>${agent.last_name}</td>
        <td>${agent.rating}</td>
        <td>${agent.fee}</td>
        <td>${agent.region}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function filterAgentsByRegion(region) {
    fetch("http://localhost:3004/agents")
      .then(response => response.json())
      .then(data => {
        console.log(data.object)
        const agents = data.object
        var filteredAgents = agents.filter(agent => agent.rating >= 95);
  
        if (region !== "all") {
          filteredAgents = filteredAgents.filter(agent => agent.region.toLowerCase() === region.toLowerCase());
        }
  
        populateAgentTable(filteredAgents);
      })
      .catch(error => console.error("Error:", error));
  }
  
  // Function to add click event listeners to dropdown menu items
  function addDropdownEventListeners() {
    var dropdownItems = document.querySelectorAll(".dropdown-item");
  
    dropdownItems.forEach(item => {
      item.addEventListener("click", function(event) {
        event.preventDefault();
        var region = this.getAttribute("data-region");
        filterAgentsByRegion(region);
      });
    });
  }
  
  // Function to initialize the page and table with all agents
  function initializePage() {
    filterAgentsByRegion("all");
    addDropdownEventListeners();
  }
  
  // Call the initializePage function when the page has finished loading
  window.addEventListener("load", initializePage);
  