import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario_service/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {

  hide=true;
  formInicioSesion!: FormGroup;
  buttonClicked!: boolean;
  public captchaResolved : boolean = false;
  public siteKey : any;
  error_id:any;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router ,
    private usuarioService:UsuarioService
  ){}

  ngOnInit(): void {
    this.buttonClicked=false;
    this.captchaResolved=false;
    
    this.formInicioSesion = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/)
      ])],
    },{updateOn: 'submit'})
  }
  iniciarSesion() {
    console.log(this.formInicioSesion.valid)
    if (this.formInicioSesion.status === 'VALID') {
      this.usuarioService.inicioSesionUsuario(this.formInicioSesion.value).subscribe(
        data => {
          this.error_id=data.id
          if (this.error_id==1){
            localStorage.setItem('email',this.formInicioSesion.value['email']);
            localStorage.setItem('token',data.token);
            this.router.navigate(['home']);
          }
        },error=>{
          console.log(error)
        }
        );
    }
  }
}