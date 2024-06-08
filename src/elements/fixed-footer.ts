import { CardElement } from "./card-element";
interface Button {
  text: string;
  color: {
    red: number,
    green: number,
    blue: number
  };
  onClick: any;
}

export class PrimaryButton implements Button, CardElement {

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
      primaryButton: {
        text: this.text,
        color: this.color,
        onClick: this.onClick
      }
    }
  }

}

export class SecondaryButton implements Button, CardElement {

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
      secondaryButton: {
        text: this.text,
        color: this.color,
        onClick: this.onClick
      }
    }
  }
}


export class FixedFooter implements CardElement {
 primaryButton: PrimaryButton;
 secondaryButton: SecondaryButton;
 constructor(primaryButton: PrimaryButton, secondaryButton: SecondaryButton) {
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