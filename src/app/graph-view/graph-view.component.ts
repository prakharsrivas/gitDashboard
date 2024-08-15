import { Component, Input, OnInit} from '@angular/core';
import { GitserviceService } from '../gitservice.service';
import * as d3 from 'd3';
@Component({
  selector: 'app-graph-view',
  standalone: true,
  imports: [],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent implements OnInit{

  constructor(private _gitserviceService:GitserviceService){}

  graphData!:Array<Object>;

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  ngOnInit(): void {
    this._gitserviceService.getDetailsOfRepo().valueChanges.subscribe((result: any) => {
      this.graphData = result.data.viewer.repositories.nodes;
      this.createSvg();
      this.drawBars(this.graphData);
    });
}

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.name))
  .padding(0.2);


  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  const y = d3.scaleLinear()
  .domain([0, 5])
  .range([this.height, 0]);

  this.svg.append("g")
  .call(d3.axisLeft(y));

  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.name))
  .attr("y", (d: any) => y(d.stargazerCount))
  .attr("width", x.bandwidth())
  .attr("height", (d: any) => this.height - y(d.stargazerCount))
  .attr("fill", "#d04a35");
}
}
