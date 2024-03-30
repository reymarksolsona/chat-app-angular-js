angular.module('app.controller', [])
.controller('ChatController', function($scope, $window) {
    var chat = this;
    chat.userId = $window.localStorage.getItem('userId') || uuidv4();
    chat.userName = $window.localStorage.getItem('userName_' + chat.userId) || "";
    chat.tempUserName = "";
    chat.namePrompted = false;
    chat.joined = false;
    chat.messageId = 1;
    chat.newMessage = "";
    chat.messages = [];

    chat.enterName = function() {
        if (!chat.tempUserName.trim()) {
            alert("Please enter a valid name.");
            return;
        }
        chat.userName = chat.tempUserName;
        $window.localStorage.setItem('userName_' + chat.userId, chat.userName);
        chat.tempUserName = "";
        chat.namePrompted = false;
        chat.joinChat();
    };

    chat.joinChat = function() {
        chat.joined = true;
    };

    chat.saveMessages = function() {
        localStorage.setItem('chatMessages', JSON.stringify(chat.messages));
    };

    chat.sendMessage = function() {
        if (!chat.newMessage.trim() || !chat.joined) {
            return;
        }

        var newMessage = {
            id: uuidv4(),
            senderId: chat.userId,
            sender: chat.userName,
            text: chat.newMessage
        };

        chat.messages.push(newMessage);
        chat.saveMessages();
        chat.newMessage = "";
    };


    chat.loadMessages = function() {
        var savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            chat.messages = JSON.parse(savedMessages);
        }
    };
    
    chat.loadMessages();

    $window.addEventListener('storage', function(event) {
        if (event.key === 'chatMessages') {
            chat.loadMessages();
        }
    });
});