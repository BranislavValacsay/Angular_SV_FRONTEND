import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { requestServer } from '../_models/requestServer';
import { requestServerDto } from '../_dto/requestServerDto';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RequestServerService {

  private apiUrl:string = environment.baseurl+'RequestServers';
  private dscApiUrl: string = environment.baseurl+'ps_createdsc';
  private vServerCreationUrl:string = environment.baseurl+'ps_createvm';
  private injectDscUrl:string = environment.baseurl+'ps_InjectDsc';
  private renameSystemDiskUrl:string = environment.baseurl+'PS_renameSystemDisk';
  private startVmUrl:string = environment.baseurl+'ps_StartVm';
  private stopVmUrl:string = environment.baseurl+'ps_StopVm';
  private approvalUrl:string = environment.baseurl+'RequestStatusControl/approve_request';
  private markAsCompleteUrl:string = environment.baseurl+'RequestStatusControl/mark_complete_request';
  private manualOverride:string = environment.baseurl+'RequestStatusControl/manual_override_request';
  

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

    getAllServers(parameters:HttpParams) {
      return this.http.get<requestServerDto>(this.apiUrl+"?"+parameters).pipe(
        map((response:any) =>{
          const servers = response;
          return servers;
        })
      ) ;
    }

    getSingleServer(guid:string) {
      return this.http.get<requestServer>(this.apiUrl+"/"+guid).pipe(
        map((response:requestServer) =>{
          const request = response;
          return request;
        })
      ) ;
    }

    createRequestServer(requestServerObject:requestServerDto) {
      return this.http.post<requestServerDto>(this.apiUrl,requestServerObject).pipe(
        map((response:any) =>{
          const request = response;
          return request;
        })
      ) ;
    }

    updateServer(requestServerObject:requestServer) {
      return this.http.put<requestServerDto>(this.apiUrl+"/"+requestServerObject.guid,requestServerObject).pipe(
        map((response:any) =>{
          const request = response;
          return request;
        })
      ) ;
    }
    
    deleteServer(guid:string) {
      return this.http.delete<requestServer>(this.apiUrl+"/"+guid).pipe(
        map((response:any) =>{
          const request = response;
          return request;
        })
      ) ;
    }

    approveRequest(guid:string){

      return this.http.get(this.approvalUrl+"/"+guid).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    createDsc(guid:string) {

      return this.http.post(this.dscApiUrl+"/"+guid,null).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    createVserver(guid:string) {

      return this.http.post(this.vServerCreationUrl+"/"+guid,null).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    injectDsc(guid:string) {

      return this.http.post(this.injectDscUrl+"/"+guid,null).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    renameSystemDisk(guid:string) {

      return this.http.post(this.renameSystemDiskUrl+"/"+guid,null).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    startVserver(guid:string) {

      return this.http.get(this.startVmUrl+"/"+guid).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    stopVserver(guid:string) {

      return this.http.get(this.stopVmUrl+"/"+guid).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }

    markAsComplete(guid:string){

      return this.http.get(this.markAsCompleteUrl+'/'+guid).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }
    
    markManualOverride(guid:string){

      return this.http.get(this.manualOverride+'/'+guid).pipe(
        map((response:any) => {
          const request = response;
          return request;
        })
      );
    }
}