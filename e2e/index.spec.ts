import { DemoNgTablePage } from './demo-ng-table.po';

describe('ng-table', () => {

    describe('es5', () => {
        const demoPageUrl = 'es5/index.html';
        it('should render ng-table', () => {
            renderTableSpec(demoPageUrl);
        });
    });

    describe('es6-systemjs', () => {
        const demoPageUrl = 'es6-systemjs/index.html';
        it('should render ng-table', () => {
            renderTableSpec(demoPageUrl);
        });
    });

    describe('es6-webpack', () => {
        const demoPageUrl = 'es6-webpack/build/index.html';
        it('should render ng-table', () => {
            renderTableSpec(demoPageUrl);
        });
    });

    describe('ts-webpack', () => {
        const demoPageUrl = 'ts-webpack/build/index.html';
        it('should render ng-table', () => {
            renderTableSpec(demoPageUrl);
        });
    });


    function renderTableSpec(url: string) {
        const demoPage = new DemoNgTablePage(url);
        demoPage.open();
        expect(demoPage.table.isPresent()).toBe(true);
        expect(demoPage.dataRows.count()).toBeGreaterThan(0);
    }
});