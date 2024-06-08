import { CardElement } from "./card-element";


export interface Icon {
  iconUrl?: string;
}

export interface KnownIcon {
  knownIcon?: string;
}

interface DecoratedTextParams {
  startIcon?: Icon;
  icon?: KnownIcon;
  topLabel?: string;
  bottomLabel?: string;
}

export class DecoratedText implements CardElement {
  startIcon?: {
    iconUrl?: string;
  }
  icon?: {
    knownIcon?: string
  }
  topLabel?: string
  text?: string
  bottomLabel?: string
  constructor(text: string, {
    startIcon, 
    icon,
    topLabel,
    bottomLabel,
  }: DecoratedTextParams = {}) {
    this.startIcon = startIcon;
    this.icon = icon;
    this.topLabel = topLabel;
    this.text = text;
    this.bottomLabel = bottomLabel;
  }
  json(): Record<any, any> {
    let jsonToUse: Record<any, any> = {};
    if(this.startIcon) {
      jsonToUse['startIcon'] = this.startIcon
    }

    if(this.icon) {
      jsonToUse['icon'] = this.icon
    }
    if(this.topLabel) {
      jsonToUse['topLabel'] = this.topLabel
    }
    if(this.bottomLabel) {
      jsonToUse['bottomLabel'] = this.bottomLabel
    }
    return {
      "decoratedText": { 
      ...jsonToUse,
      ...{text: this.text},
      }
    }
  }
}