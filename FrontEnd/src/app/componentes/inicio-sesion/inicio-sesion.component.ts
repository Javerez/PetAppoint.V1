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
    
    let formulario = {
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/)
      ])],
      //recaptcha: ['',Validators.required]
    }
    this.formInicioSesion = this.formBuilder.group(formulario);
    this.siteKey = "6LcCcJkmAAAAAM8lZ_jL7MZeSOI1iKd4exAu2wI1";

  }
  checkCaptcha(captchaResponse : string) {    
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }
  
  iniciarSesion() {
    if (this.formInicioSesion.status === 'VALID') {
      
      this.usuarioService.inicioSesionUsuario(this.formInicioSesion.value).subscribe(
        data => {

          this.error_id=data.id
          if (this.error_id==1){
            console.log(data.token)

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