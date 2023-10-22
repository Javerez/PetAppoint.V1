import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from 'src/app/servicios/consultas_service/consultas.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  presentingElement: any = null;
  showStart = false;
  showEnd = false;
  aux:any;
  error_id:any;
  datos:Array<any>=[];
  formCita!: FormGroup;
  title = 'appBootstrap';
  closeResult: string = '';
  @ViewChild('mymodal') mymodal: NgbModalRef | undefined;



  nuevaConsulta: any = {
    title: '',
    nombre:'',
    fecha:null,
  }
  constructor(
    private consultaService:ConsultasService,
    private router:Router,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.consultaService.getConsultas().subscribe(data=>{
        //console.log(data);
        for(let i=0;i<data.length;i++){
          this.datos.push(data[i]);
        }
    });
    this.formCita = new FormGroup({
      tipo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nombreAnimal: new FormControl('', Validators.compose([
        Validators.required
      ])),
      descripcion: new FormControl('', Validators.compose([
        Validators.maxLength(250)
      ])),
    })
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  private getDismissReason(reason: any): string {
    //console.log(this.formCita.status)
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  abrirModal(){
    this.open(this.mymodal);
  }
  agregarConsulta(){
    console.log("agregado")
    if (this.formCita.status === 'VALID') {
      this.consultaService.agregarConsulta(this.formCita.value).subscribe(data => {
        this.error_id = data.id;
        console.log("id: " + data.id);
        if (this.error_id == 1) this.router.navigate(['home']);
      });
    }
  }
  
  
  eliminarConsulta(idConsulta:any){
    this.consultaService.eliminarConsulta(idConsulta).subscribe(data =>{
      if(data.id==1){
        this.router.navigate(['consultas'])
      }
    });
  }
}