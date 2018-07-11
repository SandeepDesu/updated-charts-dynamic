import { IApiChartReturn, IApiSankeyReturn, IchartSingleton, IsankeyData } from "./chartSingleton";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs";
import * as _ from 'lodash';


/**
 * Base functionality for chart data builders.
 * This is where you format the data 
 * The purpose of a builder is to transform the api return into usable structure for the component
 *
 */
export interface IbaseBuilder {

    /**
     * this is where the incoming API data is formatted for the component
     */
    formatData(): void;

    /**
     * calls the API and returns the API data object
     */
    getData(): Promise<null>;

    /**
     * the builder name - this later becomes the component name
     */
    getName(): string;

    /**
     * call this on destroy -  override to handle additional unsubscribes or event handlers
     */
    cleanup(): void;

    formattedData: any;

    

}

/**
 * base implementation for data builders.
 * override formatData to handle specific data structure changes from the API to the component
 */
export class BaseChartBuilder<T extends IchartSingleton> implements IbaseBuilder {
    public formattedData: T[]; // This is the formatted data
    dataSource: Observable<IApiChartReturn> = null; // This is the service call or json
    protected apireturn: IApiChartReturn = null;
    private sourceSubscription: Subscription;
    protected datalevel: number = 0;
    protected name: string;

    getData(): Promise<null> {
        if (this.datalevel > 0) {
            return this.getDataLevel(this.datalevel);
        }
        return new Promise((resolve) => {
            if (this.apireturn === null) {
                this.sourceSubscription = this.dataSource.subscribe((apidata) => {
                    this.apireturn = apidata;
                    this.formatData();
                    resolve();
                });
            }
            else {
                this.formatData();
                resolve();
            }
        });
    }

    /**
     * return data array from a given level in the data. level 0 is the same as getData()
     */
    getDataLevel(level: number): Promise<null> {
        return new Promise((resolve) => {
            if (this.apireturn != null) {
                const tempData = this.extractDataLevel(level, this.apireturn.data as T[]);
                this.formatTempData(tempData);
                resolve();
            }
            else if (this.dataSource != null) {
                this.sourceSubscription = this.dataSource.subscribe((apidata) => {
                    this.apireturn = apidata;
                    const tempData = this.extractDataLevel(level, this.apireturn.data as T[]);
                    this.formatTempData(tempData);
                    resolve();
                });
            }
            else {
                let tempData = this.extractDataLevel(level, this.apireturn.data as T[]);
                this.formatTempData(tempData);
                resolve();
            }
        });
    }

    /**
     * return the data array for a given level after the api return has happened
     */
    protected extractDataLevel(level: number, tempData: T[]): T[] {
        let dataArr: T[] = [];
        if (this.apireturn != null) {
            try {
                dataArr = this.traversedatalevels(tempData, level - 1);
            }
            catch (e) {
                dataArr = tempData;
                console.error(e);
            }
        }
        return dataArr;
    }

    /**
     * recursive function to combine details levels into one array
     */
    protected traversedatalevels(dataArr: T[], maxRecur: number) {
        let outArr: T[] = [];
        for (var d_obj of dataArr) {
            if (d_obj.Details) {
                if (maxRecur > 0) {
                    const arr = this.traversedatalevels(d_obj.Details as T[], maxRecur - 1);
                    outArr.push.apply(outArr, arr);
                }
                else {
                    for (var d of d_obj.Details) {
                        let new_detail = Object.assign({}, d);
                        new_detail["c"] = d_obj.x;
                        outArr.push(new_detail as T);
                    }
                }
            }
        }
        return outArr;
    }

    /**
     * straight pass through, override to handle specific formatting
     */
    formatData(): void {
        this.formattedData = (this.apireturn.data as T[]).slice(0);
    }
    formatTempData(tempData: T[]): void {
        this.formattedData = tempData.slice(0);
    }

    getName(): string {
        return this.name;
    }

    /*
     * create a new builder
     * @param {number} level The level of data from the apireturn to be used
     */
    constructor(name: string, level: number = 0) {
        this.name = name;
        this.datalevel = level;
    }

    /**
     * unsubscribe from the source - always call this at the end
     */
    cleanup(): void {
        if (this.sourceSubscription) {
            this.sourceSubscription.unsubscribe();
        }
    }
}


export class SankeyBuilder implements IbaseBuilder {
    constructor(sourceData, name) {
        this.name = name;
        if (sourceData instanceof Observable) {
            this.dataSource = sourceData;
        }
        else {
            this.apireturn = Object.assign({}, sourceData);
        }
    }
    public formattedData: IsankeyData;
    dataSource: Observable<IApiSankeyReturn> = null;
    private apireturn: IApiSankeyReturn = null;
    private sourceSubscription: Subscription;
    protected name: string;

    getData(): Promise<null> {
        return new Promise((resolve) => {
            if (this.apireturn === null) {
                this.sourceSubscription = this.dataSource.subscribe((apidata) => {
                    this.apireturn = apidata;
                    this.formatData();
                    resolve();
                });
            }
            else {
                this.formatData();
                resolve();
            }
        });
    }
    formatData(): void {
        this.formattedData = Object.assign({}, this.apireturn.data);
    }
    getName(): string {
        return this.name
    }
    cleanup(): void {
        if (this.sourceSubscription) {
            this.sourceSubscription.unsubscribe();
        }
    }
}


