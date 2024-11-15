// app.js
(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('SharedService', SharedService);


  function SharedService() {
    var service = this;
    var toBuyItems  = [
      { name: "cookies", quantity: 10 },
      { name: "milk", quantity: 2 },
      { name: "bread", quantity: 1 },
      { name: "eggs", quantity: 12 },
      { name: "apples", quantity: 5 } ];
    var alreadyBoughtItems = [];

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function() {
      return alreadyBoughtItems;
    };

    service.transferItem = function(index) {
      var item = toBuyItems.splice(index, 1)[0];
      alreadyBoughtItems.push(item);
    };
    service.addToBuyItem = function(name, quantity) {
       var item = { name: name, quantity: quantity };
       toBuyItems.push(item);
     };

     service.removeToBuy = function(index) {
        toBuyItems.splice(index,1);
     };
     service.removeBought = function(index) {
        alreadyBoughtItems.splice(index,1);
     };
  }

// toBuyList #1 - controller
ToBuyController.$inject = ['SharedService'];
function ToBuyController(SharedService) {
  var toBuyList = this;
  toBuyList.items = SharedService.getToBuyItems();
  toBuyList.itemName = "";
  toBuyList.itemQuantity = "";

  toBuyList.addItem = function() {
    SharedService.addToBuyItem(toBuyList.itemName,
      toBuyList.itemQuantity)
    toBuyList.itemName = "";
    toBuyList.itemQuantity = "";
  };

  toBuyList.markAsBought = function(index) {
    SharedService.transferItem(index);
  };
 // remove item at index from toBuyList
  toBuyList.removeItem = function(index) {
    SharedService.removeToBuy(index);
  };
}

// boughtList #2 - controller
AlreadyBoughtController.$inject = ['SharedService' ];
function AlreadyBoughtController(SharedService) {
    var boughtList = this;
    boughtList.items = SharedService.getAlreadyBoughtItems();
    // remove item at index from boughtList
    boughtList.removeItem = function(index) {
      SharedService.removeBought(index);
    };
  }
})();
