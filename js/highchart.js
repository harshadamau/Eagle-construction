var colors = Highcharts.getOptions().colors,
  categories = [
    'Excavation',
    'RCC Work',
    'Masonry',
    'Plaster',
    'Flooring, Skirting, Dado & cladding, Counters Work',
    'Wooden Works- Doors',
    'Others'
  ],
  data = [
    {
      y: 57,
      color: colors[2],
      drilldown: {
        name: 'Excavation',
        categories: [
           '57% Excavation '
        ],
        data: [
     57
        ]
      }
    },
    {
      y: 12,
      color: colors[1],
      drilldown: {
        name: 'RCC Work',
        categories: [
          '12% RCC Work ',
        ],
        data: [
        12
        ]
      }
    },
    {
      y: 6,
      color: colors[0],
      drilldown: {
        name: 'Masonry',
        categories: [
          '6% Masonry ',
        ],
        data: [
       6
        ]
      }
    },
    {
      y: 7,
      color: colors[3],
      drilldown: {
        name: 'Plaster',
        categories: [
          '7% Plaster ',
        ],
        data: [
         7
        ]
      }
    },
    {
      y: 5,
      color: colors[5],
      drilldown: {
        name: 'Flooring, Skirting, Dado &<br> cladding, Counters Work',
        categories: [
           '5%Flooring,Skirting,Dado<br>cladding,Counters Work'
        ],
        data: [
         5
        ]
      }
    },
    {
      y: 13,
      color: colors[4],
      drilldown: {
        name: 'Wooden Works- Doors',
        categories: [
            '13% Wooden Works- Doors '
        ],
        data: [
          13
        ]
      }
    },
    {
      y: 3,
      color: colors[6],
      drilldown: {
        name: 'Others',
        categories: [
          '3% Others '
        ],
        data: [
        3
        ]
      }
    }
  ],
  browserData = [],
  versionsData = [],
  i,
  j,
  dataLen = data.length,
  drillDataLen,
  brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {
    text: 'Eagle, Construction Cost: (Material + Labour) '
  // add browser data
// browserData.push({
//     name: categories[i],
//     y: data[i].y,
//     color: data[i].color
// });

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1) {
    brightness = 0.2 - (j / drillDataLen) / 5;
    versionsData.push({
      name: data[i].drilldown.categories[j],
      y: data[i].drilldown.data[j],
      color: Highcharts.Color(data[i].color).brighten(brightness).get()
    });
  }
}

// Create the chart
Highcharts.chart('container', {
  chart: {
    type: 'pie'
  },

  title: {
    text: ''
  },
  subtitle: {
    text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
  },
  legend: {
    layout: 'vertical',
    // align: 'right',
    verticalAlign: 'bottom',
    x:60,
    y: 30,
    padding: 5,
    itemMarginTop: 1,
    itemMarginBottom: 10,
    // itemStyle: {
    //     lineHeight: '14px',
    // }
},
  plotOptions: {
    pie: {
      shadow: false,
      dataLabels: {
        enabled: false
    },
    showInLegend: true,
      center: ['50%', '50%']
    }
  },
  tooltip: {
    valueSuffix: '%'
  },
  series: [{
    name: 'Browsers',
    data: browserData,
    size: '80%',
    dataLabels: {
      formatter: function () {
        return this.y > 5 ? this.point.name : null;
      },
      color: '#ffffff',
      distance: -30
    }
  }, {
    name: 'Versions',
    data: versionsData,
    size: '130%',
    innerSize: '60%',
    dataLabels: {
      formatter: function () {
        // display only if larger than 1
        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
          this.y + '%' : null;
      }
    },
    id: 'versions'
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 400,
        height: 500
      },
      chartOptions: {
        series: [{
        }, {
          id: 'versions',
          dataLabels: {
            enabled: false
          }
        }]
      }
    }]
  }
});