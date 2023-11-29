import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from 'src/app/componentes/confirmacion/confirmacion.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmacionService {

  constructor(private dialog:MatDialog) { }

  abrirConfirmar(msg: string){
    return this.dialog.open(ConfirmacionComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true,
      position:{ top :"10px"},
      data:{
        mensaje:msg
      }
    });
  }
}
