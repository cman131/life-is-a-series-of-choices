import { Component, Input } from '@angular/core';
import { Character } from '../shared/types/character';

@Component({
    selector: 'character-list-display',
    templateUrl: './character-list-display.component.html',
    styleUrls: ['./character-list-display.component.scss']
})
export class CharacterListDisplayComponent {
    @Input()
    public characterList: Character[] = [];
}
