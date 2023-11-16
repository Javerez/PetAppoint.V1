import { Component, signal, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MatInputModule } from '@angular/material/input';
import { ConsultasService } from 'src/app/services/consultas_service/consultas.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarFechaComponent } from '../agregar-fecha/agregar-fecha.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {

  minDate: any
  maxDate: any
  fecha: any

  closeResult: string = '';
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

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
    weekends: false,
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
    private consultaService: ConsultasService,
    private dialog: MatDialog) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear + 3, 11, 31);

  }

  setEndHour(fecha: any, tipoConsulta: any) {
    var fin = new Date(fecha);

    switch (tipoConsulta) {
      case "Cirugia general": {
        var fin = new Date();
        return fin.toISOString(), true;
      }
      case "Consulta veterinaria": {
        fin.setHours(fin.getMinutes() + 30);
        return fin.toISOString(), false;
      }
      default: {
        fin.setHours(fin.getHours() + 1);
        return fin.toISOString(), false;
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

  obtenerConsultas(): any {
    this.consultaService.getConsultas()
      .subscribe({
        next: (data) => {
          this.calendarOptions.events = data.map((evt: {
            idConsulta: any; fecha: string | number | Date; tipoConsulta: any; nombreAnimal: any; nombreCliente: any; descripcion: any;
          }) => {
            var fin, evento = this.setEndHour(evt.fecha, evt.tipoConsulta);
            let color = this.setColor(evt.tipoConsulta);
            return {
              id: evt.idConsulta,
              title: evt.tipoConsulta,
              start: evt.fecha,
              end: fin,
              textColor: '#0f0f0f',
              backgroundColor: color,
              allDay: evento,
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
    this.obtenerConsultas()
  }
  handleDateSelect(selectInfo: DateSelectArg) {

    const currentDate = new Date();
    const selectedDate = selectInfo.start;
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (currentDate.getTime() <= selectedDate.getTime()) {
      //console.log(currentDate.getTime(),selectedDate.getTime())
      this.dialog.open(AgregarFechaComponent, {
        width: '30%'
      }).afterClosed().subscribe(val => {
        if (val == 'guardar') {
          this.obtenerConsultas();
        }
      });
    }

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.dialog.open(AgregarFechaComponent, {
      width: '30%',
      data: clickInfo.event['id']
    }).afterClosed().subscribe(val => {
      if (val == 'actualizar' || val == 'eliminar') {
        this.obtenerConsultas();
      }
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
  buscarFecha(event: MatDatepickerInputEvent<Date>) {
    const date =event.value
    let calendarApi = this.calendarComponent.getApi();
    const year = date?.getFullYear();
    let month = date?.getMonth();
    month!+=1
    const day = date?.getDate();

    const date2 =`${year}-${month}-${day}`;

    if (date != null) {
      //console.log(date2);
      calendarApi.gotoDate(date2);
    }
  }
  noWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  
}
