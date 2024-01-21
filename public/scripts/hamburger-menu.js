let hamburger = document.getElementsByClassName('navbar-toggler')[0]
let menu = document.getElementById("hamburger-menu")

function toggleChat(event) {
    const isVisible = menu.style.left === '0px';
    menu.style.left = isVisible ? '-600px' : '0px';
    console.log(menu.style.left)

    // Stop the event from propagating to the document
    event.stopPropagation();
}

// Function to hide chat when clicking outside
function hideChatOnClickOutside(event) {
    menu.style.left = '-600px';
    if (!menu.contains(event.target) && menu.style.right === '0px') {

    }
}


try {
    // Event listener for document
    document.addEventListener('click', hideChatOnClickOutside);

    // Prevent event listener from hiding chat when clicking inside the chat area
    hamburger.addEventListener('click', function (event) {
        toggleChat(event)
        event.stopPropagation();
    });
}
catch (e) { }
