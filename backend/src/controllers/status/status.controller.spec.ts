import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { StatusService } from '../../services/status/status.service';

describe('StatusController', () => {
  let controller: StatusController;
  let service: StatusService;

  beforeEach(async () => {
    service = { status: jest.fn().mockReturnValue('Status OK') };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        { provide: StatusService, useValue: service },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "Status OK"', () => {
    expect(controller.getStatus()).toBe('Status OK');
  });

  it('should call statusService.status', () => {
    controller.getStatus();
    expect(service.status).toHaveBeenCalled();
  });
});