/**
 * pivots the data for x around grouping c.  also sums the y's and sets mins/maxes
 * every row will have a given x then any c's as a column with the corresponding y
 *
 * X        Y     C
 * purple   1     group1
 * purple   2     group2
 * orange   2     group1
 * orange   3     group2
 *
 * becomes:
 * X        total   group1  group2
 * purple   3       1       2
 * orange   5       2       3
 */
export class GroupedBuilder extends BaseChartBuilder<any> {

    constructor(sourceData, name, level: number = 0) {
        super(name, level);
        this.dataSource = sourceData;
    }

    YMax: number = 0;
    YMin: number = 0;
    YTotalMax: number = 0;
    YTotalMin: number = 0;

    formatData(): void {
        // stacking based on the x values which should be categories??
        let cats = {};
        for (var i in this.apireturn.data) {
            const sobj = this.apireturn.data[i];
            if (sobj.x in cats) {
                // its already there, update the total, and add the data
                cats[sobj.x].total += sobj.y;
                cats[sobj.x][sobj.c] = sobj.y;
            } else {
                // new one, set total and add the data
                cats[sobj.x] = { "total": sobj.y, "x": sobj.x };
                cats[sobj.x][sobj.c] = sobj.y;
            }
            if (this.YMax < sobj.y) { this.YMax = sobj.y; }
            if (this.YMin > sobj.y) { this.YMin = sobj.y; }

        }
        const carr = [];
        for (var k in cats) {
            const ytot = cats[k].total;
            if (this.YTotalMax < ytot) { this.YTotalMax = ytot; }
            if (this.YTotalMin > ytot) { this.YTotalMin = ytot; }
            carr.push(cats[k]);
        }
        this.formattedData = carr;
    }
}


export class WaterfallBuilder extends BaseChartBuilder<any> {
    constructor(sourceData, name, level: number = 0) {
        super(name, level);
        this.dataSource = sourceData;
    }
}

/**
 * straight passthrough object, no formatting, use IchartSingleton[] directly
 */
export class StandardBuilder extends BaseChartBuilder<any> {
    constructor(sourceData, name, level: number = 0) {
        super(name, level);
        if (sourceData instanceof Observable) { // This is for passing raw json instead of Observable from a service.
            this.dataSource = sourceData;
        }
        else {
            this.apireturn = _.cloneDeep(sourceData);
        }
    }
}


/**
 * probably should remove this one 
 * @deprecated Use StandardBuilder
 */
export class ChartBuilder extends BaseChartBuilder<IchartSingleton> {
    YLabel = '';
    XLabel = '';
    Barcolor = '#98abc5';
    constructor(Xlabel: string, Ylabel: string, barcolor: string, name: string, level: number = 0) {
        super(name, level);
        this.XLabel = Xlabel;
        this.YLabel = Ylabel;
        if (barcolor) {
            this.Barcolor = barcolor;
        }
    }
    getCount(): number {
        return this.formattedData.length;
    }
}



/**
 * Use this to build simple HTML tables from arrays of standard API output
 * builds an array of values from an array of IchartSingleton, or an array of values from any object or dictionary
 */
export class TableBuilder extends BaseChartBuilder<IchartSingleton>  {
    protected HeaderArray: string[];

    constructor(data, headerArr, name, level: number = 0) {
        super(name, level);
        if (data instanceof Observable) { // This is for passing raw json instead of Observable from a service.
            this.dataSource = data;
        }
        else {
            this.apireturn = _.cloneDeep(data);
        }
        this.HeaderArray = headerArr;
    }

    formatData(): void {
        this.tableData();
    }
    formatTempData(tempData: IchartSingleton[]): void {
        this.tableData();
    }

    tableData(): void {
        let tempData = this.apireturn.data;
        if (Array.isArray(tempData)) {
            if (this.datalevel > 0) {
                tempData = this.extractDataLevel(this.datalevel, this.apireturn.data);
            }
            // lets assume its our standard values array
            // so change the getRows function accordingly
            // maybe we should make a type enum that can switch these more formally
            this.formattedData = this.getRowsfromValuesArray(tempData);
        } else {
            this.formattedData = this.getRowsfromDict(tempData);
        }
    }

    getHeader(): string[] {
        return this.HeaderArray;
    }

    protected getRowsfromDict(indata: {}): any[] {
        // two column row with key and value
        const rows = [];
        for (const key in indata) {
            rows.push([key, indata[key]]);
        }
        return rows;
    }

    protected getRowsfromValuesArray(indata: IchartSingleton[]): any[] {
        // standardized values array of name, value, count
        const rows = [];
        for (const valobj of indata) {
            //const valobj = indata[indx];
            rows.push([valobj.x, valobj.t.toLocaleString(), valobj.y.toLocaleString()]);
        }
        return rows;
    }


}
