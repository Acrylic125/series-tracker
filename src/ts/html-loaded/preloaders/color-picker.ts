import iro from '@jaames/iro';
import { createColorPicker } from '../../components/global-components';

export function reloadColorPickers() {
    document.querySelectorAll('.color-picker-input').forEach((colorPickerInput) => {
        const colorPicker = createColorPicker({
            onColorPick(colorPicker, color) {
                console.log(color);
            }
        });
        colorPickerInput.appendChild(colorPicker.element);
    });
    // colorPicker.on('color:change', (color) => {

    // })
}