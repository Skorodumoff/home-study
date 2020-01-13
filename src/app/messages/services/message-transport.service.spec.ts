import { TestBed } from '@angular/core/testing';

import { MessageTransportService } from './message-transport.service';

describe('MessageTransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageTransportService = TestBed.get(MessageTransportService);
    expect(service).toBeTruthy();
  });
});
