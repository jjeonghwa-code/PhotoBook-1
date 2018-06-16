export enum TextAlign {
  Left,
  Center,
  Right
}

export enum TextWrapperStyle {
  Type1,
  Type2,
  Type3
}

export class Mood {
  text: string;
  font: string;
  align: TextAlign;
  color: string;
  style: {bold: boolean, italic: boolean, underline: boolean};
  background: {style: TextWrapperStyle, transparency: number, color: string};

  constructor(
    text = '',
    font = '',
    align = TextAlign.Left,
    color = '#000000',
    style = {bold: false, italic: false, underline: false},
    background = {style: TextWrapperStyle.Type1, transparency: .5, color: '#FFFFFF'}
  ) {
    this.text = text;
    this.font = font;
    this.align = align;
    this.color = color;
    this.style = style;
    this.background = background;
  }
}
