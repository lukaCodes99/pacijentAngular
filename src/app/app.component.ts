import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pacijentEZ';

  onToggleChange(event: MatSlideToggleChange) {
    console.log(event.checked); // This will log true if the toggle is checked, false otherwise
  }
}