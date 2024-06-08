import { CardElement } from "./card-element";

export class Header implements CardElement {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageType: string;
  constructor(title: string, subtitle: string, imageUrl: string, imageType: string) {
    this.title = title;
    this.subtitle = subtitle;
    this.imageUrl = imageUrl;
    this.imageType = imageType;
  }
  json(): Record<any, any> {
    return {
      header: {
        title: this.title,
        subtitle: this.subtitle,
        imageUrl: this.imageUrl,
        imageType: this.imageType
      }
    }
  }
}