export class Message {

  private _messageId: String;
  private _me: String;
  private _theOther: String;
  private _messages: any[];


  get messageId(): String {
    return this._messageId;
  }

  set messageId(value: String) {
    this._messageId = value;
  }

  get me(): String {
    return this._me;
  }

  set me(value: String) {
    this._me = value;
  }

  get theOther(): String {
    return this._theOther;
  }

  set theOther(value: String) {
    this._theOther = value;
  }

  get messages(): Object[] {
    return this._messages;
  }

  set messages(value: Object[]) {
    this._messages = value;
  }
}

