import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationDirection} from '../../constants/navigation-direction.enum';
import {PagingState} from '../../models/paging-state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() paging: PagingState;
  @Output() navigate = new EventEmitter<NavigationDirection>();

  constructor() { }

  ngOnInit() {
  }

  navigateBack() {
    if (this.paging.backwardIsAllowed) {
      this.navigate.emit(NavigationDirection.back);
    }
  }

  navigateForward() {
    if (this.paging.forwardIsAllowed) {
      this.navigate.emit(NavigationDirection.forward);
    }
  }
}
