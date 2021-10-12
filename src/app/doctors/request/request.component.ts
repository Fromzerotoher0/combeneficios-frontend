import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorsService,
    private jwtHelper: JwtHelperService
  ) {
    this.doctorService.getEspecs().subscribe((resp: any) => {
      this.especializaciones = resp.results;
      console.log(this.especializaciones);
    });
  }

  ngOnInit(): void {}
  miFormulario: FormGroup = this.fb.group({
    especializaciones_id: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });
  especializaciones: any;

  onFileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);

      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          this.miFormulario
            .get('image')!
            .setValue(file, { emitModelToViewChange: false });
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert('solo se admiten imagenes');
      }
    }
  }

  enviar() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    const uploadData = new FormData();
    uploadData.append('medico_id', token.id);
    uploadData.append(
      'especializaciones_id',
      this.miFormulario.get('especializaciones_id')!.value
    );
    uploadData.append('image', this.miFormulario.get('image')!.value);

    this.doctorService.studyrequest(uploadData).subscribe(
      (resp) => {
        this.doctorService.studyrequest(uploadData).subscribe((resp: any) => {
          alert('solicitud enviada');
        });
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }
}
