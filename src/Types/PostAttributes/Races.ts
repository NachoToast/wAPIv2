enum Races {
    Human = 0,

    /**
     * Blanket term for any animal-like features.
     *
     * Use this alongside other races, unless you cannot distinguish.
     */
    Kemonomimi = 1 << 0,

    Fox = 1 << 1,

    Cat = 1 << 2,

    Dog = 1 << 3,

    Raccoon = 1 << 4,

    Dragon = 1 << 5,

    Elf = 1 << 6,

    Lizard = 1 << 7,

    Oni = 1 << 8,

    Angel = 1 << 9,
}

export default Races;
