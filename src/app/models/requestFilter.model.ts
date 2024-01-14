export interface RequestFilter{
    skip:number,
    limit:number,
    sortBy:string,
    isAsc:boolean,
    searchedId:string|null,
    searchedName:string|null,
    filterManufacturer:string[]|null,
    filterStatus:boolean|null
}