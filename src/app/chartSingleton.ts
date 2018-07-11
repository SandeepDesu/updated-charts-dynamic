/**
 * The datainsights standardized format for outputing visual data from APIs
 */
export interface IchartSingleton {
    
    /**
     * The x value, this is usually a label of geoid
     */
    x: any;
    
    /**
     * The Y value, this is the actual value associated with x
     */
    y: number;
    
    /**
     * The category, or grouping, some additional information about x and y
     */
    c: any;
    
    /**
     * supporting value information associated with x
     */
    t: number;
    
    /**
     * nested array of additional data
     */
    Details: IchartSingleton[];
}

export interface IsankeyData {
    links: [any];
    nodes: [any];
}

/**
 * Base implementation for IchartSingleton
 *
 */
export class chartObjects<T extends IchartSingleton> implements IchartSingleton{    
    x: any;
    y: number;
    c: any;
    t: number;
    Details: T[];
    constructor() {};
}


/**
 * Expected output from the Charts API
 * 
 */
export interface IApiChartReturn {
    /**
     * This is the main data return array
     */
    data:IchartSingleton[];
    summary:{};
    params:{};
}

/**
 * Expected output from the Sankey API
 *
 */
export interface IApiSankeyReturn {
    /**
     * This is the main data return array
     */
    data:IsankeyData;
    summary:{};
    params:{};
}