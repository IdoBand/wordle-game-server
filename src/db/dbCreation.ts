import dbClient from "./clientConfigAndConnect"


export async function createDB() {

    const wordsTableCreationQuery = `
    CREATE TABLE IF NOT EXISTS wordle_5_letters_words (
    "id" SERIAL PRIMARY KEY,
    "word" VARCHAR(50) NOT NULL
    );`


    const wordsInsertQuery = `INSERT INTO wordle_5_letters_words (id, word) VALUES
                        (default, 'POWER'),
                        (default, 'WORLD'),
                        (default, 'PIZZA'),
                        (default, 'BUILD'),
                        (default, 'SUSHI'),
                        (default, 'WIRED'),
                        (default, 'WEIRD'),
                        (default, 'HELLO'),
                        (default, 'REACT'),
                        (default, 'ABORT'),
                        (default, 'GLOVE'),
                        (default, 'LEMON'),
                        (default, 'BASIC'),
                        (default, 'JOLLY'),
                        (default, 'NURSE'),
                        (default, 'GROVE'),
                        (default, 'QUAKE'),
                        (default, 'FABLE'),
                        (default, 'YUMMY'),
                        (default, 'TREND'),
                        (default, 'CAMEO'),
                        (default, 'MOTEL'),
                        (default, 'WIDEN'),
                        (default, 'LUCID'),
                        (default, 'MIMIC'),
                        (default, 'ZEBRA'),
                        (default, 'FLAIR'),
                        (default, 'BASIS'),
                        (default, 'BLAZE'),
                        (default, 'YACHT'),
                        (default, 'TOAST'),
                        (default, 'AMBER'),
                        (default, 'HATCH'),
                        (default, 'DENSE'),
                        (default, 'BRAVE'),
                        (default, 'SPARK'),
                        (default, 'PUNCH'),
                        (default, 'PUPPY'),
                        (default, 'SPITE'),
                        (default, 'CREEK'),
                        (default, 'PASTA'),
                        (default, 'LYRIC'),
                        (default, 'KNOCK'),
                        (default, 'LEACH'),
                        (default, 'HUSKY'),
                        (default, 'HEDGE'),
                        (default, 'BENCH'),
                        (default, 'CRAVE'),
                        (default, 'PLANT'),
                        (default, 'FLUTE'),
                        (default, 'ALERT'),
                        (default, 'BLIMP'),
                        (default, 'JOKER'),
                        (default, 'RANCH'),
                        (default, 'PLUSH'),
                        (default, 'CHALK'),
                        (default, 'FROWN'),
                        (default, 'BOGUS'),
                        (default, 'TRICK'),
                        (default, 'SILKY'),
                        (default, 'GLOOM'),
                        (default, 'FILTH'),
                        (default, 'NODAL'),
                        (default, 'BROWN'),
                        (default, 'GLORY'),
                        (default, 'POISE'),
                        (default, 'BLUSH'),
                        (default, 'WITCH'),
                        (default, 'FIFTH'),
                        (default, 'GLOVE'),
                        (default, 'FUDGE'),
                        (default, 'WRECK'),
                        (default, 'FJORD'),
                        (default, 'HUMID'),
                        (default, 'HYDRA'),
                        (default, 'STOIC'),
                        (default, 'GLIDE'),
                        (default, 'SQUID'),
                        (default, 'YOLKS'),
                        (default, 'KNIFE'),
                        (default, 'HOMES'),
                        (default, 'FABLE'),
                        (default, 'COWER'),
                        (default, 'BASAL'),
                        (default, 'CRISP'),
                        (default, 'SCOWL'),
                        (default, 'FABLE'),
                        (default, 'WHINE'),
                        (default, 'JEWEL'),
                        (default, 'BUNNY'),
                        (default, 'BLIND'),
                        (default, 'FLUFF'),
                        (default, 'HORDE'),
                        (default, 'FRISK'),
                        (default, 'WORST'),
                        (default, 'PULSE'),
                        (default, 'MYTHS'),
                        (default, 'FABLE'),
                        (default, 'WORTH'),
                        (default, 'HILLS'),
                        (default, 'FABLE'),
                        (default, 'SKIMP'),
                        (default, 'BERRY'),
                        (default, 'WILLY'),
                        (default, 'PLANE'),
                        (default, 'TWIST'),
                        (default, 'FABLE'),
                        (default, 'YOUTH'),
                        (default, 'SLUMP'),
                        (default, 'FABLE'),
                        (default, 'DOZEN'),
                        (default, 'WAGES'),
                        (default, 'FABLE'),
                        (default, 'FANCY'),
                        (default, 'GUSTO');`
    try {
        const client = dbClient();
        // create the table
        await client.query(wordsTableCreationQuery)
        console.log('Table created successfully!')
        // insert words
        await client.query(wordsInsertQuery)
        console.log('words inserted successfully!')

    }
    catch(error) {
        console.log(error)
    }
   
}
