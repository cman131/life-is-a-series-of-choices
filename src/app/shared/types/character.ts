export interface Character {
    name: string;
    imageUrl: string;
    tied: Character[]
    excluded?: boolean;
}
