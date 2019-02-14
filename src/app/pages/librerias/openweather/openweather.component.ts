import { Component, OnInit } from '@angular/core';
import { ApiService } from '@mugan86/openweather-api';

@Component({
  selector: 'app-openweather',
  templateUrl: './openweather.component.html',
  styleUrls: ['./openweather.component.css']
})
export class OpenweatherComponent implements OnInit {

  title = 'app-openweather';
  apiService: ApiService;

  ngOnInit() {
    this.apiService = new ApiService('ec32f42ea9357dae4e8e8dbc6d0f77f9', 'm', 'es');
    this.apiService.getCurrentWeather('city', ['Barcelona,es']).then(
      (data) => {
        console.log('***************** BARCELONA *****************');
        console.log(data);
      },
      (err) => console.error(err) // Show error in console);
    );
    this.apiService.getCurrentWeather('zip', ['89104']).then(
      (data) => {
          console.log('***************** LAS VEGAS *****************');
          console.log(data);
      },
      (err) => console.error(err) // Show error in console);
  );
    this.apiService.getCurrentWeather('location', [{lat: 43.184284, lon: -2.473275}]).then(
      (data) => {
          console.log('***************** Eibar *****************');
          console.log(data);
      },
      (err) => console.error(err) // Show error in console);
  );
  }

}
