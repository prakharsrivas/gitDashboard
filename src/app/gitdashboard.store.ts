import {inject } from "@angular/core";
import { patchState, signalStore, withState, withMethods } from "@ngrx/signals";
import { GitserviceService } from "./gitservice.service";
import { Node } from "./GitData.interface";
import { map } from "rxjs";

type GitDataState = {
  gitData: Array<Node>;
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: GitDataState = {
  gitData: [
    {
      name: "test",
      createdAt: "2012-05-18T10:45:42Z",
      stargazerCount: 1,
      projectsUrl: "1212",
      __typename: "asd",
    }
  ],
  isLoading: false,
  filter: { query: "", order: "asc" },
};

export const GitDashboardStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, _gitserviceService = inject(GitserviceService)) => ({
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      const gitData = await _gitserviceService.getAllData();
      patchState(store, { gitData, isLoading: false });
    },
  }))
);
