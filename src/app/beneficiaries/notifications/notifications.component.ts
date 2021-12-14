import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorsService
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.urlTree = this.router.parseUrl(this.router.url);
    console.log(this.urlTree.queryParams);
    if (this.urlTree.queryParams.status == 'approved') {
      this.doctorService
        .appointment(
          localStorage.getItem('agenda'),
          token.id,
          localStorage.getItem('medico_id'),
          localStorage.getItem('modalidad')
        )
        .subscribe((resp) => {
          alert('cita agendada');
        });
    } else {
      console.log('pendiente');
    }
  }

  ngOnInit(): void {}
  rol: any;
  urlTree: any;
  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }
}
