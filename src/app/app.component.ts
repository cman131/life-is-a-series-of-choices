import { Component } from '@angular/core';
import { Character } from './shared/types/character';
import { FateData } from './data/fate-grand-order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sorted = false;
  public characterList: Character[] = FateData.getCharacters();
  public sortedCharacterList: Character[] = [];

  public charactersSorted(characterList: Character[]): void {
    this.sortedCharacterList = characterList;
    this.sorted = true;
  }
}
