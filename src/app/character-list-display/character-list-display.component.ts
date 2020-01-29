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

    public getNames(index, character: Character): string {
        return (index + 1) + '. ' + character.name + (character.tied && character.tied.length > 0 ? ', ' + character.tied.map(char => char.name).join(', ') : '');
    }

    public getImageUrls(character: Character): string[] {
        return [
            character.imageUrl,
            ...character.tied.map(char => char.imageUrl)
        ]
    }
}
