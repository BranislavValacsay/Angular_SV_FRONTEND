import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { log } from 'src/app/_models/log';
import { LogService } from 'src/app/_services/logservice.service';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  constructor(
    private logService:LogService,
    private router:Router
  ){}

  logData:log[]

  ngOnInit(): void { 

    // create hub connection
    this.logService.createHubConnection();

    this.logService.getLogs().subscribe(
      result => this.logData = result
    );
    
    // subscribe for updates
    this.logService.logThread$.subscribe(
      result => {
        result.sort(x => x.id)
        this.logData = result;
      }
    )
  }

  ngOnDestroy():void{
    this.logService.stopHubConnection();
  }

  navigateGuid(guid:string):void {
     this.router.navigateByUrl('/request-detail/'+guid);
  }
}
