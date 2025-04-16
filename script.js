function startServer() {
  const status = document.getElementById('status');
  status.textContent = 'Starting...';

  setTimeout(() => {
    status.textContent = 'Online';
    alert('Your server is now online!');
  }, 2000);
