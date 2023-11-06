import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/servicios/consultas_service/consultas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RutService } from 'rut-chileno'

@Component({
  selector: 'app-agregar-fecha',
  templateUrl: './agregar-fecha.component.html',
  styleUrls: ['./agregar-fecha.component.scss'],

})
export class AgregarFechaComponent {
  minDate: Date;
  maxDate: Date;

  user: any

  btnaccion: string = "Guardar"

  tipo = ["Consulta veterinaria", "Cirugia esterilización","Cirugia general"]
  formCita !: FormGroup;
  error_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private consultaService: ConsultasService,
    @Inject(MAT_DIALOG_DATA) public editarConsulta: any,
    private dialogRef: MatDialogRef<AgregarFechaComponent>,
    private rutService: RutService, 
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
      nombreAnimal: ['', [Validators.required, Validators.maxLength(20),Validators.pattern(/^[a-zA-ZáéñóúüÁÉÑÓÚÜ -]*$/)]],
      nombreCliente: ['', [Validators.required,Validators.maxLength(20),Validators.pattern(/^[a-zA-ZáéñóúüÁÉÑÓÚÜ -]*$/)]],
      rutCliente: ['', [Validators.required,this.rutService.validaRutForm]],
      telefonoCliente: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      emailVet: ['', Validators.required],
      tipoConsulta: ['Consulta veterinaria', Validators.required],
      descripcion: ['', [Validators.maxLength(250)]],
    })
    if (this.editarConsulta) {
      this.btnaccion = "Actualizar"
      this.formCita.controls['nombreAnimal'].setValue(this.editarConsulta.nombreAnimal)
      this.formCita.controls['nombreCliente'].setValue(this.editarConsulta.emailCliente)
      this.formCita.controls['rutCliente'].setValue(this.editarConsulta.rutCliente)
      this.formCita.controls['telefonoCliente'].setValue(this.editarConsulta.telefonoCliente)
      this.formCita.controls['emailVet'].setValue(this.editarConsulta.emailVet)
      this.formCita.controls['fecha'].setValue(this.editarConsulta.fecha)
      const date = new Date(this.editarConsulta.fecha).toLocaleTimeString().split(":00")[0]
      this.formCita.controls['hora'].setValue(date)
      this.formCita.controls['tipoConsulta'].setValue(this.editarConsulta.tipoConsulta)
      this.formCita.controls['descripcion'].setValue(this.editarConsulta.descripcion)
    }
  }
  inputEvent(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.formCita.controls['rutCliente'].patchValue(rut, {emitEvent :false});
  }

  agregar() {
    if (!this.editarConsulta) {
      const data = localStorage.getItem("userData");
      if (data != null) {
        this.user = JSON.parse(data);
      }
      this.formCita.controls['emailVet'].setValue(this.user.email);
      if (this.formCita.valid) {
        this.consultaService.agregarConsulta(this.formCita.value)
          .subscribe(data => {
            this.error_id = data.id;
            //console.log("id: "+this.error_id)
            this.formCita.reset();
            this.dialogRef.close('guardar');
          });
      }
    }else{
      this.consultaService.actualizarConsulta(this.formCita.value, this.editarConsulta.idConsulta)
      .subscribe(data => {
        this.error_id = data.id;
        //console.log("id: "+this.error_id)
        this.formCita.reset();
        this.dialogRef.close('actualizar');
      });
    }
  }
}
