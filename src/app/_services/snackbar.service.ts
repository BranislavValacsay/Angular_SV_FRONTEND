import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message:string) {
    this._snackBar.open(message, null,{
      duration: 2000,
      panelClass: ['dark-snackbar','text-center']
    });
  }

}
