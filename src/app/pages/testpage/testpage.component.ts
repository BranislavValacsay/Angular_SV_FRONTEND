import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/_models/user';
import { vmmnetwork } from 'src/app/_models/vmmnetwork';
import { AccountServiceService } from 'src/app/_services/account-service.service';
import { NetworksService } from 'src/app/_services/networks.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent {

  constructor(private httpClient: HttpClient,
    private accountService:AccountServiceService) {}

  data:vmmnetwork;
  sessionData:user

  ngOnInit() {
    this.sessionData = this.accountService.getSessionData();
  }

  buttonPressed(){
    var url = 'https://localhost:44343/api/AD_Authentication/test';
    this.httpClient.get(url).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  buttonPressed2(){
    console.log(this.accountService.getDecodedToken(this.sessionData.token))
  }
}
