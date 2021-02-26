import { IImage } from 'src/types';
import { SERVER_URL } from 'src/helpers';
/**
 * @class Function helper 
 */
export class FunctionHelper
{
  static handleImage (_image: IImage, _size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm')
  {
    const localImages = [
      { id: 1, path: 'images/default.png' },
    ];
    const search = localImages.find(_findImage =>
    {
      return _image.id === _findImage.id;
    })
    return search ? search.path : SERVER_URL + _image.paths[_size];
  }
}