import { CardElement } from "./card-element";

export class Image implements CardElement {

  imageUrl: string;
  altText: string;
  constructor(imageUrl: string, altText: string) {
    this.imageUrl = imageUrl;
    this.altText = altText;
  }
  
  json(): Record<any, any> {
    return {
      image: {
        imageUrl: this.imageUrl,
        altText: this.altText
      }
    }
  }
}