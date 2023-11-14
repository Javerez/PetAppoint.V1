import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas_service/consultas.service';
import { UsuarioService } from 'src/app/services/usuario_service/usuario.service';

import { MatDialog } from '@angular/material/dialog';
import { AgregarFechaComponent } from '../agregar-fecha/agregar-fecha.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';



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
    private usuarioService:UsuarioService,
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
    if(this.usuarioService.HaveAccess()){
      this.displayedColumns = ['idConsulta', 'fecha','nombreAnimal','nombreCliente','rutCliente','telefonoCliente','emailVet','tipoConsulta','accion'];
    }else{
      this.displayedColumns = ['idConsulta', 'fecha','nombreAnimal','nombreCliente','rutCliente','telefonoCliente','emailVet','tipoConsulta'];
    }
    this.obtenerConsultas();
  }
  
  obtenerConsultas(){
    this.consultaService.getConsultas()
    .subscribe({
      next:(res)=>{
        console.log(res)
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