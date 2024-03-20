document.addEventListener('DOMContentLoaded', () => {
  const chatbotPopup = document.getElementById('chatbot-popup');

  // Muestra la ventana emergente cuando el cursor entra en el área
  chatbotPopup.addEventListener('mouseenter', () => {
      chatbotPopup.style.opacity = '1';
      chatbotPopup.style.visibility = 'visible';
  });

  // Oculta la ventana emergente cuando el cursor sale del área
  chatbotPopup.addEventListener('mouseleave', () => {
      chatbotPopup.style.opacity = '0';
      chatbotPopup.style.visibility = 'hidden';
  });
});
