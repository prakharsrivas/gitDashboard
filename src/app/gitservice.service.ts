import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs/operators";
import { Node } from "./GitData.interface";
@Injectable({
  providedIn: "root",
})
export class GitserviceService {
  constructor(private readonly apollo: Apollo) {}

  dataSet:Array<Node>=[]
  
  public getDetailsOfRepo(){
    return this.apollo.watchQuery({
        query: gql`
          {
            viewer {
              repositories(first: 100, affiliations: [OWNER]) {
                totalCount
                nodes {
                  name
                  createdAt
                  stargazerCount
                  projectsUrl
                }
              }
            }
          }
        `,
      })
      .valueChanges.pipe(map((result: any) => this.dataSet = result.data.viewer.repositories.nodes));
  }

  public getAllData(){
    this.getDetailsOfRepo()
    console.log('getAllData')
    return this.dataSet;
  }
}
