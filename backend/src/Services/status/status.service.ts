import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {

  // This method returns a string that says 'Status OK'
  status() {
    return 'Status OK';
  }
}
