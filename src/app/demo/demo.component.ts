import { Component, OnInit } from '@angular/core';
import { SankeyBuilder, StandardBuilder, TableBuilder, WaterfallBuilder } from '../DataBuilders';
// import 'poUSRC2017.json' as poData from '/assets';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
    barData: StandardBuilder;
    sankeyData: SankeyBuilder;
    tableData: TableBuilder;
    lineData: StandardBuilder;
    lineChartData: StandardBuilder;
    waterFallChart: StandardBuilder;

    poData = { 'data': { "nodes": [{ "name": "SPECIALTY HYBRIDS" }, { "name": "KRUGER SEEDS" }, { "name": "BA" }, { "name": "STEWART SEEDS" }, { "name": "Other" }, { "name": "Quantity Decrease" }, { "name": "ZUS Code - Quantity Decrease" }, { "name": "STONE SEED GROUP" }, { "name": "JUNG SEED GENETICS" }, { "name": "OA" }, { "name": "Cust Str Incorrect" }, { "name": "Credit" }, { "name": "DEKALB" }, { "name": "LEWIS HYBRIDS" }, { "name": "REA HYBRIDS" }, { "name": "GOLD COUNTRY SEED" }, { "name": "ZUS Code - Quantity Decrease via Rejection" }, { "name": "Quantity Reduction" }, { "name": "Customer Number" }, { "name": "FA" }, { "name": "CHANNEL BIO LLC" }, { "name": "FONTANELLE HYBRIDS" }, { "name": "HUBNER SEED" }, { "name": "Overall status of credit checks" }], "links": [{ "source": 21, "target": 4, "value": 1 }, { "source": 15, "target": 4, "value": 39 }, { "source": 1, "target": 4, "value": 2 }, { "source": 14, "target": 4, "value": 52 }, { "source": 7, "target": 4, "value": 100 }, { "source": 20, "target": 5, "value": 213201 }, { "source": 12, "target": 6, "value": 1208 }, { "source": 12, "target": 10, "value": 1088 }, { "source": 20, "target": 11, "value": 1811913 }, { "source": 12, "target": 16, "value": 55551 }, { "source": 21, "target": 17, "value": 8789 }, { "source": 15, "target": 17, "value": 20929 }, { "source": 22, "target": 17, "value": 19648 }, { "source": 8, "target": 17, "value": 11667 }, { "source": 1, "target": 17, "value": 14619 }, { "source": 13, "target": 17, "value": 6619 }, { "source": 14, "target": 17, "value": 31091 }, { "source": 0, "target": 17, "value": 13287 }, { "source": 3, "target": 17, "value": 9415 }, { "source": 7, "target": 17, "value": 16732 }, { "source": 21, "target": 18, "value": 2546 }, { "source": 14, "target": 18, "value": 1001 }, { "source": 12, "target": 23, "value": 1577175 }, { "source": 21, "target": 23, "value": 65698 }, { "source": 15, "target": 23, "value": 129178 }, { "source": 22, "target": 23, "value": 103864 }, { "source": 8, "target": 23, "value": 48138 }, { "source": 1, "target": 23, "value": 57740 }, { "source": 13, "target": 23, "value": 78998 }, { "source": 14, "target": 23, "value": 133891 }, { "source": 0, "target": 23, "value": 99326 }, { "source": 3, "target": 23, "value": 76646 }, { "source": 7, "target": 23, "value": 745459 }, { "source": 19, "target": 0, "value": 13287 }, { "source": 9, "target": 0, "value": 99326 }, { "source": 19, "target": 1, "value": 14619 }, { "source": 9, "target": 1, "value": 57742 }, { "source": 19, "target": 3, "value": 9415 }, { "source": 9, "target": 3, "value": 76646 }, { "source": 19, "target": 7, "value": 16732 }, { "source": 9, "target": 7, "value": 745559 }, { "source": 19, "target": 8, "value": 11667 }, { "source": 9, "target": 8, "value": 48138 }, { "source": 2, "target": 12, "value": 1088 }, { "source": 19, "target": 12, "value": 56759 }, { "source": 9, "target": 12, "value": 1577175 }, { "source": 19, "target": 13, "value": 6619 }, { "source": 9, "target": 13, "value": 78998 }, { "source": 19, "target": 14, "value": 31091 }, { "source": 9, "target": 14, "value": 134944 }, { "source": 19, "target": 15, "value": 20929 }, { "source": 9, "target": 15, "value": 129217 }, { "source": 19, "target": 20, "value": 213201 }, { "source": 9, "target": 20, "value": 1811913 }, { "source": 19, "target": 21, "value": 8790 }, { "source": 9, "target": 21, "value": 68244 }, { "source": 19, "target": 22, "value": 19648 }, { "source": 9, "target": 22, "value": 103864 }] } };

    barDataRaw = {
        'data': [
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 1248,
                        "x": "2018",
                        "y": 43.10897435897436
                    },
                    {
                        "c": "#66BD63",
                        "t": 3409,
                        "x": "2016",
                        "y": 44.38251686711646
                    },
                    {
                        "c": "#D9EF8B",
                        "t": 278,
                        "x": "2017",
                        "y": 9.352517985611511
                    }
                ],
                "c": "#66BD63",
                "t": 1248,
                "x": "EME",
                "y": 43.10897435897436
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 11163,
                        "x": "2017",
                        "y": 41.40464032966049
                    },
                    {
                        "c": "#A6D96A",
                        "t": 14891,
                        "x": "2016",
                        "y": 33.41615741051642
                    }
                ],
                "c": "#66BD63",
                "t": 11163,
                "x": "NA",
                "y": 41.40464032966049
            },
            {
                "Details": [
                    {
                        "c": "#D9EF8B",
                        "t": 58,
                        "x": "2018",
                        "y": 17.24137931034483
                    },
                    {
                        "c": "#66BD63",
                        "t": 2836,
                        "x": "2017",
                        "y": 41.995768688293374
                    },
                    {
                        "c": "#66BD63",
                        "t": 2590,
                        "x": "2016",
                        "y": 47.6061776061776
                    }
                ],
                "c": "#D9EF8B",
                "t": 58,
                "x": "SA",
                "y": 17.24137931034483
            }
        ]
    };
    tableDataRaw = {
        "data": [
            {
                "Details": [
                    {
                        "c": "#006837",
                        "t": 7,
                        "x": "2017",
                        "y": 100
                    },
                    {
                        "c": "#66BD63",
                        "t": 7,
                        "x": "2016",
                        "y": 57.142857142857146
                    }
                ],
                "c": "#006837",
                "t": 7,
                "x": "WA",
                "y": 100
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 11,
                        "x": "2017",
                        "y": 27.272727272727273
                    },
                    {
                        "c": "#1A9850",
                        "t": 26,
                        "x": "2016",
                        "y": 69.23076923076923
                    }
                ],
                "c": "#A6D96A",
                "t": 11,
                "x": "DE",
                "y": 27.272727272727273
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 415,
                        "x": "2017",
                        "y": 38.31325301204819
                    },
                    {
                        "c": "#A6D96A",
                        "t": 614,
                        "x": "2016",
                        "y": 34.039087947882734
                    }
                ],
                "c": "#A6D96A",
                "t": 415,
                "x": "WI",
                "y": 38.31325301204819
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 3,
                        "x": "2017",
                        "y": 33.333333333333336
                    },
                    {
                        "c": "#006837",
                        "t": 1,
                        "x": "2016",
                        "y": 100
                    }
                ],
                "c": "#A6D96A",
                "t": 3,
                "x": "WV",
                "y": 33.333333333333336
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 15,
                        "x": "2016",
                        "y": 40
                    }
                ],
                "c": "#66BD63",
                "t": 15,
                "x": "FL",
                "y": 40
            },
            {
                "Details": [
                    {
                        "c": "#D9EF8B",
                        "t": 6,
                        "x": "2017",
                        "y": 16.666666666666668
                    },
                    {
                        "c": "#FEE08B",
                        "t": 9,
                        "x": "2016",
                        "y": -11.11111111111111
                    }
                ],
                "c": "#D9EF8B",
                "t": 6,
                "x": "WY",
                "y": 16.666666666666668
            },
            {
                "Details": [
                    {
                        "c": "#D9EF8B",
                        "t": 2,
                        "x": "2016",
                        "y": 0
                    }
                ],
                "c": "#D9EF8B",
                "t": 2,
                "x": "NH",
                "y": 0
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 9,
                        "x": "2017",
                        "y": 44.44444444444444
                    },
                    {
                        "c": "#D9EF8B",
                        "t": 11,
                        "x": "2016",
                        "y": 9.090909090909092
                    }
                ],
                "c": "#66BD63",
                "t": 9,
                "x": "NJ",
                "y": 44.44444444444444
            },
            {
                "Details": [
                    {
                        "c": "#1A9850",
                        "t": 5,
                        "x": "2017",
                        "y": 60
                    },
                    {
                        "c": "#66BD63",
                        "t": 7,
                        "x": "2016",
                        "y": 42.857142857142854
                    }
                ],
                "c": "#1A9850",
                "t": 5,
                "x": "NM",
                "y": 60
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 48,
                        "x": "2017",
                        "y": 33.333333333333336
                    },
                    {
                        "c": "#A6D96A",
                        "t": 102,
                        "x": "2016",
                        "y": 33.333333333333336
                    }
                ],
                "c": "#A6D96A",
                "t": 48,
                "x": "TX",
                "y": 33.333333333333336
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 34,
                        "x": "2017",
                        "y": 44.11764705882353
                    },
                    {
                        "c": "#1A9850",
                        "t": 58,
                        "x": "2016",
                        "y": 63.793103448275865
                    }
                ],
                "c": "#66BD63",
                "t": 34,
                "x": "LA",
                "y": 44.11764705882353
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 94,
                        "x": "2017",
                        "y": 50
                    },
                    {
                        "c": "#66BD63",
                        "t": 214,
                        "x": "2016",
                        "y": 42.05607476635514
                    }
                ],
                "c": "#66BD63",
                "t": 94,
                "x": "NC",
                "y": 50
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 393,
                        "x": "2017",
                        "y": 37.404580152671755
                    },
                    {
                        "c": "#A6D96A",
                        "t": 511,
                        "x": "2016",
                        "y": 31.31115459882583
                    }
                ],
                "c": "#A6D96A",
                "t": 393,
                "x": "ND",
                "y": 37.404580152671755
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 636,
                        "x": "2017",
                        "y": 36.16352201257862
                    },
                    {
                        "c": "#A6D96A",
                        "t": 720,
                        "x": "2016",
                        "y": 35.27777777777778
                    }
                ],
                "c": "#A6D96A",
                "t": 636,
                "x": "NE",
                "y": 36.16352201257862
            },
            {
                "Details": [
                    {
                        "c": "#1A9850",
                        "t": 61,
                        "x": "2017",
                        "y": 62.295081967213115
                    },
                    {
                        "c": "#A6D96A",
                        "t": 100,
                        "x": "2016",
                        "y": 35
                    }
                ],
                "c": "#1A9850",
                "t": 61,
                "x": "TN",
                "y": 62.295081967213115
            },
            {
                "Details": [
                    {
                        "c": "#1A9850",
                        "t": 72,
                        "x": "2017",
                        "y": 63.888888888888886
                    },
                    {
                        "c": "#A6D96A",
                        "t": 104,
                        "x": "2016",
                        "y": 36.53846153846154
                    }
                ],
                "c": "#1A9850",
                "t": 72,
                "x": "NY",
                "y": 63.888888888888886
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 170,
                        "x": "2017",
                        "y": 55.294117647058826
                    },
                    {
                        "c": "#66BD63",
                        "t": 238,
                        "x": "2016",
                        "y": 44.95798319327731
                    }
                ],
                "c": "#66BD63",
                "t": 170,
                "x": "PA",
                "y": 55.294117647058826
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 64,
                        "x": "2017",
                        "y": 59.375
                    },
                    {
                        "c": "#A6D96A",
                        "t": 88,
                        "x": "2016",
                        "y": 38.63636363636363
                    }
                ],
                "c": "#66BD63",
                "t": 64,
                "x": "VA",
                "y": 59.375
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 32,
                        "x": "2017",
                        "y": 43.75
                    },
                    {
                        "c": "#D9EF8B",
                        "t": 46,
                        "x": "2016",
                        "y": 19.565217391304348
                    }
                ],
                "c": "#66BD63",
                "t": 32,
                "x": "CO",
                "y": 43.75
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 3,
                        "x": "2017",
                        "y": 33.333333333333336
                    },
                    {
                        "c": "#66BD63",
                        "t": 14,
                        "x": "2016",
                        "y": 42.857142857142854
                    }
                ],
                "c": "#A6D96A",
                "t": 3,
                "x": "CA",
                "y": 33.333333333333336
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 24,
                        "x": "2017",
                        "y": 33.333333333333336
                    },
                    {
                        "c": "#66BD63",
                        "t": 51,
                        "x": "2016",
                        "y": 58.8235294117647
                    }
                ],
                "c": "#A6D96A",
                "t": 24,
                "x": "AL",
                "y": 33.333333333333336
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 50,
                        "x": "2017",
                        "y": 48
                    },
                    {
                        "c": "#66BD63",
                        "t": 103,
                        "x": "2016",
                        "y": 53.398058252427184
                    }
                ],
                "c": "#66BD63",
                "t": 50,
                "x": "AR",
                "y": 48
            },
            {
                "Details": [
                    {
                        "c": "#006837",
                        "t": 1,
                        "x": "2016",
                        "y": 100
                    }
                ],
                "c": "#006837",
                "t": 1,
                "x": "VT",
                "y": 100
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 1128,
                        "x": "2017",
                        "y": 41.04609929078014
                    },
                    {
                        "c": "#A6D96A",
                        "t": 1609,
                        "x": "2016",
                        "y": 37.72529521441889
                    }
                ],
                "c": "#66BD63",
                "t": 1128,
                "x": "IL",
                "y": 41.04609929078014
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 8,
                        "x": "2017",
                        "y": 50
                    },
                    {
                        "c": "#A6D96A",
                        "t": 87,
                        "x": "2016",
                        "y": 21.839080459770116
                    }
                ],
                "c": "#66BD63",
                "t": 8,
                "x": "GA",
                "y": 50
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 433,
                        "x": "2017",
                        "y": 40.877598152424945
                    },
                    {
                        "c": "#A6D96A",
                        "t": 561,
                        "x": "2016",
                        "y": 39.21568627450981
                    }
                ],
                "c": "#66BD63",
                "t": 433,
                "x": "IN",
                "y": 40.877598152424945
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 1259,
                        "x": "2017",
                        "y": 39.15806195393169
                    },
                    {
                        "c": "#A6D96A",
                        "t": 1732,
                        "x": "2016",
                        "y": 36.48960739030023
                    }
                ],
                "c": "#A6D96A",
                "t": 1259,
                "x": "IA",
                "y": 39.15806195393169
            },
            {
                "Details": [
                    {
                        "c": "#D9EF8B",
                        "t": 1,
                        "x": "2016",
                        "y": 0
                    }
                ],
                "c": "#D9EF8B",
                "t": 1,
                "x": "MA",
                "y": 0
            },
            {
                "Details": [
                    {
                        "c": "#D9EF8B",
                        "t": 1,
                        "x": "2017",
                        "y": 0
                    },
                    {
                        "c": "#66BD63",
                        "t": 13,
                        "x": "2016",
                        "y": 46.15384615384615
                    }
                ],
                "c": "#D9EF8B",
                "t": 1,
                "x": "AZ",
                "y": 0
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 2,
                        "x": "2017",
                        "y": 50
                    },
                    {
                        "c": "#D9EF8B",
                        "t": 1,
                        "x": "2016",
                        "y": 0
                    }
                ],
                "c": "#66BD63",
                "t": 2,
                "x": "CT",
                "y": 50
            },
            {
                "Details": [
                    {
                        "c": "#A50026",
                        "t": 1,
                        "x": "2016",
                        "y": -100
                    }
                ],
                "c": "#A50026",
                "t": 1,
                "x": "ME",
                "y": -100
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 76,
                        "x": "2017",
                        "y": 40.78947368421053
                    },
                    {
                        "c": "#66BD63",
                        "t": 50,
                        "x": "2016",
                        "y": 52
                    }
                ],
                "c": "#66BD63",
                "t": 76,
                "x": "MD",
                "y": 40.78947368421053
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 46,
                        "x": "2017",
                        "y": 43.47826086956522
                    },
                    {
                        "c": "#66BD63",
                        "t": 49,
                        "x": "2016",
                        "y": 44.89795918367347
                    }
                ],
                "c": "#66BD63",
                "t": 46,
                "x": "OK",
                "y": 43.47826086956522
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 274,
                        "x": "2017",
                        "y": 37.956204379562045
                    },
                    {
                        "c": "#A6D96A",
                        "t": 422,
                        "x": "2016",
                        "y": 35.07109004739336
                    }
                ],
                "c": "#A6D96A",
                "t": 274,
                "x": "OH",
                "y": 37.956204379562045
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 276,
                        "x": "2017",
                        "y": 51.44927536231884
                    },
                    {
                        "c": "#A6D96A",
                        "t": 389,
                        "x": "2016",
                        "y": 36.50385604113111
                    }
                ],
                "c": "#66BD63",
                "t": 276,
                "x": "MO",
                "y": 51.44927536231884
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 1138,
                        "x": "2017",
                        "y": 34.797891036906854
                    },
                    {
                        "c": "#A6D96A",
                        "t": 1539,
                        "x": "2016",
                        "y": 34.50292397660819
                    }
                ],
                "c": "#A6D96A",
                "t": 1138,
                "x": "MN",
                "y": 34.797891036906854
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 269,
                        "x": "2017",
                        "y": 48.3271375464684
                    },
                    {
                        "c": "#66BD63",
                        "t": 380,
                        "x": "2016",
                        "y": 42.36842105263158
                    }
                ],
                "c": "#66BD63",
                "t": 269,
                "x": "MI",
                "y": 48.3271375464684
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 411,
                        "x": "2017",
                        "y": 34.306569343065696
                    },
                    {
                        "c": "#A6D96A",
                        "t": 464,
                        "x": "2016",
                        "y": 33.4051724137931
                    }
                ],
                "c": "#A6D96A",
                "t": 411,
                "x": "KS",
                "y": 34.306569343065696
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 17,
                        "x": "2017",
                        "y": 29.41176470588235
                    },
                    {
                        "c": "#FEE08B",
                        "t": 7,
                        "x": "2016",
                        "y": -14.285714285714286
                    }
                ],
                "c": "#A6D96A",
                "t": 17,
                "x": "MT",
                "y": 29.41176470588235
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 71,
                        "x": "2017",
                        "y": 42.25352112676056
                    },
                    {
                        "c": "#66BD63",
                        "t": 87,
                        "x": "2016",
                        "y": 54.02298850574713
                    }
                ],
                "c": "#66BD63",
                "t": 71,
                "x": "MS",
                "y": 42.25352112676056
            },
            {
                "Details": [
                    {
                        "c": "#A6D96A",
                        "t": 36,
                        "x": "2017",
                        "y": 36.111111111111114
                    },
                    {
                        "c": "#66BD63",
                        "t": 71,
                        "x": "2016",
                        "y": 59.15492957746479
                    }
                ],
                "c": "#A6D96A",
                "t": 36,
                "x": "SC",
                "y": 36.111111111111114
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 133,
                        "x": "2017",
                        "y": 50.37593984962406
                    },
                    {
                        "c": "#66BD63",
                        "t": 153,
                        "x": "2016",
                        "y": 50.326797385620914
                    }
                ],
                "c": "#66BD63",
                "t": 133,
                "x": "KY",
                "y": 50.37593984962406
            },
            {
                "Details": [
                    {
                        "c": "#66BD63",
                        "t": 598,
                        "x": "2017",
                        "y": 43.812709030100336
                    },
                    {
                        "c": "#A6D96A",
                        "t": 830,
                        "x": "2016",
                        "y": 39.397590361445786
                    }
                ],
                "c": "#66BD63",
                "t": 598,
                "x": "SD",
                "y": 43.812709030100336
            }
        ],
        "params": {
            "geo": "CUS",
            "kpi": "NPS",
            "subgeo": "STATE"
        },
        "summary": {
            "cached": false,
            "colorscale": "https://datainsights-maps-api.velocity-np.ag/data/colors/10/RdYlGn",
            "hierarchy": [
                "geo",
                "year"
            ],
            "legend": [
                {
                    "color": "#A50026",
                    "max": -80,
                    "min": -100
                },
                {
                    "color": "#D73027",
                    "max": -60,
                    "min": -80
                },
                {
                    "color": "#F46D43",
                    "max": -40,
                    "min": -60
                },
                {
                    "color": "#FDAE61",
                    "max": -20,
                    "min": -40
                },
                {
                    "color": "#FEE08B",
                    "max": 0,
                    "min": -20
                },
                {
                    "color": "#D9EF8B",
                    "max": 20,
                    "min": 0
                },
                {
                    "color": "#A6D96A",
                    "max": 40,
                    "min": 20
                },
                {
                    "color": "#66BD63",
                    "max": 60,
                    "min": 40
                },
                {
                    "color": "#1A9850",
                    "max": 80,
                    "min": 60
                },
                {
                    "color": "#006837",
                    "max": 100,
                    "min": 80
                }
            ],
            "max": 100,
            "min": -100
        }
    };
    lineDataRaw = {
        "data": [{
            "Details": [
                {
                    "c": "US",
                    "t": 10965,
                    "x": "2016",
                    "y": 40
                },
                {
                    "c": "US",
                    "t": 11833,
                    "x": "2017",
                    "y": 42
                },
                {
                    "c": "US",
                    "t": 11833,
                    "x": "2018",
                    "y": 41
                }
            ],
            "c": "#66BD63",
            "t": 10965,
            "x": "US",
            "y": 40.69311445508436
        }
        ],

    };

    waterfallChartData = {
        'data': [
            {
                'name': 'waterfallChart',
                'Details': [
                    { 'x': 'Product Revenue', 'y': 420000 },
                    { 'x': 'Services Revenue', 'y': 210000 },
                    { 'x': 'Fixed Costs', 'y': 170000 },
                    { 'x': 'Variable Costs', 'y': 140000 }
                ]
            }
        ],
    };

    constructor() {
    }


    ngOnInit() {
        // this.sankeyData = new SankeyBuilder(this.poData, 'asdkjf;alskdfj');
        const metric2b = JSON.parse(JSON.stringify(this.barDataRaw));
        const barDataDos = new StandardBuilder(metric2b, 'blah', 1);

        this.barData = new StandardBuilder(this.barDataRaw, 'blah', 1);
        this.lineChartData = new StandardBuilder(this.lineDataRaw, 'Line-Chart', 1);
        this.waterFallChart = new StandardBuilder(this.waterfallChartData, 'water-Chart', 1);
        //this.lineData = new StandardBuilder(this.lineDataRaw, 'LineChart', 1);
        // this.tableData = new TableBuilder(this.tableDataRaw, ['Year', 'Count', 'Value'], 'Nice Table :) ');
    }

}
