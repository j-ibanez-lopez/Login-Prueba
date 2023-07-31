import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{

  formulario: FormGroup;
  constructor(private _servicio: PersonaService,
            private _form_builder: FormBuilder,
            private toastr: ToastrService,
            private _ruteo: Router
            )
  {
    this.formulario = this._form_builder.group(
      {
        nombre_usuario: ['', Validators.required],
        pass: ['', [Validators.required, Validators.minLength(8)]],
      }
    )
  }

  ingreso()
  {

    const usuario: User = {
      nombre: this.formulario.get('nombre_usuario')?.value,
      password: this.formulario.get('pass')?.value
    }

    this._servicio.ingresar(usuario).subscribe({
      next: (data: string) => {
        console.log(data);
      this._ruteo.navigateByUrl('/dashboard')

      }
    })
  }
}
