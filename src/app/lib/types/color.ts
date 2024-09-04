export type BaseColor = 'blue' | 'gray' | 'black';
export type Contrast = '25' | '50' | '85' |'100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type Color = 'white' | 'red' | 'orange' | 'yellow' | `${BaseColor}-${Contrast}`;