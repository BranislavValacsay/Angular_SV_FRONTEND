import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { searchParams } from 'src/app/_models/searchparams';
import { vmmnetwork } from 'src/app/_models/vmmnetwork';
import { NetworksService } from 'src/app/_services/networks.service';
import { RequestServerService } from 'src/app/_services/request-server.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent {
  constructor(private networksService:NetworksService,
    private http: HttpClient,
    private serverRequest:RequestServerService,
    private snackBar: SnackbarService,
    private clipboard: Clipboard
  ) {}

  networkdataList:vmmnetwork[];
  params:searchParams = {
    key:''
  };

  ngOnInit() {
    this.loadNetworkData();
  }

  loadNetworkData() {
    let parameters = new HttpParams();
    try {parameters = parameters.append('Key',this.params.key.toString()); } catch{};
    this.networksService.getData(parameters).subscribe(
      (response) => {
        this.networkdataList = response;
      },
      (error) => {
        console.error('Error loading data:', error);
          }
      );
  }

  copyToClipBoard(value:vmmnetwork){

    const converted:string = JSON.stringify(value)
    this.clipboard.copy(converted)
    this.snackBar.openSnackBar("JSON data copied to clipboard");
  }

}
