document.getElementById("startServerBtn").addEventListener("click", () => {
  const edition = document.getElementById("edition").value;
  const version = document.getElementById("version").value;
  const statusSpan = document.getElementById("status");

  // Show starting status
  statusSpan.textContent = "Starting...";
  statusSpan.style.color = "orange";

  // Simulate server startup delay
  setTimeout(() => {
    statusSpan.textContent = `Online (${edition} ${version})`;
    statusSpan.style.color = "green";
  }, 2000);
});￼Enter
