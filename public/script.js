document.getElementById("startServerBtn").addEventListener("click", () => {
  const edition = document.getElementById("edition").value;
  const version = document.getElementById("version").value;
  const statusSpan = document.getElementById("status");

  // Show starting status
  statusSpan.textContent = "Starting...";
  statusSpan.style.color = "orange";

  // Send POST request to backend
  fetch('/start-server', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      edition: edition,
      version: version
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Server response wasn't OK");
    }
    return response.json();
  })
  .then(data => {
    if (data.status === "started") {
      statusSpan.textContent = `Online (${data.edition} ${data.version})`;
      statusSpan.style.color = "green";
    } else {
      statusSpan.textContent = "Error: Server didn't start";
      statusSpan.style.color = "red";
    }
  })
  .catch(error => {
    console.error("Error starting server:", error);
    statusSpan.textContent = "Failed to start";
    statusSpan.style.color = "red";
  });
});
