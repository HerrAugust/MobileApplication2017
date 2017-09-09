import {Pipe, PipeTransform} from '@angular/core';
import {DictionaryService} from '../providers/dictionary.service';
import { DomSanitizer } from '@angular/platform-browser';

    
@Pipe({
    name: 'dictionary'
})
export class DictionaryPipe {
    
    constructor(private sDict: DictionaryService) {}
    
    transform(value, ...args) {
        return this.sDict.get(value);
    }
    
}