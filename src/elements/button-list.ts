import { Button } from "./button";
import { CardElement } from "./card-element";

export class ButtonList implements CardElement {
  buttons: Button[] = [];
  constructor(buttons: Button[]) {
    this.buttons = buttons;
  }
  addButton(button: Button) {
    this.buttons.push(button);
  }
  json(): Record<any, any> {
    return {
      buttonList: {
        buttons: this.buttons.map(widget => widget.json())
      }
    }
  }
}