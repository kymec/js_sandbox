import MaskInput from 'mask-input';
export default class MaskedInput{
    constructor (){
        const input = document.createElement("input");
        document.body.append(input);
        const maskInput = new MaskInput(input, {
            mask: '0000-0000-0000-0000',
            alwaysShowMask: true,
            maskChar: '_',
        });        
    }
}