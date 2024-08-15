import { Injectable } from '@angular/core';
import { Observable } from '@apollo/client/utilities';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GitserviceService {

  constructor(private readonly apollo: Apollo) { }
  private dataSet = new BehaviorSubject<Array<Object>>([]);
  public getDetailsOfRepo() {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            viewer {
              repositories(first: 100, affiliations: [OWNER]) {
                totalCount
                pageInfo {
                  endCursor
                  hasNextPage
                }
                nodes{
                  name,
                  createdAt,
                  stargazerCount,
                  projectsUrl,
                  owner{
                    login
                  }
                  }
                }
            }
          }
      `,
      })
      // .valueChanges.subscribe((result: any) => {
      //  return this.dataSet = result.data.viewer.repositories.nodes;
      // })
  }
}
