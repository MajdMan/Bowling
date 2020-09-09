export interface IResponse {
    token: string,
    points: IRound[]
}

export interface IResult{
    success : boolean,
    input : number[]
}

export type IRound = number[]