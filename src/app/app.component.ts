import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graphic-app';
  chart = [];

  constructor(private _weather: WeatherService){}

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {
        console.log(res)
         const temp_max = res['list'].map(x => x.temp_max);
         const temp_min = res['list'].map(x => x.temp_min);
         const alldates = res['list'].map(x => x.dt);

        let weatherDates = [];
        alldates.forEach(element => {
          let jsdate = new Date(element * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
          console.log(weatherDates)

          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: weatherDates,
              dataset: [
                {
                  data: temp_max,
                  backgroundColor: [
                    'red',
                    'red',
                    'red',
                    'red',
                    'red',
                    'red',
                    'red'
                  ],
                  fill: false
                },
                {
                  data: temp_min,
                  backgroundColor: [
                    '#00fff',
                    '#00fff',
                    '#00fff',
                    '#00fff',
                    '#00fff',
                    '#00fff',
                    '#00fff'
                  ],
                  fill: false
                },
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [
                  {
                    display: true
                  }
                ],
                yAxes: [
                  {
                    display: true
                  }
                ]
              }
            }
          });
      });
    });
  }
}
 