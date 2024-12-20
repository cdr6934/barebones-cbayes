// messages.js
const API_URL = 'https://messages-api.chris-ried.workers.dev/api/messages';
let message = []; 
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
      message = messages;
      displayMessages(message);
    } catch (error) {
      console.error('Error:', error);
    }
    
  }
  
  // Load messages when page loads
  loadMessages();

  function updateMessageCount(count) {
    document.getElementById('messageCount').textContent = count;
    
    // Calculate progress percentage (max 43 messages)
    const progressPercent = Math.min((count / 23) * 100, 100);
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute('aria-valuenow', count);
  }

  // Update this wherever you load or update messages
  function displayMessages(messages) {

    
    // List of valid codes
    const validCodes = [
        'VDJcpRdhgN', 'mTeduwPFC1', 'Xqh1l3xP62', 'NKOdf8snT1', 'HYCcOhFI79',
        'dmzxJM1HqS', 'yCAJLyp5GH', 'HE6XnrkQln', 'nkIm7xZDol', '3Eq7idMX7i',
        'oxcoNtDkA3', 'fUyZ1MAcMa', 'SWMnKZMjYr', 'nIvfjhKwa3', 'BbrDYwCXAd',
        'zFaTNE2JMg', '9GDsKDqvHn', 'nsMfVZHaCZ', 'YT2PKGKbbv', '0kpVJQpQ9S',
        'tGZyeZmPas', 'mP99gWaSZh', 'KnsJOlndpU', 'fA1HP8eA5u', 'RG6O5YK4OH',
        'lZSjRcyGjB'
    ];
    
    // Filter for unique messages that exist in validCodes
    const uniqueMessages = [...new Set(message)].filter(msg => validCodes.includes(msg));
    console.log(uniqueMessages);
    
    // Update the count using filtered messages
    updateMessageCount(uniqueMessages.length);
  
  }