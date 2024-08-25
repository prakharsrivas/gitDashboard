// export interface Response {
//     data:viewer
// }
// export interface viewer {
//     viewer : repositories
// }
// export interface repositories {
//     repositories : repositorie
// }

// export interface repositorie{
//     nodes : node[]
//     pageInfo:object
// }

export interface Node{
    name : string,
    createdAt: string,
    stargazerCount: number,
    projectsUrl: string,
    __typename:string
}