// eslint-disable-next-line no-unused-vars
export const donutOptionCreator = (chartData) => ({
  chart: {
    type: 'pie',
    renderTo: 'container'
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: 'TEST'
  },
  plotOptions: {
    pie: {
      innerSize: '75%'
    }
  },
  series: [
    {
      data: [
        ['Firefox', 44.2],
        ['IE7', 26.6],
        ['IE6', 20],
        ['Chrome', 3.1],
        ['Other', 5.4]
      ]
    }
  ],
  credits: {
    enabled: false
  }
});
