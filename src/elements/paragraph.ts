import { CardElement } from "./card-element";
export class Paragraph implements CardElement {
  textParagraph: string;
  constructor(textParagraph: string) {
    this.textParagraph = textParagraph;
  }
  json(): Record<any, any> {
    return {
      textParagraph: {
        text: this.textParagraph
      }
    }
  }

}