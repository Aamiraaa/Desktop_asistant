// main.js

$(document).ready(function() {
    const userInputForm = $('#user-input-form');
    const userInputField = $('#user-input-field');
    const responseContainer = $('#response-container');

    userInputForm.on('submit', function(event) {
        event.preventDefault();
        const userInput = userInputField.val();

        $.ajax({
            type: 'POST',
            url: userInputForm.attr('action'),
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                user_input: userInput
            },
            success: function(data) {
                // Display the response message in the chat
                displayChatMessage(userInput, 'user');
                displayChatMessage(data.response, 'assistant');
                
                // Clear the input field
                userInputField.val('');
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });

    function displayChatMessage(message, sender) {
        const chatMessageClass = sender === 'user' ? 'user-message' : 'assistant-message';
        const messageDiv = $('<div>').addClass(chatMessageClass).text(message);
        responseContainer.append(messageDiv);

        // Scroll to the bottom to display the latest message
        responseContainer.scrollTop(responseContainer[0].scrollHeight);
    }
});
