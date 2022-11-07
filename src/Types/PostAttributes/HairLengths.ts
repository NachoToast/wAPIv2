enum HairLengths {
    Bald = 0,

    /** Down to chin. */
    Short = 1 << 0,

    /** Past the chin. */
    Long = 1 << 1,
}

export default HairLengths;
