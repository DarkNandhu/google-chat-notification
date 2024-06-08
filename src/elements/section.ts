import { CardElement } from "./card-element";
export class SectionItem implements CardElement {
  header: string;
  collapsible: boolean;
  uncollapsibleWidgetsCount: number;
  widgets: CardElement[];

  constructor(header: string, collapsible: boolean, uncollapsibleWidgetsCount: number, widgets: CardElement[]) {
    this.header = header;
    this.collapsible = collapsible;
    this.uncollapsibleWidgetsCount = uncollapsibleWidgetsCount;
    this.widgets = widgets;
  }
  json(): Record<any, any> {
    return {
      header: this.header,
      collapsible: this.collapsible,
      uncollapsibleWidgetsCount: this.uncollapsibleWidgetsCount,
      widgets: this.widgets.map(widget => widget.json()),
    }
  }  
}

export class Sections implements CardElement {
  sections: SectionItem[] = [];
  constructor(sections: SectionItem[]) {
    this.sections = sections;
  }

  addSectionItem(sectionItem: SectionItem) {
    this.sections.push(sectionItem);
  }

  json(): Record<any, any> {
    return {
      sections: this.sections.map(section => section.json())
    }
  }
}