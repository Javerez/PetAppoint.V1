import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-agregar-fecha',
  templateUrl: './agregar-fecha.component.html',
  styleUrls: ['./agregar-fecha.component.scss'],
})
export class AgregarFechaComponent {

  tipoConsulta=["Consulta veterinaria","Operación"]
  formCita !: FormGroup;
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.formCita = this.formBuilder.group({
      nombreAnimal : ['',Validators.required,Validators.maxLength(20)],
      emailCliente : ['',Validators.required,Validators.email],
      tipo : ['Consulta veterinaria',Validators.required],
      descripcion : ['',Validators.required,Validators.maxLength(250)],
    })
  }
 
  getErrorMessage() {
    if (this.formCita.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formCita.hasError('email') ? 'Not a valid email' : '';
  }
}
