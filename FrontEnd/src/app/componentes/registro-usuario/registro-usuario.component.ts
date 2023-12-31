import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario_service/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  formRegistroUsuario!: FormGroup;
  buttonClicked!: boolean;
  public captchaResolved: boolean = false;
  public siteKey: any;
  error_id: any;
  hide = true
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.buttonClicked = false;
    this.captchaResolved = false;
    this.formRegistroUsuario = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéñóúüÁÉÑÓÚÜ -]*$/)
      ])],
      apellido: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéñóúüÁÉÑÓÚÜ -]*$/)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/)
      ])],
      admin: [false, Validators.required]
    });

  }


  registrar() {
    console.log(this.formRegistroUsuario.value)
    if (this.formRegistroUsuario.status === 'VALID') {
     this.usuarioService.registroUsuario(this.formRegistroUsuario.value).subscribe(data => {
       this.error_id = data.id;
       console.log("id: " + data.id);
       if (this.error_id == 1) this.router.navigate(['home']);
     });
    }
  }
}
