import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas_service/consultas.service';
import { UsuarioService } from 'src/app/services/usuario_service/usuario.service';

import { MatDialog } from '@angular/material/dialog';
import { AgregarFechaComponent } from '../agregar-fecha/agregar-fecha.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';



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
  minDate: any;
  maxDate: any;

  constructor(
    private consultaService: ConsultasService,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear + 3, 11, 31);
  }
  abrirDialog() {
    this.dialog.open(AgregarFechaComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'guardar') {
        this.obtenerConsultas();
      }
    });
  }
  ngOnInit(): void {
    if (this.usuarioService.HaveAccess()) {
      this.displayedColumns = ['idConsulta', 'fecha', 'nombreAnimal', 'nombreCliente', 'rutCliente', 'telefonoCliente', 'emailVet', 'tipoConsulta', 'accion'];
    } else {
      this.displayedColumns = ['idConsulta', 'fecha', 'nombreAnimal', 'nombreCliente', 'rutCliente', 'telefonoCliente', 'emailVet', 'tipoConsulta'];
    }
    this.obtenerConsultas();
  }

  obtenerConsultas() {
    this.consultaService.getConsultas()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error: () => {
          alert("Hubo un error inesperado")
        }

      });
  }
  editarConsulta(row: any) {
    this.dialog.open(AgregarFechaComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'actualizar') {
        this.obtenerConsultas();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue.trim().toLowerCase())
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarConsulta(idConsulta: any) {
    this.consultaService.eliminarConsulta(idConsulta).subscribe({
      next: (res) => {
        this.obtenerConsultas();
      },
      error: () => {
        alert("Hubo un error eliminando")
      }
    });
  }
  buscarFecha(event: MatDatepickerInputEvent<Date>) {
    const date =event.value
    const year = date?.getFullYear();
    let month = date?.getMonth();
    month!+=1
    const day = date?.getDate();
    const date2 =`${year}-${month}-${day}`;

    this.dataSource.filter = date2.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  noWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  limpiar(event: any){
    this.dataSource.filter=""
  }
}