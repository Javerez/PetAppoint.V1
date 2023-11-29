import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas_service/consultas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RutService } from 'rut-chileno'
import { DialogConfirmacionService } from 'src/app/services/dialog-confirmacion/dialog-confirmacion.service';

@Component({
  selector: 'app-agregar-fecha',
  templateUrl: './agregar-fecha.component.html',
  styleUrls: ['./agregar-fecha.component.scss'],

})
export class AgregarFechaComponent {
  minDate: Date;
  maxDate: Date;

  user: any

  componenteId = 0;

  btnaccion: string = "Guardar"

  tipo = ["Consulta veterinaria", "Cirugia esterilización", "Cirugia general"]
  formCita !: FormGroup;
  error_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private consultaService: ConsultasService,
    @Inject(MAT_DIALOG_DATA) public editarConsulta: any,
    private dialogRef: MatDialogRef<AgregarFechaComponent>,
    private rutService: RutService,
    private confirmacionService: DialogConfirmacionService
  ) {
    dialogRef.disableClose = true;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear + 3, 11, 31);
  }

  ngOnInit(): void {
    this.formCita = this.formBuilder.group({
      nombreAnimal: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-ZáéñóúüÁÉÑÓÚÜ -]*$/)]],
      nombreCliente: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-ZáéñóúüÁÉÑÓÚÜ -]*$/)]],
      rutCliente: ['', [Validators.required, this.rutService.validaRutForm]],
      telefonoCliente: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      emailVet: ['', Validators.required],
      tipoConsulta: ['Consulta veterinaria', Validators.required],
      descripcion: ['', [Validators.maxLength(250)]],
    })
    //Entra desde la tabla de consultas, para actualizar una cita
    if (this.editarConsulta) {
      this.btnaccion = "Actualizar"
      this.formCita.controls['nombreAnimal'].setValue(this.editarConsulta.nombreAnimal)
      this.formCita.controls['nombreCliente'].setValue(this.editarConsulta.nombreCliente)
      this.formCita.controls['rutCliente'].setValue(this.editarConsulta.rutCliente)
      this.formCita.controls['telefonoCliente'].setValue(this.editarConsulta.telefonoCliente)
      this.formCita.controls['emailVet'].setValue(this.editarConsulta.emailVet)
      this.formCita.controls['fecha'].setValue(this.editarConsulta.fecha)
      const hora = new Date(this.editarConsulta.fecha).toLocaleTimeString().replace(':00', '')
      this.formCita.controls['hora'].setValue(hora)
      this.formCita.controls['tipoConsulta'].setValue(this.editarConsulta.tipoConsulta)
      this.formCita.controls['descripcion'].setValue(this.editarConsulta.descripcion)
    }
    //Entra desde el calendario, para actualizar una cita
    if (typeof this.editarConsulta === 'string') {
      this.componenteId = 1
      this.consultaService.consultaPorId(this.editarConsulta)
        .subscribe(data => {
          this.btnaccion = "Actualizar"
          this.formCita.controls['nombreAnimal'].setValue(data[0].nombreAnimal)
          this.formCita.controls['nombreCliente'].setValue(data[0].nombreCliente)
          this.formCita.controls['rutCliente'].setValue(data[0].rutCliente)
          this.formCita.controls['telefonoCliente'].setValue(data[0].telefonoCliente)
          this.formCita.controls['emailVet'].setValue(data[0].emailVet)
          this.formCita.controls['fecha'].setValue(data[0].fecha)
          const hora = new Date(data[0].fecha).toLocaleTimeString().replace(':00', '')
          this.formCita.controls['hora'].setValue(hora)
          this.formCita.controls['tipoConsulta'].setValue(data[0].tipoConsulta)
          this.formCita.controls['descripcion'].setValue(data[0].descripcion)
        });
    }
    //Entra desde el calendario, para guardar una nueva cita
    if (this.editarConsulta instanceof Array) {
      this.btnaccion = "Guardar"
      this.formCita.controls['fecha'].setValue(this.editarConsulta[0])
      //Si se saca esta posicion, la hora por defecto son las 21:00 hrs que no se muestran en el calendario
      if (this.editarConsulta[1] == '21:00:00') this.editarConsulta[1] = "12:00:00"
      const hora = this.editarConsulta[1].replace(':00', '')
      this.formCita.controls['hora'].setValue(hora)
      this.formCita.controls['tipoConsulta'].setValue('Consulta veterinaria')

    }
  }

  inputEvent(event: Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.formCita.controls['rutCliente'].patchValue(rut, { emitEvent: false });
  }

  eliminarConsulta() {
    let idConsulta = this.editarConsulta
    this.confirmacionService.abrirConfirmar('¿Esta seguro de que quiere eliminar la consulta?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.consultaService.eliminarConsulta(idConsulta)
            .subscribe(data => {
              this.formCita.reset();
              this.dialogRef.close('eliminar');
            });

        }
      });
  }

  actualizarConsulta() {
    this.consultaService.actualizarConsulta(this.formCita.value, this.editarConsulta)
      .subscribe(data => {
        this.formCita.reset();
        this.dialogRef.close('actualizar');
      });
  }

  agregarConsulta() {
    if (!this.editarConsulta || this.editarConsulta instanceof Array) {
      this.formCita.controls['emailVet'].setValue(localStorage.getItem('email'));
      if (this.formCita.valid) {
        this.consultaService.agregarConsulta(this.formCita.value)
          .subscribe(data => {
            this.error_id = data.id;
            this.formCita.reset();
            this.dialogRef.close('guardar');
          });
      }
    } else {
      this.confirmacionService.abrirConfirmar('¿Esta seguro de que quiere actualizar?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.actualizarConsulta();

          }
        });
    }
  }

  noWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
}
