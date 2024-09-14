import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { requestServer } from 'src/app/_models/requestServer';
import { searchParams } from 'src/app/_models/searchparams';
import { RequestServerService } from 'src/app/_services/request-server.service';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.scss']
})
export class ServerlistComponent {
  constructor(
    private http: HttpClient,
    private getServers: RequestServerService,
    private router: Router
    ) { }


  serverRequestList: requestServer; //data source
  params:searchParams = {
    key:''
  };
  displayedColumns: string[] = ['status','requester','name','domain','os','cpu','memory','location','vlanid','network','ipaddress','blimp'];

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.key === 'Enter')
    {
      this.loadData_Servers(); 
    }
  }
  
  ngOnInit() {
    this.loadData_Servers();
  }

  click(guid:string) {
    this.router.navigateByUrl('/request-detail/'+guid);
  }

  loadData_Servers() {
    let parameters = new HttpParams();
    try {parameters = parameters.append('Key',this.params.key.toString()); } catch{};
    this.getServers.getAllServers(parameters).subscribe(
      (response) => {
        this.serverRequestList = response;
      },
      (error) => {
        console.error('Error loading data:', error);
          }
        );
      }

}
