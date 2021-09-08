import { Color, colors } from '../types';
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow
} from '@material-ui/core/colors';

export function getColor(color: string) {
  switch (color) {
    case 'amber':
      return amber;
    case 'blue':
      return blue;
    case 'blueGrey':
      return blueGrey;
    case 'brown':
      return brown;
    case 'cyan':
      return cyan;
    case 'deepOrange':
      return deepOrange;
    case 'deepPurple':
      return deepPurple;
    case 'green':
      return green;
    case 'grey':
      return grey;
    case 'indigo':
      return indigo;
    case 'lightBlue':
      return lightBlue;
    case 'lightGreen':
      return lightGreen;
    case 'lime':
      return lime;
    case 'orange':
      return orange;
    case 'pink':
      return pink;
    case 'purple':
      return purple;
    case 'red':
      return red;
    case 'teal':
      return teal;
    case 'yellow':
      return yellow;
    default:
      return red;
  }
}

export function getColorAtRandom() {
  return colors[Math.floor(Math.random() * colors.length)];
}
