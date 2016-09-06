"use strict";
var templateUrl = require('./my-table.component.html');
var MyTableController = (function () {
    function MyTableController(NgTableParams) {
        var data = [
            { name: "Moroni", age: 50 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 }
        ];
        this.tableParams = new NgTableParams({}, {
            dataset: data
        });
    }
    return MyTableController;
}());
MyTableController.$inject = ['NgTableParams'];
var myTableComponent = {
    templateUrl: templateUrl,
    controller: MyTableController
};
exports.myTableComponent = myTableComponent;
//# sourceMappingURL=my-table.component.js.map