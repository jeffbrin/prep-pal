function toggleChat() {
    const chatArea = document.querySelector('.chat-area');
    const isVisible = chatArea.style.right === '0px';
    chatArea.style.right = isVisible ? '-300px' : '0px';

    // Stop the event from propagating to the document
    event.stopPropagation();
}

// Function to hide chat when clicking outside
function hideChatOnClickOutside(event) {
    const chatArea = document.querySelector('.chat-area');
    if (!chatArea.contains(event.target) && chatArea.style.right === '0px') {
        chatArea.style.right = '-300px';
    }
}

// Event listener for document
document.addEventListener('click', hideChatOnClickOutside);

// Prevent event listener from hiding chat when clicking inside the chat area
document.querySelector('.chat-area').addEventListener('click', function (event) {
    event.stopPropagation();
});