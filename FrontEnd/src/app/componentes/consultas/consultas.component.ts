import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from 'src/app/servicios/consultas_service/consultas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { AgregarFechaComponent } from '../agregar-fecha/agregar-fecha.component';



@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  error_id: any;
  datos: Array<any> = [];


  nuevaConsulta: any = {
    title: '',
    nombre: '',
    fecha: null,
  }
  constructor(
    private consultaService: ConsultasService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  abrirDialog() {
    this.dialog.open(AgregarFechaComponent, {
      width: '30%'
    });
  }
  ngOnInit(): void {
    this.consultaService.getConsultas().subscribe(data => {
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.datos.push(data[i]);
      }
    });
    
  }

  // agregarConsulta(){
  //   console.log("agregado")
  //   if (this.formCita.status === 'VALID') {
  //     this.consultaService.agregarConsulta(this.formCita.value).subscribe(data => {
  //       this.error_id = data.id;
  //       console.log("id: " + data.id);
  //       if (this.error_id == 1) this.router.navigate(['home']);
  //     });
  //   }
  // }


  eliminarConsulta(idConsulta: any) {
    this.consultaService.eliminarConsulta(idConsulta).subscribe(data => {
      if (data.id == 1) {
        this.router.navigate(['consultas'])
      }
    });
  }














}