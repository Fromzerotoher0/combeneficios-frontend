import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt')!);
    this.rol = token.tipo_usuario;
    this.restaurantService
      .getRestaurantsByTitular(token.id)
      .subscribe((resp: any) => {
        this.restaurantes = resp.result;
        this.restaurantService.getCategorias().subscribe((resp: any) => {
          this.categorias = resp.result;
        });
      });
  }

  rol: any;
  restaurantes: any;
  categorias: any;

  miFormulario: FormGroup = this.fb.group({
    restaurante: ['', [Validators.required]],
    articulo: ['', [Validators.required, Validators.minLength(6)]],
    descripcion: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    image: [''],
  });

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

  perfil() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));
    this.router.navigateByUrl(`/beneficiarios/${token.id}`);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/auth/login');
  }

  servicios() {
    this.router.navigateByUrl('/medicos/servicios');
  }

  agregar() {
    const uploadData = new FormData();
    uploadData.append('directorio', 'menu');
    uploadData.append(
      'restaurante_id',
      this.miFormulario.get('restaurante').value
    );
    uploadData.append('articulo', this.miFormulario.get('articulo').value);
    uploadData.append(
      'descripcion',
      this.miFormulario.get('descripcion').value
    );
    uploadData.append('categoria_id', this.miFormulario.get('categoria').value);
    uploadData.append('valor', this.miFormulario.get('valor').value);
    uploadData.append('image', this.miFormulario.get('image')!.value);

    this.restaurantService.addProduct(uploadData).subscribe(
      (resp) => {
        alert('producto agregado');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
