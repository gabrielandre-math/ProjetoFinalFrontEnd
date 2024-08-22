import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; //ReactiveFormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule], //ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cred: Credenciais = {
    email: '',
    senha: ''
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(3)]);

  
}

export interface Credenciais {
  email: string;
  senha: string;
}
