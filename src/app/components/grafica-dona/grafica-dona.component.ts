import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {


      // graficos: any = {};

      // Doughnut
      @Input('ChartLabels') doughnutChartLabels: string[] = [];
      @Input('ChartData') doughnutChartData: number[] = [];
      @Input('ChartType') doughnutChartType: string = '';

        // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() { }



  ngOnInit() {
  }

}
