/** Clothing, costume, and accessories. */
enum Outfits {
    Maid = 1 << 0,

    Witch = 1 << 1,

    /** Same as school */
    Sailor = 1 << 2,

    Choker = 1 << 3,

    Mask = 1 << 4,

    /** Must be a big hoodie. */
    Hoodie = 1 << 5,

    WeddingDress = 1 << 6,

    CropTop = 1 << 7,

    Bikini = 1 << 8,

    Kimono = 1 << 9,
}

export default Outfits;
