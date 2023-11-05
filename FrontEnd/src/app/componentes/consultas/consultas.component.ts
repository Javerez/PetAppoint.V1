import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from 'src/app/servicios/consultas_service/consultas.service';

import { MatDialog } from '@angular/material/dialog';
import { AgregarFechaComponent } from '../agregar-fecha/agregar-fecha.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  error_id: any;
  datos: Array<any> = [];
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private consultaService: ConsultasService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  abrirDialog() {
    this.dialog.open(AgregarFechaComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val=='guardar'){
        this.obtenerConsultas();
      }
    });
  }
  ngOnInit(): void {
    if(this.esAdmin() == true){
      this.displayedColumns = ['idConsulta', 'fecha','nombreAnimal','emailVet','emailCliente' ,'tipoConsulta','accion'];
    }else{
      this.displayedColumns = ['idConsulta', 'fecha','nombreAnimal','emailVet','emailCliente' ,'tipoConsulta'];
    }
    this.obtenerConsultas();
  }
  esAdmin(){
    let user
    const data = localStorage.getItem("userData");
    if (data!=null){
      user=JSON.parse(data);
    }
    if(user.admin==1){
      return true;
    }
    else return false;
    
  }
  obtenerConsultas(){
    this.consultaService.getConsultas()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort  
      },
      error:()=>{
        alert("Hubo un error inesperado")
      }
        
      });
  }
  editarConsulta(row : any){
    this.dialog.open(AgregarFechaComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=='actualizar'){
        this.obtenerConsultas();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarConsulta(idConsulta: any) {

    this.consultaService.eliminarConsulta(idConsulta).subscribe({
      next:(res)=>{
        this.obtenerConsultas();
      },
      error:()=>{
        alert("Hubo un error eliminando")
      }
    });
  }

}