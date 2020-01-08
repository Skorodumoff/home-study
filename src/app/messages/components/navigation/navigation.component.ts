import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationDirection} from '../../constants/navigation-direction.enum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() navigate = new EventEmitter<NavigationDirection>();

  constructor() { }

  ngOnInit() {
  }

  navigateBack() {
    this.navigate.emit(NavigationDirection.back);
  }

  navigateForward() {
    this.navigate.emit(NavigationDirection.forward);
  }
}
