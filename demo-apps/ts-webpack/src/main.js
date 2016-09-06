"use strict";
var ng1 = require('angular');
var ng_table_1 = require('ng-table');
require('./shared/site.scss');
var my_table_component_1 = require('./my-table/my-table.component');
ng1.module('demo-app', [ng_table_1.ngTable.name])
    .component('myTable', my_table_component_1.myTableComponent);
//# sourceMappingURL=main.js.map