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
      var formattedFee = agent.fee.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
      var colors = "";
    if (agent.rating === 100) {
      colors = "color_green";
    } else if (agent.rating >= 90) {
      colors = "color_blue";
    } else if (agent.rating < 90) {
      colors = "color_purple";
    }
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${agent.first_name}</td>
        <td>${agent.last_name}</td>
        <td class="${colors}">${agent.rating}</td>
        <td>${formattedFee}</td>
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
        var filteredAgents = agents.filter(agent => agent.rating >= 0);
  
        if (region !== "all") {
          filteredAgents = filteredAgents.filter(agent => agent.region.toLowerCase() === region.toLowerCase());
        }
  
        populateAgentTable(filteredAgents);
      })
      .catch(error => console.error("Error:", error));
  }

  // AddEventLiteners DropdownMenu
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

    var sortableColumns = document.querySelectorAll('[data-sortable="true"]');

  sortableColumns.forEach(column => {
    column.addEventListener("click", function() {
      var columnId = this.getAttribute("data-column");
      sortAgentsByColumn(columnId);
    });
  });
  }

  function sortAgentsByColumn(column) {
    fetch("http://localhost:3004/agents")
      .then(response => response.json())
      .then(data => {
        console.log(data.object);
        const agents = data.object;
  
        agents.sort((a, b) => {
          if (column === "first_name") {
            return a.first_name.localeCompare(b.first_name);
          } else if (column === "last_name") {
            return a.last_name.localeCompare(b.last_name);
          } else if (column === "fee") {
            return a.fee - b.fee;
          } else if (column === "rating") {
            return a.rating - b.rating;
          }
        });
  
        populateAgentTable(agents);
      })
      .catch(error => console.error("Error:", error));
  }
  
  // Call the initializePage function when the page has finished loading
  window.addEventListener("load", initializePage);
  