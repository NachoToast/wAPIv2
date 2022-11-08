import {
    ArtStyle,
    Colours,
    ExplicitLevel,
    HairLengths,
    LightLevel,
    Outfits,
    Races,
    ShotType,
    Source,
    Themes,
} from './PostAttributes';

/** A post represents data about a single image. */
export default interface Post {
    /** Normally the file name. */
    id: string;

    meta: {
        /** Uploaded at ISO string. */
        uploaded: string;

        /** Last modified ISO string. */
        modified: string | null;

        /** Uploader username. */
        uploader: string;

        /** Modifier username. */
        modifier: string | null;
    };

    /** Values are in pixels. */
    dimensions: {
        width: number;
        height: number;
    };

    /** URL to this image. */
    link: string;

    /** Where and who this image was uploaded from. */
    sources: { [k in Source]?: { post: string; account: string } };

    /** Array of post ID's. */
    accompanyingImages: string[];

    /**
     * The (main) universe the post belongs to.
     *
     * Normally this will be the name of a series or game.
     *
     * @example "arknights", "konosuba", "re:zero", "overwatch"
     *
     * Can be `undefined` if we don't know the universe, or `null` if
     * an original.
     */
    universe: string | null | undefined;

    /** Might not be in English. */
    artistName: string;

    /** Names of any noteworthy figures in the post. */
    characters: string[];

    artStyle: ArtStyle;

    explicitLevel: ExplicitLevel;

    hairLengths: HairLengths;

    lightLevel: LightLevel;

    outfits: Outfits;

    /** Races of characters in the image. */
    races: Races;

    shotType: ShotType;

    themes: Themes;

    hairColours: Colours;

    eyeColours: Colours;

    comments: Comment[];
}
