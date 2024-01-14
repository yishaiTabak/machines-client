import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseConverterService {

  constructor() { }

  snakeToCamelString(str:string) {
    return str.replace(/_([a-z])/g, function(match, group1) {
      return group1.toUpperCase();
    });
  }

  camelToSnakeString(str:string) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  camelToSnakeObj(obj:any) {
    const snakeObj:any = {}
    Object.keys(obj).forEach(key => {
      snakeObj[this.camelToSnakeString(key)] = obj[key]
    })
    return snakeObj
  }

  snakeToCamelObj(obj:any) {
    const camelObj:any = {}
    Object.keys(obj).forEach(key =>{
      camelObj[this.snakeToCamelString(key)] = obj[key]
    })
    return camelObj
  }
  
  snakeToCamelArrayOfObj(array:any){
    const camelArray:any = []
    array.forEach((obj:any) => {
      camelArray.push(this.snakeToCamelObj(obj))
    });
    return camelArray
  }
}

