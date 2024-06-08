import { CardElement } from "./card-element";


export class FooterButton implements  CardElement {
  text: string;
  color: {
    red: number,
    green: number,
    blue: number,
    alpha: number
  };
  onClick: any;

  constructor(text: string, color: { red: number, green: number, blue: number, alpha: number }, onClick: any) {
    this.text = text;
    this.color = color;
    this.onClick = onClick;
  }
  json(): Record<any, any> {
    return {
        text: this.text,
        color: this.color,
        onClick: this.onClick
    }
  }

}


export class FixedFooter implements CardElement {
 primaryButton: FooterButton;
 secondaryButton: FooterButton;
 constructor(primaryButton: FooterButton, secondaryButton: FooterButton) {
   this.primaryButton = primaryButton;
   this.secondaryButton = secondaryButton;
 }
 json(): Record<any, any> {
   return {
     fixedFooter: {
       primaryButton: this.primaryButton.json(),
       secondaryButton: this.secondaryButton.json()
     }
   }
 }
}