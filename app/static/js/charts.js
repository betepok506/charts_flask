function draw_donut_chart() {
    // https://www.anychart.com/ru/products/anychart/gallery/Pie_and_Donut_Charts/Donut_Chart.php
    // create pie chart with passed data
    var chart = anychart.pie([
        ['Department Stores', 6371664],
        ['Discount Stores', 7216301],
        ['Men\'s/Women\'s Stores', 1486621],
        ['Juvenile Specialty Stores', 786622],
        ['All other outlets', 900000]
    ]);

    // set chart title text settings
    chart
    .title('Пример круговой диаграммы для статей по темам')
    // set chart radius
    .radius('43%')
    // create empty area in pie chart
    .innerRadius('30%');

    // set container id for the chart
    chart.container('donut_chart_container');
    // initiate chart drawing
    chart.draw();
}

function draw_tag_cloud() {
    //
    // The data used in this sample can be obtained from the CDN
      // https://cdn.anychart.com/samples/tag-cloud/population-by-countries/data.json
  anychart.data.loadJsonFile(
    'https://cdn.anychart.com/samples/tag-cloud/population-by-countries/data.json',
    function (data) {
      var dataSet = anychart.data.set(data);
      var colors = anychart.scales
        .ordinalColor()
        .colors(['#26959f', '#f18126', '#3b8ad8', '#60727b', '#e24b26']);

      // create tag cloud
      var chart = anychart.tagCloud();
      // Заголовок диаграммы
      title = 'Тут будут самые частые теги (Пародируем MADE ;) )'
      // div в который будет вставлена эта диаграмма
      container = 'tag_cloud_container'
      // set chart title
      chart
        .title(title)
        // set data with settings
        .data(dataSet)
        // set color scale
        .colorScale(colors)
        // set array of angles, by which words will be placed
        .angles([-90, 0, 90]);

      // get the color range
      var colorRange = chart.colorRange();
      // enabled color range
      colorRange
        .enabled(true)
        // sets color line size
        .colorLineSize(15);

      // set container id for the chart
      chart.container(container);
      // initiate chart drawing
      chart.draw();

      // save normal fill function to variable
      var normalFillFunction = chart.normal().fill();
      // save hover fill function to variable
      var hoveredFillFunction = chart.hovered().fill();

      // create custom interactivity to hover colorRange
      chart.listen('pointsHover', function (e) {
        if (e.actualTarget === colorRange) {
          // if points exist
          if (e.points.length) {
            // set settings for normal state
            chart.normal({
              fill: 'black 0.1'
            });
            // set settings for hovered state
            chart.hovered({
              // get fill color ratio by its number and set fill to hovered state
              fill: chart
                .colorScale()
                .valueToColor(e.point.get('category'))
            });
          } else {
            // set function for normal state
            chart.normal({
              fill: normalFillFunction
            });
            // set function for hovered state
            chart.hovered({
              fill: hoveredFillFunction
            });
          }
        }
      });
    }
  );
}

function draw_articles_by_year() {
    // https://www.anychart.com/ru/products/anychart/gallery/Area_Charts/Single-Series_Area_Chart_with_Logarithmic_Y-Axis.php
    // create area chart
      var chart = anychart.area();

      // turn on chart animation
      chart.animation(true);

      // set chart title text settings
      chart
        .title()
        .enabled(true)
        .useHtml(true)
        .text(
          'Количество статей по годам <br/>' +
          '<span style="color:#212121; font-size: 13px;">(unique visitors)</span>'
        );

      // axis title
      chart.yAxis().title('Количество статей');

      // create a logarithmic scale
      var logScale = anychart.scales.log();
      logScale
        .minimum(1) // set scale minimum value
        .maximumGap(0.2); // increase scale maximum gap
      logScale.ticks().count(6); // set fixed major ticks count
      logScale.minorTicks().mode('logarithmic'); // set minor ticks to use logarithmic mode

      // set scale for the chart
      // it force to use passed scale in all scale dependent entries such axes, grids, crosshairs etc
      chart.yScale(logScale);

      // create area series on passed data
      var series = chart.area([
        ['1990', 112],
        ['1991', 163],
        ['1992', 229],
        ['1993', 990],
        ['1994', 4104],
        ['9990', 3250],
        ['7893', 5720],
        ['2131', 43],
        ['72133', 61],
        ['7921', 34],
        ['7992', 45],
        ['7993', 122]
      ]);

      // set series data labels settings
      series
        .labels()
        .enabled(true)
        .fontColor('#212121')
        .position('center-top')
        .anchor('center-bottom');

      // turn on series markers
      series.markers(true);

      // set series name
      series.name('Number of Visitors');

      // set up tooltips and interactivity settings
      series
        .tooltip()
        .position('center-top')
        .positionMode('point')
        .anchor('left-top')
        .offsetX(5)
        .offsetY(5);

      chart.interactivity().hoverMode('by-x');

      // set container for the chart
      chart.container('articles_by_years_container');
      // initiate chart drawing
      chart.draw();
}