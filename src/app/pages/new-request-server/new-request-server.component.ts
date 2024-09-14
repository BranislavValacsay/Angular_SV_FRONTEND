import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { requestServerDto } from 'src/app/_dto/requestServerDto';
import { requestServer } from 'src/app/_models/requestServer';
import { vmmnetwork } from 'src/app/_models/vmmnetwork';
import { NetworksService } from 'src/app/_services/networks.service';
import { RequestServerService } from 'src/app/_services/request-server.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { windowsversion } from 'src/app/_models/windowsVersion';
import { OsVersionService } from 'src/app/_services/os-version.service';
import { Observable, map, startWith } from 'rxjs';
import { AccountServiceService } from 'src/app/_services/account-service.service';
import { user } from 'src/app/_models/user';
import { _isNumberValue } from '@angular/cdk/coercion';
import { AdDomainService } from 'src/app/_services/ad-domain.service';
import { ad_domain } from 'src/app/_models/ad_domain';


@Component({
  selector: 'app-new-request-server',
  templateUrl: './new-request-server.component.html',
  styleUrls: ['./new-request-server.component.scss']
})
export class NewRequestServerComponent {

  constructor(
    private serverRequest:RequestServerService,
    private osData : OsVersionService,
    private router: Router,
    private networksService: NetworksService,
    private clipboard: Clipboard,
    private location: Location,
    private snackBar: SnackbarService,
    private accountService:AccountServiceService,
    private ad_domainService:AdDomainService
  ) { }
  
  newServerForm:Form;
  osList$: Observable<windowsversion[]>
  networkdata:vmmnetwork[];
  networkdataList:vmmnetwork[];
  domains:ad_domain[];
  sessionData:user;
  newRequest:requestServerDto = {
    cpu: 4,
    memory: 8,
    networkId: "",
    vlanID: 0,
    domain: "domain2",
    windowsversionid: 2,
    VMMServerId:1,
    isSQLServer: false,
    isInfraServer: false,
    description: null,
    requester: '',
    network: '',
    ipAddress: '',
    serverName: '',
    status: 0,
    ManualOverride: false,
    disk_D : 0,
    disk_E : 0
  }
   myControl = new FormControl('');

  ngOnInit() {
    this.sessionData = this.accountService.getSessionData();
    this.loadNetworkData();
    this.osList$ = this.osData.getData()
    var requester = this.sessionData.domain + '\\' + this.sessionData.userName;
    this.newRequest.requester =  requester 
    this.loadAd_Domains();
  }

  createRequestServer() {
    this.serverRequest.createRequestServer(this.newRequest).subscribe(
      response => {
        this.router.navigateByUrl('/serverlist');
      },
      error => {
        console.log(error.error)
      }
    )
  }

  loadNetworkData() {
    this.networksService.getData().subscribe(
      (response) => {
        this.networkdata = response;
        this.networkdataList = this.networkdata
      },
      (error) => {
        console.error('Error loading data:', error);
          }
      );
  }

  loadAd_Domains() {
    this.ad_domainService.getData().subscribe(
      (response) => {
        this.domains = response;
      },
      (error) => {
        console.error('Error loading data:', error);
          }
      );
  }
  copyToClipBoard(value:requestServerDto){

    const converted:string = JSON.stringify(this.newRequest)
    this.clipboard.copy(converted)
    this.snackBar.openSnackBar("JSON data copied to clipboard");
  }

  back(): void {
    this.location.back();
  }
 
  filter():void {
    const filterValue = this.myControl.value.toLowerCase();
    if(_isNumberValue(filterValue)){
      this.networkdataList = this.networkdata.filter(o => o.vlanID.toString().toLowerCase().includes(filterValue)); 
    }
    else {
      this.networkdataList = this.networkdata.filter(o => o.name.toLowerCase().includes(filterValue)); 
    }
    
    this.newRequest.networkId = this.myControl.value;
  }
}

