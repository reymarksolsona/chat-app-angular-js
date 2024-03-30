describe('ChatController', function() {
    var $controller;
    var $rootScope;
    var $window;
    var $interval;
    var $httpBackend;

    beforeEach(module('chatApp.controller'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$window_, _$interval_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $interval = _$interval_;
        $httpBackend = _$httpBackend_;
    }));

    describe('enterName', function() {
        it('should set the user name and join chat', function() {
            var chat = $controller('ChatController');

            chat.tempUserName = 'John';

            spyOn(chat, 'joinChat');

            chat.enterName();

            expect(chat.userName).toEqual('John');
            expect(chat.joinChat).toHaveBeenCalled();
        });

        it('should not set the user name if it is empty', function() {
            var chat = $controller('ChatController');

            chat.tempUserName = '';

            spyOn(chat, 'joinChat');

            chat.enterName();

            expect(chat.userName).toEqual('');
            expect(chat.joinChat).not.toHaveBeenCalled();
        });
    });

    describe('sendMessage', function() {
        it('should add a new message to the chat', function() {
            var chat = $controller('ChatController');

            chat.joined = true;
            chat.newMessage = 'Hello';

            spyOn(chat, 'updateVisibleMessages');
            spyOn(chat, 'scrollToBottom');

            chat.sendMessage();

            expect(chat.messages.length).toEqual(1);
            expect(chat.messages[0].text).toEqual('Hello');
            expect(chat.updateVisibleMessages).toHaveBeenCalled();
            expect(chat.scrollToBottom).toHaveBeenCalled();
        });

        it('should not add a new message if not joined', function() {
            var chat = $controller('ChatController');

            chat.joined = false;
            chat.newMessage = 'Hello';

            spyOn(chat, 'updateVisibleMessages');
            spyOn(chat, 'scrollToBottom');

            chat.sendMessage();

            expect(chat.messages.length).toEqual(0);
            expect(chat.updateVisibleMessages).not.toHaveBeenCalled();
            expect(chat.scrollToBottom).not.toHaveBeenCalled();
        });
    });

    describe('loadMoreMessages', function() {
        it('should increase page size and update visible messages when scrolling up', function() {
            var chat = $controller('ChatController');

            chat.pageSize = 25;

            chat.loadMoreMessages();

            expect(chat.pageSize).toEqual(50);
        });
    });

});
