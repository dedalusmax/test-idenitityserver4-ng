import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    ngOnInit(): void {
        window.location.href = 'https://www.sauter-controls.com/en.html';
    }
}
