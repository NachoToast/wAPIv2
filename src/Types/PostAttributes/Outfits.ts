/** Clothing, costume, and accessories. */
enum Outfits {
    Maid = 0,

    Witch = 1 << 0,

    /** Same as school */
    Sailor = 1 << 1,

    Choker = 1 << 2,

    Mask = 1 << 3,

    /** Must be a big hoodie. */
    Hoodie = 1 << 4,

    WeddingDress = 1 << 5,

    CropTop = 1 << 6,

    Bikini = 1 << 7,

    Kimono = 1 << 8,
}

export default Outfits;
