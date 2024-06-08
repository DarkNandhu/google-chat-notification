import { CardElement } from "./card-element";

export class ColumnItem implements CardElement {
  horizontalAlignment: string;
  widgets: CardElement[];
  horizontalSizeStyle: string;
  verticalAlignment: string;

  constructor(horizontalAlignment: string, widgets: CardElement[], horizontalSizeStyle: string, verticalAlignment: string) {
    this.horizontalAlignment = horizontalAlignment;
    this.widgets = widgets;
    this.horizontalSizeStyle = horizontalSizeStyle;
    this.verticalAlignment = verticalAlignment;
  }

  json(): Record<any, any> {
    return {
      horizontalAlignment: this.horizontalAlignment,
      widgets: this.widgets.map(widget => widget.json()),
      horizontalSizeStyle: this.horizontalSizeStyle,
      verticalAlignment: this.verticalAlignment
    }
  }
}

export class Column implements CardElement {
  columnItems: ColumnItem[];

  constructor(columnItems: ColumnItem[]) {
    this.columnItems = columnItems;
  }

  json(): Record<any, any> {
    return {
      columnItems: this.columnItems.map(columnItem => columnItem.json())
    }
  }
}