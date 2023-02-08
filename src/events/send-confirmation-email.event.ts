export class SendConfirmationEmailEvent {

  constructor(
    public readonly email: string,
    public readonly token: string
  ) { }

}