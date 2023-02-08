import { ModuleMetadata, Provider, Logger } from '@nestjs/common';
import { Test } from "@nestjs/testing";
import { SendgridService } from "./sendgrid.service";

jest.mock('@sendgrid/mail', () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn()
  }
});

// https://github.com/anchan828/nest-sendgrid/blob/master/packages/sendgrid/src/sendgrid.service.spec.ts

describe('SendgridService', () => {
  let sendgridService: SendgridService;
  const email = 'marcelsauter9299@gmail.com';

  beforeAll(async () => {
    const providers: Provider[] = [
      {
        provide: SendgridService,
        useValue: {}
      }
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    sendgridService = testModule.get(SendgridService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should send mail', () => {
    const transport = sendgridService.send(email);

    const loggerSpy = jest.spyOn(Logger, 'log');

    expect(loggerSpy).toBeCalledWith(`Email sent to ${email}`);
  });
});