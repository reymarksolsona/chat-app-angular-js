angular.module('app.controller', [])
.controller('ChatController', function($scope, $window) {
    var chat = this;
    chat.userName = $window.localStorage.getItem('userName_') || "";
    chat.tempUserName = "";
    chat.namePrompted = false;
    chat.joined = false;

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
});