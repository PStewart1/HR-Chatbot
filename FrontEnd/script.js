// Define todas tus funciones al principio
function showPopup() {
  const chatbotPopup = document.getElementById('chatbot-popup');
  chatbotPopup.style.opacity = '1';
  chatbotPopup.style.visibility = 'visible';
}

function hidePopup() {
  const chatbotPopup = document.getElementById('chatbot-popup');
  chatbotPopup.style.opacity = '0';
  chatbotPopup.style.visibility = 'hidden';
}

function showTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  typingIndicator.style.display = 'block';
}

function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  typingIndicator.style.display = 'none';
}

function displayChatbotMessage(message) {
  const chatDisplay = document.querySelector('.chat-display');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'agent');
  messageElement.textContent = message;
  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function sendMessageToChatbot(message) {
  showTypingIndicator();
  // Aquí reemplaza '/tu-endpoint-de-chatbot' con la URL real de tu backend
  fetch('/tu-endpoint-de-chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  })
  .then(response => response.json())
  .then(data => {
    hideTypingIndicator();
    displayChatbotMessage(data.message); // Simula la recepción de un mensaje del chatbot.
  })
  .catch(error => {
    hideTypingIndicator();
    console.error('Error al comunicarse con el chatbot:', error);
  });
}

// Luego añade los manejadores de eventos
document.addEventListener('DOMContentLoaded', () => {
  const chatbotButton = document.getElementById('chatbot-button');
  let isMouseOverButton = false;
  let isMouseOverPopup = false;

  chatbotButton.addEventListener('mouseenter', () => {
    isMouseOverButton = true;
    showPopup();
  });

  chatbotButton.addEventListener('mouseleave', () => {
    isMouseOverButton = false;
    setTimeout(() => {
      if (!isMouseOverPopup) {
        hidePopup();
      }
    }, 100);
  });

  const chatbotPopup = document.getElementById('chatbot-popup');
  chatbotPopup.addEventListener('mouseenter', () => {
    isMouseOverPopup = true;
    showPopup();
  });

  chatbotPopup.addEventListener('mouseleave', () => {
    isMouseOverPopup = false;
    hidePopup();
  });

  chatbotButton.addEventListener('click', openChatbotPage);
  
  // Añade la función de 'openChatbotPage' aquí si aún la necesitas,
  // pero parece que estabas abriendo una nueva ventana, lo cual puede no ser necesario si estás manejando todo dentro de la misma página.
  function openChatbotPage() {
    window.open('chatbotpage.html', 'Chatbot', 'width=600,height=600');
  }

  // Manejador de eventos para enviar mensajes
  document.querySelector('.chatbot-footer button').addEventListener('click', () => {
    const inputElement = document.querySelector('.chatbot-footer input');
    const message = inputElement.value.trim();
    if (message) {
      sendMessageToChatbot(message);
      inputElement.value = '';
    }
  });
});
