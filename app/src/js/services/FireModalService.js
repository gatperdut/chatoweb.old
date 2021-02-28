'use strict';

angular.module('chatoWeb')

.service('FireModalService', ['$uibModal', function($uibModal) {

  var craftHash = function(config, backdrop, size) {
    return _.extend(
      {
        animation: true,
        backdrop: backdrop ? true : 'static',
        keyboard: true,
        size: size
      },
      config
    );
  };

  var open = {
    errors: function(errors) {
      return $uibModal.open(craftHash(
        {
          templateUrl: '/html/modals/errors/main.html',
          controller: 'ErrorsModalController',
          resolve: {
            errors: function() {
              return errors;
            }
          }
        }, false, 'md'
      )).result;
    },
    superarea: function(superarea) {
      return $uibModal.open(craftHash(
        {
          templateUrl: '/html/modals/superarea/main.html',
          controller: 'SuperareaModalController',
          resolve: {
            superarea: function() {
              return superarea;
            }
          }
        }, false, 'md'
      )).result;
    },
    area: {
      edit: function(area) {
        return $uibModal.open(craftHash(
          {
            templateUrl: '/html/modals/area/edit.html',
            controller: 'AreaEditModalController',
            resolve: {
              area: function() {
                return area;
              }
            }
          }, false, 'md'
        )).result;
      },
      link: function(room, dir) {
        return $uibModal.open(craftHash(
          {
            templateUrl: '/html/modals/area/link.html',
            controller: 'AreaLinkModalController',
            resolve: {
              room: function() {
                return room;
              },
              dir: function() {
                return dir;
              }
            }
          }, false, 'md'
        )).result;
      }
    },
    item: function(itemTemplate) {
      return $uibModal.open(craftHash(
        {
          templateUrl: '/html/modals/item/main.html',
          controller: 'ItemModalController',
          resolve: {
            itemTemplate: function() {
              return itemTemplate;
            }
          }
        }, false, 'md'
      )).result;
    },
    craft: function(craft) {
      return $uibModal.open(craftHash(
        {
          templateUrl: '/html/modals/craft/main.html',
          controller: 'CraftModalController',
          resolve: {
            craft: function() {
              return craft;
            }
          }
        }, false, 'lg'
      )).result;
    },
    itemTemplate: {
      create: function() {
        return $uibModal.open(craftHash(
          {
            templateUrl: '/html/modals/item-template/create.html',
            controller: 'ItemTemplateCreateModalController'
          }, false, 'md'
        )).result;
      },
      edit: function(itemTemplate) {
        return $uibModal.open(craftHash(
          {
            templateUrl: '/html/modals/item-template/edit.html',
            controller: 'ItemTemplateEditModalController',
            resolve: {
              itemTemplate: function() {
                return itemTemplate;
              }
            }
          }, false, 'md'
        )).result;
      },
      picker: function() {
        return $uibModal.open(craftHash(
          {
            templateUrl: '/html/modals/item-template/picker.html',
            controller: 'ItemTemplatePickerModalController'
          }, false, 'md'
        )).result;
      }
    },
    room: function(room) {
      return $uibModal.open(craftHash(
        {
          templateUrl: '/html/modals/room/main.html',
          controller: 'RoomModalController',
          resolve: {
            room: function() {
              return room;
            }
          }
        }, false, 'md'
      )).result;
    },
    door: function(door) {
      return $uibModal.open(craftHash(
        {
          templateUrl: '/html/modals/door/main.html',
          controller: 'DoorModalController',
          resolve: {
            door: function() {
              return door;
            }
          }
        }, false, 'md'
      )).result;
    }
  };

  return {

    open: open

  };
}]);
