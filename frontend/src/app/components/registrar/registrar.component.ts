import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  registro: FormGroup;

  // Inicio de constructor.
  constructor(private _servicio: PersonaService,
              private _serv_toastr: ToastrService,
              private _form_builder: FormBuilder,
              private _router: Router)
  {
    this.registro = this._form_builder.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        // edad: [null, Validators.required],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        repetir_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
      }
    ) // Fin de form_builder
  } // Fin de constructor.

  ingreso()
  {

    if(this.registro.get('password') != this.registro.get('repetir_password')) {
      console.log('No le acertaste');
      console.log('password: ' + this.registro.get('password')?.value);
      console.log('repetir_password: ' + this.registro.get('repetir_password')?.value);

    }
    else {
      console.log('Acertado');
    }
    this._serv_toastr.success('Ya puedes usar este usuario.', '¡Registro creado!')

    const usuario_nuevo: User =
    {
      nombre: this.registro.get('nombre')?.value,
      apellido: this.registro.get('apellido')?.value,
      // edad: this.registro.get('edad')?.value,
      password: this.registro.get('password')?.value
    }

    this._servicio.registrar(usuario_nuevo).subscribe(data => {
      console.log('data obtenida: ' + data);
      this._router.navigateByUrl('/login');

    }, (error:HttpErrorResponse)  =>
    {
      if(error.error.msg)
      {
        console.log(error)
        this._serv_toastr.error(error.error)
      }

      else
      {
        this._serv_toastr.error('Ha ocurrido un error. Por favor comuniquese con el equipo de desarrollo.')
      }

    })
  }

}
