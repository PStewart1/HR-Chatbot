import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

fetchMock.enableMocks();

test('handleSendMessage sends message to server and updates messages state', async () => {
  render(<App />); // Destructure getByPlaceholderText

  // Simulate user sending a message
  const userInput = 'Hello, bot!';
  fireEvent.change(screen.getByPlaceholderText('Ask me anything...'), { target: { value: userInput } }); // Update to use getByPlaceholderText
  
  // Wait for fetch request to be made
  await waitFor(() => expect(fetch).toHaveBeenCalled());

  // Mock server response
  fetchMock.mockResponseOnce(JSON.stringify({ message: 'Bot response' }));

  // Wait for state to be updated
  await screen.findByText('Bot response');
});