import { CardElement } from "./card-element";

export class Button implements CardElement{
  text: string;
  onClick: any;
  color: { red: number, green: number, blue: number, alpha: number };
  constructor(text: string, color: { red: number, green: number, blue: number, alpha: number }, onClick: any) {
    this.text = text;
    this.color = color;
    this.onClick = onClick;
  }
  json() {
    return {
      text: this.text,
      color: this.color,
      onClick: this.onClick
    }
  }
}