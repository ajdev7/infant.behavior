import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import _ from "lodash";

// am4core.useTheme(am4themes_animated);

export class LineChart extends Component {
  componentDidMount() {
    this.initChart();

    this.range.value = this.props.guide;
    this.seriesRange.value = this.props.guide;
  }

  componentDidUpdate(prevProps) {
    //Handle refreshing the chart when the dataset changes
    // if (!_.isEqual(prevProps.data, this.props.data)) {
    // if (this.chart._super) {
    //   this.chart.dispose();
    // }
    // this.initChart();

    this.range.value = this.props.guide;
    this.seriesRange.value = this.props.guide;

    // }
  }

  componentWillUnmount() {
    if (this.chart._super) {
      this.chart.dispose();
    }
  }

  onDragDate = (days) => {
    this.props.onDragDate(days);
  };

  initChart = () => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let data = this.props.data;
    chart.data = data;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var xAxis = chart.xAxes.push(new am4charts.DurationAxis());
    xAxis.baseUnit = "day";
    xAxis.title.text = "Duration";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "totalDays";
    series.dataFields.valueY = "value";

    series.tooltipText = "{name}";
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    series.fillOpacity = 0.5;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    let bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "none";

    // chart.cursor.xAxis = dateAxis;

    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    // chart.scrollbarY = new am4core.Scrollbar();
    // chart.scrollbarY.parent = chart.leftAxesContainer;
    // chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    //xAxis.start = -500;
    // dateAxis.keepSelection = true;

    var seriesRange = xAxis.createSeriesRange(series);
    //seriesRange.contents.strokeDasharray = "2,3";
    // seriesRange.contents.stroke = chart.colors.getIndex(8);
    // seriesRange.contents.strokeWidth = 1;

    seriesRange.contents.fill = am4core.color("#555555");
    seriesRange.contents.fillOpacity = 0.1;

    seriesRange.value = 0;
    seriesRange.endValue = chart.data[chart.data.length - 1].totalDays;

    // Create value axis range
    var range = xAxis.axisRanges.create();
    // range.value = this.props.guide;
    // range.grid.stroke = am4core.color("#A96478");
    // range.grid.strokeWidth = 2;
    // range.grid.strokeOpacity = 1;
    // range.grid.above = true;

    range.grid.stroke = am4core.color("black");
    range.grid.strokeWidth = 2;
    range.grid.strokeOpacity = 1;
    range.grid.above = true;

    range.bullet = new am4core.ResizeButton();
    range.bullet.background.fill = am4core.color("#555555");
    range.bullet.background.states.copyFrom(
      chart.zoomOutButton.background.states
    );
    range.bullet.minX = 0;
    range.bullet.adapter.add("minY", function (minY, target) {
      target.maxY = chart.plotContainer.maxHeight;
      target.maxX = chart.plotContainer.maxWidth;
      return chart.plotContainer.maxHeight;
    });

    var component = this;

    range.bullet.events.on(
      "dragged",
      function (ev) {
        range.value = xAxis.xToValue(range.bullet.pixelX);
        seriesRange.value = range.value;

        // console.log("range.value : ", range.value);
        this.onDragDate(range.value);
      },
      this
    );

    this.range = range;
    this.seriesRange = seriesRange;
    this.chart = chart;

    chart.logo.disabled = true;
  };

  render() {
    return (
      <div className="linechart" style={{ width: "100%", height: "80%" }}>
        <div className="title" style={{ width: "100%", textAlign: "center" }}>
          <h4 className="chart-title">
            Social-Emotional Behavioral Graph for Infants <br />
            (Newborn to 15 Months)
          </h4>
        </div>
        <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
      </div>
    );
  }
}

export default LineChart;
