import { Component, signal, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConsultasService } from 'src/app/services/consultas_service/consultas.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {

  closeResult: string = '';
  //@ViewChild('mymodal') mymodal: NgbModalRef | undefined;


  calendarVisible = signal(true);
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    eventDisplay: 'block',
    weekends: true,
    selectable: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    private consultaService: ConsultasService) {
  }

  setEndHour(fecha:any,tipoConsulta:any) {
    var fin = new Date(fecha);
    
    switch (tipoConsulta) {
      case "Cirugia general": {
        var fin = new Date();
        return fin.toISOString(),true;
      }
      case "Consulta veterinaria": {
        fin.setHours(fin.getMinutes() + 30);
        return fin.toISOString(),false;
      }
      default:{
        fin.setHours(fin.getHours() + 1);
        return fin.toISOString(),false;
      } 
    }
  }
  setColor(tipoConsulta: any) {
    switch (tipoConsulta) {
      case "Cirugia general": return '#de3f4c';
      case "Consulta veterinaria": return '#43b6d6';
      default: return '#ccfa05';
    }
  }

  getAll(): any {
    this.consultaService.getConsultas()
      .subscribe({
        next: (data) => {
          this.calendarOptions.events = data.map((evt: {
            idConsulta: any; fecha: string | number | Date; tipoConsulta: any; nombreAnimal: any; nombreCliente: any; descripcion: any;
          }) => {
            var fin,evento = this.setEndHour(evt.fecha,evt.tipoConsulta);
            let color = this.setColor(evt.tipoConsulta);
            return {
              id: evt.idConsulta,
              title: evt.tipoConsulta,
              start: evt.fecha,
              end: fin,
              textColor: '#0f0f0f',
              backgroundColor: color,
              allDay:evento,
              extendedProps: {
                nombreAnimal: evt.nombreAnimal,
                nombreCliente: evt.nombreCliente,
              },
              description: evt.descripcion
            };
          })
        },
        error: () => {
          alert("Hubo un error inesperado")
        }

      });
  }
  ngOnInit(): void {
    this.getAll()
  }
  handleDateSelect(selectInfo: DateSelectArg) {

    const title = "aaaaaqa";
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: "aa1" + 1,
        title,
        color: '#0f0f0f',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        extendedProps: {
          description: 'waos'
        }

      });
    }

  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event.extendedProps['description'])
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
