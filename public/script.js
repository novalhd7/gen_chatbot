const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(text, isOutgoing) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isOutgoing ? 'outgoing' : 'incoming');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatInput.value = '';

    addMessage('Gemini is thinking...', false);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        if (response.ok) {
            const placeholders = document.querySelectorAll('.incoming');
            placeholders[placeholders.length - 1].remove();
            addMessage(data.reply, false);
        } else {
            addMessage('Error: ' + data.reply, false);
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Error connecting to server.', false);
    }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

scrollToBottom();
