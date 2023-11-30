<template>
    <app-chart class="area-chart" ref="chart">
      <div class="area-chart__chart">
        <v-responsive
          class="scroll-x"
          :min-height="0"
          :style="{ 'overflow-x': 'auto' }"
        >
          <v-chart
            :init-options="initOptions"
            :option="options"
          />
        </v-responsive>
      </div>
    </app-chart>
  </template>
  
  <script>
    import { use } from 'echarts/core';
    import { CanvasRenderer } from 'echarts/renderers';
    import { LineChart } from 'echarts/charts';
    import VChart from 'vue-echarts';
  
    import {
      DataZoomComponent,
      GridComponent,
      LegendComponent,
      MarkPointComponent,
      MarkLineComponent,
      TooltipComponent,
    } from 'echarts/components';
  
    use([
      CanvasRenderer,
      DataZoomComponent,
      GridComponent,
      LegendComponent,
      LineChart,
      MarkPointComponent,
      MarkLineComponent,
      TooltipComponent,
    ]);
  
    import AppChart from '@/components/app-chart/app-chart';
  
    export default {
      components: {
        AppChart,
        VChart,
      },
      data() {
        return {
          initOptions: { height: '400px', width: '1200px' },
        };
      },
      props: {
        timeseries: {
            type: Array,
        }
      },
      mounted() {
        console.log('area-chart mounted');
        // this.setChartHeight();
      },
      computed: {
        baseOptions() {
          return {
            dataZoom: [
              {
                type: 'inside',
                start: 0,
                end: 100,
              },
              {
                start: 0,
                end: 100,
              },
            ],
            tooltip: {
              trigger: 'axis',
            },
            grid: {
              top: '16px',
              right: '40px',
              bottom: '70px',
              left: '16px',
              containLabel: true,
              backgroundColor: '#fff',
            },
          };
        },
        dates() {
          return this.timeseries.map((item) => item.date);
        },
        values() {
          return this.timeseries.map((item) => item.head);
        },
        xAxis() {
          return {
            type: 'category',
            data: this.dates,
          };
        },
        yAxis() {
          return {
            boundaryGap: [ 0, '100%' ],
            name: 'm + NAP',
            type: 'value',
            nameLocation: 'end',
            nameTextStyle: {
              padding: [ 0, 0, -12, 60 ],
            },
            min: -1.2,
            max: 2.2,
          };
        },
        options() {
          return {
            ...this.baseOptions,
            series: this.series,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
          };
        },
        series() {
          return [
            {
              data: this.values,
              itemStyle: {
                color: '#008fc5',
              },
              markPoint: {
                data: [
                  {
                    label: {
                      color: '#373737',
                      textBorderColor: 'none',
                      offset: [ 0, -15 ],
                      formatter: function (params) {
                        return params.value.toFixed(2);
                      },
                    },
                    name: 'Max',
                    symbolOffset: [ 0, -5 ],
                    symbolRotate: 180,
                    type: 'max',
                  },
                  {
                    label: {
                      color: '#373737',
                      textBorderColor: 'none',
                      offset: [ 0, 15 ],
                      formatter: function (params) {
                        return params.value.toFixed(2);
                      },
                    },
                    name: 'Min',
                    symbolOffset: [ 0, 5 ],
                    type: 'min',
                  },
                ],
                emphasis: {
                  disabled: true,
                },
                itemStyle: {
                  color: '#373737',
                },
                symbol: 'arrow',
                symbolSize: '10',
              },
              markLine: {
                data: [
                  { yAxis: -0.4, name: 'Streefpeil Noordzeekanaal' },
                  { yAxis: -1.03, name: 'Laagwater' },
                  { yAxis: 1.8, name: 'Gemiddeld hoogwater' },
                ],
                label: {
                  show: true,
                  position: 'insideStartBottom',
                  formatter: function(params) {
                    return params.data.name;
                  },
                },
                emphasis: {
                  disabled: true,
                },
                lineStyle: {
                  color: '#373737',
                },
                symbol: [ 'none', 'none' ],
              },
              name: 'Grondwaterstand m + NAP',
              sampling: 'lttb',
              type: 'line',
            },
          ];
        },
      },
      methods: {
        setChartHeight() {
          console.log(this.$refs.chart.$el);
          const { offsetHeight } = this.$refs.chart.$el;
          console.log(offsetHeight);
          // set offset hight and remove 16px padding to prevent overflow.
          this.initOptions.height = `${ offsetHeight - 16 }px`;
        },
      },
    };
  </script>
  
  <style src="./area-chart.css"></style>