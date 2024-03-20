document.addEventListener('DOMContentLoaded', () => {
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotPopup = document.getElementById('chatbot-popup');

  // Muestra la ventana emergente cuando el cursor entra en el área del botón
  chatbotButton.addEventListener('mouseenter', () => {
    chatbotPopup.style.opacity = '1';
    chatbotPopup.style.visibility = 'visible';
  });

  // Oculta la ventana emergente cuando el cursor sale del área del botón y la ventana emergente
  chatbotButton.addEventListener('mouseleave', () => {
    chatbotPopup.style.opacity = '0';
    chatbotPopup.style.visibility = 'hidden';
  });

  chatbotPopup.addEventListener('mouseenter', () => {
    chatbotPopup.style.opacity = '1';
    chatbotPopup.style.visibility = 'visible';
  });

  chatbotPopup.addEventListener('mouseleave', () => {
    chatbotPopup.style.opacity = '0';
    chatbotPopup.style.visibility = 'hidden';
  });
});
