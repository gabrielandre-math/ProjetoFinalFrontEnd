import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
// Meus components
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //Componentes padrão do Angular Material 
    RouterOutlet,
    MatFormFieldModule, MatPaginatorModule, MatSnackBarModule,
    MatCheckboxModule, MatToolbarModule, MatSidenavModule,
    MatButtonModule, MatSelectModule, MatTableModule,
    MatRadioModule, MatInputModule, MatIconModule,
    MatListModule, MatCardModule, FormsModule,
    ReactiveFormsModule, 
    //Meus componentes
    NavComponent 
  ],
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'smartorder';
}
