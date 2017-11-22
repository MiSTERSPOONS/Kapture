const Highcharts = require('highcharts');

require('highcharts/modules/exporting')(Highcharts);

const characteristics = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise', 'createdAt'];

const normalizeData = (data, type) => {
  return data.map((inst) => {
    return inst[type]
  })
}

const makeHighchart = (data) => {
  console.log('emotions', data)
  Highcharts.chart('container', {
    chart: {
        type: 'spline',
    },
    title: {
        text: 'Emotions'
    },
    subtitle: {
        text: 'Emotional score over time'
    },
    xAxis: {
        type: characteristics[9],
        labels: {
            overflow: 'justify'
        },
        categories: normalizeData(data, characteristics[9])
    },
    yAxis: {
        title: {
            text: 'Likely emotion'
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        tickInterval: .05
        
    },
    tooltip: {
        valueSuffix: ' %',
        crosshairs: [true, false]
    },
    plotOptions: {
        spline: {
            lineWidth: 2,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            }
        }
    },
    series: [{
      name: characteristics[0],
      data: normalizeData(data, characteristics[0])
    }, {
      name: characteristics[1],
      data: normalizeData(data, characteristics[1])
    }, {
      name: characteristics[2],
      data: normalizeData(data, characteristics[2])
    }, {
      name: characteristics[3],
      data: normalizeData(data, characteristics[3])
    }, {
      name: characteristics[4],
      data: normalizeData(data, characteristics[4])
    }
    // , {
    //   name: characteristics[5],
    //   data: normalizeData(data, characteristics[5])
    // }
    , {
      name: characteristics[6],
      data: normalizeData(data, characteristics[6])
    }, {
      name: characteristics[7],
      data: normalizeData(data, characteristics[7])
    }],
      navigation: {
          menuItemStyle: {
              fontSize: '10px'
          }
      }
});
}

export default makeHighchart