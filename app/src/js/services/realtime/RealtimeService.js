'use strict';

angular.module('chatoWeb')

.service('RealtimeService', ['$q', 'socketFactory', 'RealtimeReaction', 'SystemService', function($q, socketFactory, RealtimeReaction, SystemService) {

  var notificationsSocket;

  var listen = function() {
    notificationsSocket = socketFactory(
      {
        ioSocket: io.connect(SystemService.storage.info.socket_io_uri)
      }
    );

    notificationsSocket.connect()

    // We possibly want to split this into regular users/admin channels. And definitely not pass
    // it along the SystemService output (:
    var channels = [SystemService.storage.info.redis_channel];

    notificationsSocket.emit('subscribe_channel', { channels: channels });

    _.each(channels, function(channel) {
      notificationsSocket.on(channel, function(msg) {
        msg = JSON.parse(msg);
        RealtimeReaction.handle(msg);
      });
    });

    notificationsSocket.on('reconnect', function() {
      //notificationsSocket.emit('subscribe_channel', { channels: channels });
    });

  };

  SystemService.initialized.promise.then(listen);


  return {

  };

}]);
