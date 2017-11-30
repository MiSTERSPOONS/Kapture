const Highcharts = require('highcharts');
const moment = require('moment');

require('highcharts/modules/exporting')(Highcharts);

const characteristics = ['happiness', 'sadness', 'neutral', 'surprise', 'anger', 'fear', 'contempt', 'disgust', 'normalizeDate'];

const colors = ['#8bbc21', '#8B436C', '#2f7ed8', '#E0E000', '#E10000',
    '#20009A', '#000000', '#E06500', '#E06500', '#a6c96a']

const normalizeData = (data, type) => {
    return data.map((inst) => {
        inst = Object.assign({}, inst, {
            normalizeDate: moment(inst.createdAt).format("MMM, D h:mma"
            )
        })
        return inst[type]
    })
}

const normalizePieData = (data) => {
    console.log('DATA', data)
    const result = [];
    for (let i = 0; i < characteristics.length - 1; i++) {
        let char = [];
        char.push(characteristics[i])
        char.push(data[0][characteristics[i]])
        char.push(false)
        result.push(char)
    }
    return result
}

const makePiechart = (data) => {
    console.log('IN MAKEPIECHART***')
    Highcharts.chart('pieContainer', {

        title: {
            text: 'Emotions'
        },

        xAxis: {
            categories: ['happiness', 'sadness', 'neutral', 'surprise', 'anger', 'fear', 'contempt', 'disgust']
        },
        plotOptions: {
            pie: {
                colors: colors,
                cursor: 'pointer'
            },
            series: {
                dataLabels: {
                    enabled: true,
                    style: {
                        // fontWeight: 'bold',
                        fontSize: '18px'
                    }
                }
            }
        },

        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: normalizePieData(data),
            showInLegend: true
        }]
    });
}

const makeHighchart = (data) => {
    data.sort((a, b) => {
        return a.id - b.id;
    })
    for (let i = 0; i < 8; i++) {
        Highcharts.chart(`container${i}`, {
            chart: {
                type: 'areaspline',
            },
            title: {
                text: characteristics[i]
            },
            // subtitle: {
            //     text: 'Emotional score over time'
            // },
            xAxis: {
                type: characteristics[8],
                labels: {
                    overflow: 'justify'
                },
                categories: normalizeData(data, characteristics[8])
            },
            yAxis: {
                title: {
                    text: 'Likely emotion'
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                tickInterval: .05,

            },
            tooltip: {
                valueSuffix: ' %',
                crosshairs: [true, false]
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: characteristics[i],
                data: normalizeData(data, characteristics[i]),
                color: colors[i]
            }],
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        });
    }


}

module.exports = {
    makeHighchart,
    makePiechart
}

// Highcharts.chart('container1', {
//     chart: {
//         type: 'areaspline',
//     },
//     title: {
//         text: 'Emotions'
//     },
//     subtitle: {
//         text: 'Emotional score over time'
//     },
//     xAxis: {
//         type: characteristics[8],
//         labels: {
//             overflow: 'justify'
//         },
//         categories: normalizeData(data, characteristics[8])
//     },
//     yAxis: {
//         title: {
//             text: 'Likely emotion'
//         },
//         minorGridLineWidth: 0,
//         gridLineWidth: 0,
//         alternateGridColor: null,
//         tickInterval: .05,

//     },
//     tooltip: {
//         valueSuffix: ' %',
//         crosshairs: [true, false]
//     },
//     plotOptions: {
//         areaspline: {
//             fillOpacity: 0.5
//         }
//     },
//     series: [{
//       name: characteristics[0],
//       data: normalizeData(data, characteristics[0])
//     }, {
//       name: characteristics[1],
//       data: normalizeData(data, characteristics[1])
//     }, {
//       name: characteristics[2],
//       data: normalizeData(data, characteristics[2])
//     }, {
//       name: characteristics[3],
//       data: normalizeData(data, characteristics[3])
//     }, {
//       name: characteristics[4],
//       data: normalizeData(data, characteristics[4])
//     }
//     // , {
//     //   name: characteristics[5],
//     //   data: normalizeData(data, characteristics[5])
//     // }
//     , {
//       name: characteristics[6],
//       data: normalizeData(data, characteristics[6])
//     }, {
//       name: characteristics[7],
//       data: normalizeData(data, characteristics[7])
//     }],
//       navigation: {
//           menuItemStyle: {
//               fontSize: '10px'
//           }
//       }
// });