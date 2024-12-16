// messages.js
const API_URL = 'https://messages-api.chris-ried.workers.dev/api/messages';

document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = document.getElementById('message').value;
    
    console.log( JSON.stringify({ message }));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        // Clear the form
        document.getElementById('message').value = '';
        // Refresh messages
        loadMessages();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  async function loadMessages() {
    try {
      const response = await fetch(API_URL);
      const messages = await response.json();
      
      const messagesDiv = document.getElementById('messages');
      messagesDiv.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Load messages when page loads
  loadMessages();