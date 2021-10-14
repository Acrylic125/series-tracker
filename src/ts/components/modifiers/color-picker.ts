import iro from '@jaames/iro';
import { createColorPicker } from '../global-components';

export function reloadColorPickers() {
    document.querySelectorAll('.color-picker-input').forEach((colorPickerInput) => {
        const colorPicker = createColorPicker({
            onColorPick(colorPicker, color) {
                console.log(color);
            }
        });
        if (colorPickerInput instanceof HTMLElement) {
            colorPickerInput.onclick = () => {
                console.log("TTTT");
                colorPicker.activate(true);
            };
        }
        colorPickerInput.appendChild(colorPicker.element);
    });
    // colorPicker.on('color:change', (color) => {

    // })
}