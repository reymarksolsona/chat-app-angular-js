angular.module('app.controller', [])
.controller('ChatController', function($scope, $window, $interval) {
    var chat = this;
    chat.userId = $window.localStorage.getItem('userId') || uuidv4();
    chat.userName = $window.localStorage.getItem('userName_' + chat.userId) || "";
    chat.tempUserName = "";
    chat.messages = [];
    chat.visibleMessages = [];
    chat.newMessage = "";
    chat.pageSize = 5;
    chat.joined = false;
    chat.namePrompted = false;

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

    chat.openNamePrompt = function() {
        chat.namePrompted = true;
    };

    chat.joinChat = function() {
        chat.joined = true;
        chat.loadMessages();
    };

    chat.loadMessages = function() {
        var savedMessages = $window.localStorage.getItem('chatMessages');
        if (savedMessages) {
            chat.messages = JSON.parse(savedMessages);
        }
        chat.updateVisibleMessages();
    };

    chat.saveMessages = function() {
        $window.localStorage.setItem('chatMessages', JSON.stringify(chat.messages));
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
        chat.updateVisibleMessages();
    };

    chat.updateVisibleMessages = function() {
        chat.visibleMessages = chat.messages.slice(-chat.pageSize);
    };

    chat.loadMoreMessages = function() {
        var element = $window.document.getElementById('chat-messages');
        if (element.scrollTop === 0 && chat.pageSize < chat.messages.length) {
            chat.pageSize += 25;
            chat.updateVisibleMessages();
        }
    };

    chat.startAutoUpdate = function() {
        chat.autoUpdateTimer = $interval(function() {
            chat.loadMessages();
        }, chat.pollingInterval);
    };

    chat.stopAutoUpdate = function() {
        if (angular.isDefined(chat.autoUpdateTimer)) {
            $interval.cancel(chat.autoUpdateTimer);
            chat.autoUpdateTimer = undefined;
        }
    };

    chat.loadMessages();
    chat.startAutoUpdate();

    $window.addEventListener('storage', function(event) {
        if (event.key === 'chatMessages') {
            chat.loadMessages();
        }
    });

    var chatWindow = $window.document.getElementById('chat-messages');
    chatWindow.addEventListener('scroll', function() {
        if (chatWindow.scrollTop === 0) {
            chat.loadMoreMessages();
        }
    });
});