import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { requestServer } from 'src/app/_models/requestServer';
import { RequestServerService } from 'src/app/_services/request-server.service';
import { Location } from '@angular/common';
import { NetworksService } from 'src/app/_services/networks.service';
import { vmmnetwork } from 'src/app/_models/vmmnetwork';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpParams } from '@angular/common/http';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { firstFreeIpAddress } from 'src/app/_models/firstFreeIpAddress';
import { ServerNamesService } from 'src/app/_services/server-names.service';
import { MatDialog } from '@angular/material/dialog';
import { windowsversion } from 'src/app/_models/windowsVersion';
import { Observable } from 'rxjs/internal/Observable';
import { OsVersionService } from 'src/app/_services/os-version.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { _isNumberValue } from '@angular/cdk/coercion';
import { requestServerDto } from 'src/app/_dto/requestServerDto';
import { AdDomainService } from 'src/app/_services/ad-domain.service';
import { ad_domain } from 'src/app/_models/ad_domain';
import { LogService } from 'src/app/_services/logservice.service';
import { log } from 'src/app/_models/log';
import { LastTabService } from 'src/app/_services/lastTab.service';

@Component({
  selector: 'app-request-server-detail',
  templateUrl: './request-server-detail.component.html',
  styleUrls: ['./request-server-detail.component.scss']
})
export class RequestServerDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private serverRequest:RequestServerService,
    private router: Router,
    private osData : OsVersionService,
    private networksService: NetworksService,
    private clipboard: Clipboard,
    private snackBar: SnackbarService,
    private serverNameService:ServerNamesService,
    private dialog: MatDialog,
    private ad_domainService:AdDomainService,
    private logService:LogService,
    private lastTabService: LastTabService
    )
  {

  }

  url: string; //change me
  requestProperties: requestServer;
  requestPropertiesDto : requestServerDto
  private servername = new ReplaySubject<string>(1);
  servername$ = this.servername.asObservable();
  domains:ad_domain[];
  lastTab: number;
  
  inputDisabled:boolean = false;
  form:Form;
  networkdata:vmmnetwork[];
  networkdataList:vmmnetwork[];
  logData$: Observable<log>;
  ipAddress:firstFreeIpAddress;
  osList$: Observable<windowsversion[]>
  selectedTab = new FormControl(0);
  nwControl = new FormControl('');
  userForm = new FormGroup({
    serverName:new FormControl<string>(""),
    guid:new FormControl<string>(""),
    cpu : new FormControl<number>(null),
    memory: new FormControl<number>(null),
    network:new FormControl<string>(""),
    networkId:new FormControl<string>(""),
    vlanID: new FormControl<number>(null),
    domain:new FormControl<string>(""),
    windowsVersionId: new FormControl<number>(null),
    location:new FormControl<string>(""),
    VMMServerId:new FormControl<number>(null),
    isSQLServer:new FormControl<boolean>(null),
    isInfraServer:new FormControl<boolean>(null),
    description:new FormControl<string>(""),
    requester:new FormControl<string>(""),
    ipAddress:new FormControl<string>(""),
    blimpId:new FormControl<number>(null),
    blimpEnv:new FormControl<string>(""),
    blimpName:new FormControl<string>(""),
    leonRequestId:new FormControl<string>(""),
    disk_D:new FormControl<number>(null),
    disk_E:new FormControl<number>(null)
  })

    ngOnInit(): void { 
      this.loadNetworkData();
      this.osList$ = this.osData.getData()
      this.url = this.route.snapshot.paramMap.get('url');
      this.loadServerRequest(this.url);
      this.loadAd_Domains();
      
      this.lastTab = this.lastTabService.getLastActiveTab();
      this.selectedTab.setValue(this.lastTab);
    }

    loadServerRequest(guid:string){
      this.serverRequest.getSingleServer(guid).subscribe(
        (response) => {
          this.requestProperties = response;
          this.userForm.patchValue({
            windowsVersionId:this.requestProperties.windowsVersion.id,
            cpu:this.requestProperties.cpu,
            memory:this.requestProperties.memory,
            network:this.requestProperties.network,
            networkId:this.requestProperties.networkDTO.name, 
            vlanID:this.requestProperties.vlanID,
            domain:this.requestProperties.domain,
            serverName:this.requestProperties.serverName,
            location:this.requestProperties.location,
            VMMServerId:this.requestProperties.vmmServer.id,
            isSQLServer:this.requestProperties.isSQLServer,
            isInfraServer:this.requestProperties.isInfraServer,
            description:this.requestProperties.description,
            requester:this.requestProperties.requester,
            ipAddress:this.requestProperties.ipAddress,
            blimpId:this.requestProperties.blimpId,
            blimpEnv:this.requestProperties.blimpEnv,
            blimpName:this.requestProperties.blimpName,
            guid:this.requestProperties.guid,
            leonRequestId:this.requestProperties.leonRequestId,
            disk_D :this.requestProperties.disk_D,
            disk_E :this.requestProperties.disk_E
          })
          this.nwControl.patchValue(this.userForm.value.networkId);
          this.servername.next(this.requestProperties.serverName) // name for TAB
          this.logData$ = this.logService.getLogForGuid(this.requestProperties.guid)
        },
        (error) => {
          console.error('Error loading data:', error);
            }
        );
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
    saveLastTab(tab:number){
      this.lastTabService.setLastActiveTab(tab);
    }
    
    saveChanges(form:NgForm) {
      console.log(form.value)
      
        this.serverRequest.updateServer(form.value).subscribe(
        //this.serverRequest.updateServer(this.requestProperties).subscribe(
        
        (response) => {
          this.snackBar.openSnackBar("Request saved.");
        },
        (error) => {
          console.error('Error loading data:', error);
          this.snackBar.openSnackBar("ERROR:"+error.error.error);
            }
      );
    }

    deleteRequest() {
      this.serverRequest.deleteServer(this.url).subscribe(
        (response) => {
          this.requestProperties = response;
          this.router.navigateByUrl('/dashboard');
          this.snackBar.openSnackBar("request deleted");
        },
        (error) => {
          console.error('Error loading data:', error);
            }
        );
    }

    openDialog() {
      const dialogRef = this.dialog.open(RequestServerDetailComponent)
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    copyToClipBoard(value:requestServer){

      const converted:string = JSON.stringify(value)
      this.clipboard.copy(converted)
      this.snackBar.openSnackBar("JSON data copied to clipboard");
    }

    back(): void {
      this.router.navigateByUrl('serverlist');
    }

    getFirstFreeIpAddress(){

      let parameters = new HttpParams();
      const subnet = this.requestProperties.networkDTO.subnet;
      this.snackBar.openSnackBar("Requesting IP address for vLan:"+subnet);
      
      if(subnet) {
        parameters = parameters.append("Network",subnet.toString())
      }
      if(this.requestProperties.networkDTO.cidr) {
        parameters = parameters.append("Mask",this.requestProperties.networkDTO.cidr.toString())
      }
      if(this.requestProperties.guid){
        parameters = parameters.append("Guid", this.requestProperties.guid)
      }
      
      this.networksService.getFirstAvailableIP(parameters).subscribe(
        response => {
          this.ipAddress = response;
          this.snackBar.openSnackBar(this.ipAddress.IPAddress)
          this.requestProperties.ipAddress = this.ipAddress.IPAddress //delete
          this.userForm.patchValue({ipAddress:response.IPAddress});
          return response;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    requestServerName(){
      var suffix = "p";
      if(this.requestProperties.domain == "domain0")
      {
        suffix = "t"
      }

      this.serverNameService.getNameForServer(this.requestProperties.guid).subscribe(
        result => {
          this.requestProperties.serverName = "prodserver"+(result.name)+suffix; //delete
          const serverName = "prodserver"+(result.name)+suffix;
          this.userForm.patchValue({serverName:serverName})
        }
      )
    }

    ApproveRequest(guid:string) {
      if(guid != this.requestProperties.guid) {
        this.snackBar.openSnackBar("ERROR: nothing to approve"); // this should never happen
        return;
      }
      this.serverRequest.approveRequest(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("Server request approved");
          return result
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    ManualOverride(guid:string){
      this.serverRequest.markManualOverride(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("Manual override for: " + guid)
          return result
        }
      )
    }

    createDSC(guid:string) {
      if(guid != this.requestProperties.guid) {
        this.snackBar.openSnackBar("ERROR: data consistency compromised, refresh the page");
        return;
      }
      this.serverRequest.createDsc(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("Dsc has been created");
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    createVserver(guid:string) {
      this.serverRequest.createVserver(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("vServer has been created");
          console.log(result);
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    injectDSC(guid:string) {
      this.serverRequest.injectDsc(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("Dsc has been injected");
          console.log(result);
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }
    
    renameSystemDisk(guid:string) {
      this.serverRequest.renameSystemDisk(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("OS disk was renamed");
          console.log(result);
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    startVserver(guid:string) {
      this.serverRequest.startVserver(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("vServer started");
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    stopVserver(guid:string) {
      this.serverRequest.stopVserver(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("vServer stopped");
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    markAsComplete(guid:string){
      this.serverRequest.markAsComplete(guid).subscribe(
        result => {
          this.snackBar.openSnackBar("Request compete");
          return result;
        },
        error => {
          console.log(error.error.error)
        }
      )
    }

    emailMessageToClipboard(){
        var email = "Please create DNS record in zone IT.INTERNAL for following server: \nName: "
         + this.requestProperties.serverName
         + "\nIP address: " + this.requestProperties.ipAddress;
        
        this.clipboard.copy(email)
        this.snackBar.openSnackBar("email body sent to clipboard");
      }
    
    filter():void {
      
      const filterValue = this.nwControl.value.toLowerCase();
      if(_isNumberValue(filterValue)){
        this.networkdataList = this.networkdata.filter(o => o.vlanID.toString().toLowerCase().includes(filterValue)); 
      }
      else {
        this.networkdataList = this.networkdata.filter(o => o.name.toLowerCase().includes(filterValue)); 
      }
      
      this.requestProperties.networkDTO.name = this.nwControl.value; // delete
      this.userForm.patchValue({networkId:this.nwControl.value})
      var selectedNW: any = this.networkdataList.filter(o => o.name == this.nwControl.value)

      this.requestProperties.networkDTO.subnet = selectedNW[0]?.subnet?.toString(); //delete
      this.requestProperties.networkDTO.cidr = selectedNW[0]?.cidr?.toString(); //delete*/
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

    SetIPAddressStatus(status:string)
    {
      let parameters = new HttpParams();

      this.snackBar.openSnackBar("Setting IP address "+ this.requestProperties.ipAddress) + " as: " + status;
      
      if(this.requestProperties.ipAddress) {
        parameters = parameters.append("ipaddress",this.requestProperties.ipAddress.toString())
      }
      if(this.requestProperties.serverName) {
        parameters = parameters.append("hostname",this.requestProperties.serverName + "." + this.requestProperties.domain.toString())
      }
      if(this.requestProperties.guid){
        parameters = parameters.append("Guid", this.requestProperties.guid)
      }
      if(status){
        parameters = parameters.append("status", status)
      }
      
      this.networksService.SetIPAddressStatus(parameters).subscribe(result => {
        this.snackBar.openSnackBar("Status changed");
      })
    }
}
