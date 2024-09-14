import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastTabService {

  constructor() { }

  setLastActiveTab(tab:number){
    localStorage.setItem('tab',JSON.stringify(tab));
  }

  getLastActiveTab(){
    const tabJson = localStorage.getItem('tab');
    const result = JSON.parse(tabJson);
    if(result == null){
      return 0;
    }
    return result;
  }
}
