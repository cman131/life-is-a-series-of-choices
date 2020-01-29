import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Character } from '../shared/types/character';

@Component({
    selector: 'character-sorter',
    templateUrl: './character-sorter.component.html',
    styleUrls: ['./character-sorter.component.scss']
})
export class CharacterSorterComponent {
    @Input()
    public initialCharacterList: Character[];

    @Output()
    public complete: EventEmitter<Character[]> = new EventEmitter<Character[]>();

    public availableCharacters: Character[] = [];
    public sortedList: Character[] = [];
    public previousResults: Character[];

    public shouldLimit = true;
    public limit = 10;

    public started = false;
    private locked = false;
    private total: number;

    public currentCharacter: Character;
    public currentComparator: Character;
    private currentSet: Character[] = [];

    constructor() {
        if (window.localStorage.fgocharactersorter) {
            this.previousResults = JSON.parse(window.localStorage.fgocharactersorter);
        }
    }

    public loadPreviousResults(): void {
        this.complete.emit(this.previousResults);
    }

    public percentageComplete(set): number {
        return Math.floor(set.length * 100 / this.total);
    }

    public selectAll(select: boolean) {
        this.initialCharacterList = this.initialCharacterList.map(character => ({
            ...character,
            excluded: select
        }));
    }

    public canStart(set: Character[]): boolean {
        return set.filter(character => !character.excluded).length > 1;
    }

    public start(): void {
        this.availableCharacters = this.initialCharacterList
            .filter(character => !character.excluded)
            .sort(() => Math.random() - 0.5);
        this.total = this.availableCharacters.length;

        this.sortedList = [this.availableCharacters.pop()]
        this.currentSet = [...this.sortedList];
        this.currentCharacter = this.availableCharacters.pop();
        this.currentComparator = this.currentSet[0];
        this.started = true;
    }

    public selectOption(character: Character) {
        if (this.locked) {
            return;
        }
        this.locked = true;
        if (!character) {
            this.currentSet = [];
            this.insertCharacter(this.currentCharacter, this.currentComparator, false, true);
        } else if (character !== this.currentCharacter) {
            this.currentSet = this.currentSet.slice(this.currentSet.indexOf(this.currentComparator) + 1, this.currentSet.length);
            if (this.currentSet.length === 0) {
                this.insertCharacter(this.currentCharacter, this.currentComparator, false);
            } else {
                this.currentComparator = this.getRandomElement(this.currentSet);
                this.locked = false;
            }
        } else {
            this.currentSet = this.currentSet.slice(0, this.currentSet.indexOf(this.currentComparator));
            if (this.currentSet.length === 0) {
                this.insertCharacter(this.currentCharacter, this.currentComparator, true);
            } else {
                this.currentComparator = this.getRandomElement(this.currentSet);
                this.locked = false;
            }
        }
    }

    private insertCharacter(characterToInsert: Character, pivot: Character, beforePivot, tied = false) {
        const indexOfPivot = this.sortedList.indexOf(pivot);
        if (tied) {
            pivot.tied.push(characterToInsert);
        }
        else if (beforePivot) {
            this.sortedList = [
                ...this.sortedList.slice(0, indexOfPivot),
                characterToInsert,
                pivot,
                ...this.sortedList.slice(indexOfPivot + 1, this.sortedList.length)
            ];
        } else {
            this.sortedList = [
                ...this.sortedList.slice(0, indexOfPivot),
                pivot,
                characterToInsert,
                ...this.sortedList.slice(indexOfPivot + 1, this.sortedList.length)
            ];
        }
        if (this.shouldLimit) {
            this.sortedList = this.sortedList.slice(0, this.limit);
        }

        if (this.availableCharacters.length > 0) {
            this.currentSet = [...this.sortedList];
            this.currentComparator = this.getRandomElement(this.currentSet);
            this.currentCharacter = this.availableCharacters.pop();
            this.locked = false;
        } else {
            this.complete.emit(this.sortedList);
            window.localStorage.fgocharactersorter = JSON.stringify(this.sortedList);
        }
    }

    private getRandomElement(set: any[]) {
        return set[Math.floor(Math.random() * set.length)];
    }
}
