import { browser, element, by } from 'protractor/globals';

describe('ng-table - ts+webpack', () => {
    it('should render ng-table', () => {
        browser.get('http://localhost:8080');

        const table = element(by.css('table[ng-table]'));
        expect(table.isPresent()).toBe(true);
        const dataRows = element.all(by.repeater('user in $data'));
        expect(dataRows.count()).toBeGreaterThan(0);
    });
});