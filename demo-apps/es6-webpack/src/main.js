import angular from 'angular';
import { ngTable } from 'ng-table';
import './shared/site.scss'
import { myTableComponent } from './my-table/my-table.component';

var demoApp = angular.module('demo-app', [ngTable.name]);

demoApp
    .component('myTable', myTableComponent);

export { demoApp };