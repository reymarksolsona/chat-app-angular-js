angular.module('app.controller', [])
.controller('ChatController', function($scope, $window) {
    var chat = this;
    chat.userName = $window.localStorage.getItem('userName_') || "";
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
        $window.localStorage.setItem('userName_', chat.userName);
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
        if (!chat.newMessage.trim()) {
            return;
        }
        chat.messages.push({ id: chat.messageId++, sender: chat.userName, text: chat.newMessage });
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
});