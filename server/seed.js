// Initialize the database with some art data
require("dotenv").config({path: '../.env'});
const Artwork = require('./models/artModel');
const { saveArtworks, deleteArtworks } = require('./services/algolia');


const artData = [
    {
        title: "Mona Lisa",
        description: "The Mona Lisa, famously known as La Gioconda, stands as an unrivaled masterpiece by the legendary Renaissance polymath Leonardo da Vinci. Crafted between 1503 and 1506, this portrait has transcended its artistic origins to become an enduring symbol of aesthetic excellence. Lisa del Giocondo, the subject of this enigmatic work, gazes subtly at the observer with a mysterious smile, creating an intimate connection that captivates viewers. Da Vinci's groundbreaking use of sfumato, blending colors seamlessly to create a soft focus, and his mastery of chiaroscuro, enhancing the interplay of light and shadow, elevate the Mona Lisa to unparalleled heights in art history. The painting's historical significance, coupled with the timeless allure of Lisa's visage, makes the Mona Lisa an eternal icon of artistic achievement.",
        image: "/uploads/mona_lisa.webp",
        type: "painting",
        artist: "Leonardo da Vinci",
        year: 1506
    },
    {
        title: "The Thinker",
        description: "Auguste Rodin's magnum opus, The Thinker, is an enduring symbol of human contemplation and intellectual prowess. Cast in bronze between 1880 and 1882, this iconic sculpture originally adorned The Gates of Hell, a monumental project inspired by Dante's Divine Comedy. The seated figure, deep in thought, exudes a profound sense of introspection and philosophical inquiry. Rodin's meticulous attention to anatomical detail and the intense expression on The Thinker's face create a timeless embodiment of the human condition. Whether pondering life's complexities or embodying the spirit of intellectual pursuit, The Thinker remains a testament to Rodin's artistic genius and a universal emblem of human thought.",
        image: "/uploads/the_thinker.webp",
        type: "sculpture",
        artist: "Auguste Rodin",
        year: 1882
    },
    {
        title: "Starry Night",
        description: "Vincent van Gogh's Starry Night, painted in 1889, stands as an ethereal testament to the artist's emotional turbulence and unparalleled creativity. Set against the backdrop of a tranquil village, the swirling night sky is ablaze with celestial bodies in a breathtaking dance of cosmic energy. Van Gogh's bold use of color and dynamic brushstrokes creates a hypnotic and almost otherworldly atmosphere, transcending the traditional landscape genre. This masterpiece is a visual symphony, capturing the artist's deep connection with nature and the cosmos. Starry Night remains an iconic representation of van Gogh's unique vision and a profound expression of the transcendent power of art.",
        image: "/uploads/starry_night.webp",
        type: "painting",
        artist: "Vincent van Gogh",
        year: 1889
    },
    {
        title: "The Persistence of Memory",
        description: "Salvador Dalí's The Persistence of Memory, completed in 1931, stands as a surreal exploration of time, memory, and the fluidity of reality. The iconic painting features melting clocks draped over surreal landscapes, symbolizing the subjective nature of time. Dalí's meticulous attention to detail and dreamlike imagery create a mysterious and thought-provoking ambiance. The Persistence of Memory challenges conventional notions of temporality, inviting viewers to contemplate the interplay between the conscious and subconscious mind. Dalí's surrealist masterpiece remains a symbol of artistic innovation and a fascinating journey into the depths of the human psyche.",
        image: "/uploads/persistence_of_memory.webp",
        type: "painting",
        artist: "Salvador Dalí",
        year: 1931
    },
    {
        title: "Guernica",
        description: "Pablo Picasso's Guernica, completed in 1937, is a powerful anti-war mural that stands as a visceral testament to the horrors of conflict. Inspired by the bombing of the town of Guernica during the Spanish Civil War, Picasso's masterpiece is a harrowing depiction of human suffering and the impact of violence on civilians. The distorted and anguished figures, rendered in a monochromatic color palette, evoke a sense of chaos and despair. Guernica stands as a timeless symbol of the devastating consequences of war and serves as a poignant reminder of the artist's commitment to social and political commentary.",
        image: "/uploads/guernica.webp",
        type: "painting",
        artist: "Pablo Picasso",
        year: 1937
    },
    {
        title: "The Birth of Venus",
        description: "Sandro Botticelli's The Birth of Venus, completed in the mid-1480s, is a sublime celebration of classical mythology and Renaissance beauty. This iconic painting depicts the goddess Venus emerging from the sea, standing on a seashell. Botticelli's use of flowing lines, delicate colors, and harmonious proportions captures the ethereal and timeless quality of the subject. The Birth of Venus is a pinnacle of Italian Renaissance art, embodying the era's fascination with classical ideals and the revival of ancient artistic traditions.",
        image: "/uploads/birth_of_venus.webp",
        type: "painting",
        artist: "Sandro Botticelli",
        year: 1485
    },
    {
        title: "Water Lilies",
        description: "Claude Monet's Water Lilies series, comprising approximately 250 oil paintings created between 1897 and 1926, is an immersive journey into the artist's contemplation of nature's ephemeral beauty. Inspired by the water garden at Giverny, Monet's brushstrokes convey the ever-changing effects of light and color on the water's surface. The series is a testament to Monet's commitment to capturing the essence of the natural world, with each painting inviting viewers into a serene and harmonious realm. Water Lilies remains an enduring symbol of Monet's mastery in translating the fleeting moments of nature onto canvas.",
        image: "/uploads/water_lilies.webp",
        type: "painting",
        artist: "Claude Monet",
        year: 1914
    },
    {
        title: "The Scream",
        description: "Edvard Munch's iconic painting, The Scream, completed in 1893, is a haunting expressionist masterpiece that encapsulates the profound sense of existential angst. Set against a turbulent and distorted landscape, the central figure's face contorts in a scream of visceral terror. Munch's use of vivid colors and bold strokes creates an emotionally charged atmosphere, inviting viewers to contemplate the depths of human emotion and anxiety. The Scream stands as one of the most recognized and studied works in art history, resonating with its universal exploration of the human psyche.",
        image: "/uploads/the_scream.webp",
        type: "painting",
        artist: "Edvard Munch",
        year: 1893
    },
    {
        title: "Les Demoiselles d'Avignon",
        description: "Pablo Picasso's Les Demoiselles d'Avignon, completed in 1907, is a groundbreaking work that marks the advent of Cubism and a seismic shift in the trajectory of modern art. Depicting five nude women in a confrontational and angular composition, Picasso's departure from traditional artistic conventions is palpable. Influenced by African and Iberian art, the painting is a provocative exploration of form and perspective. Les Demoiselles d'Avignon remains a pivotal masterpiece, challenging artistic norms of its time and laying the groundwork for a new era of artistic experimentation.",
        image: "/uploads/demoiselles_davignon.webp",
        type: "painting",
        artist: "Pablo Picasso",
        year: 1907
    },
    {
        title: "The Last Supper",
        description: "Leonardo da Vinci's The Last Supper, painted between 1495 and 1498, is a monumental masterpiece that captures the climactic moment of Jesus Christ sharing his last meal with his disciples. The composition is a triumph of perspective and human emotion, as each figure reacts differently to the revelation that one among them will betray Christ. Da Vinci's meticulous attention to detail, including the use of light and shadow, makes The Last Supper a poignant and enduring representation of religious and artistic excellence. The painting's impact on Western art and culture is immeasurable, solidifying its place as one of the most iconic artworks of all time.",
        image: "/uploads/the_last_supper.webp",
        type: "painting",
        artist: "Leonardo da Vinci",
        year: 1498
    },
    {
        title: "The Statue of Liberty",
        description: "Frédéric Auguste Bartholdi's Statue of Liberty, dedicated in 1886, is a symbol of freedom and democracy that stands proudly in New York Harbor. The colossal statue, a gift from the people of France to the United States, depicts Libertas, the Roman goddess of freedom, holding a torch and a tabula ansata (a tablet evoking the law). Bartholdi's design and Gustave Eiffel's engineering expertise combined to create an enduring emblem of liberty and hope. The Statue of Liberty has welcomed immigrants and visitors to America for over a century, embodying the ideals of democracy and the pursuit of a better life.",
        image: "/uploads/statue_of_liberty.webp",
        type: "photography",
        artist: "Frédéric Auguste Bartholdi",
        year: 1886
    },
    {
        title: "The Girl with a Pearl Earring",
        description: "Johannes Vermeer's The Girl with a Pearl Earring, painted around 1665, is a masterful example of Dutch Golden Age portraiture. The subject, often referred to as the 'Mona Lisa of the North,' gazes directly at the viewer with an enigmatic expression. The use of light and shadow, combined with the luminescent quality of the pearl earring, creates a captivating and intimate atmosphere. Vermeer's attention to detail and his ability to capture the subtleties of human expression elevate this painting to a timeless and revered work of art, inspiring countless admirers and even a bestselling novel and film.",
        image: "/uploads/girl_with_pearl_earring.webp",
        type: "painting",
        artist: "Johannes Vermeer",
        year: 1665
    },
    {
        title: "The Pieta",
        description: "Michelangelo's The Pieta, sculpted in 1498–1499, is a sublime marble masterpiece that depicts the Virgin Mary cradling the lifeless body of Jesus Christ. Commissioned for St. Peter's Basilica in the Vatican, the sculpture showcases Michelangelo's unparalleled skill in capturing the human form and conveying profound emotion. The intricately carved folds of the Virgin's robes and the serene beauty of Christ's face exemplify Renaissance ideals of balance, harmony, and spiritual depth. The Pieta remains a testament to Michelangelo's genius and a revered symbol of Christian art.",
        image: "/uploads/the_pieta.webp",
        type: "sculpture",
        artist: "Michelangelo",
        year: 1499
    },
    {
        title: "The Great Wave off Kanagawa",
        description: "Katsushika Hokusai's woodblock print, The Great Wave off Kanagawa, created around 1831, is a mesmerizing depiction of a powerful tsunami towering over boats near Mount Fuji. Part of the series Thirty-Six Views of Mount Fuji, this iconic work exemplifies the Japanese ukiyo-e tradition. The dramatic composition, with the wave cresting dramatically against a backdrop of the mountain, captures the ephemeral and dynamic beauty of nature. Hokusai's Great Wave has become one of the most recognized and influential images in world art, inspiring numerous adaptations and symbolizing the enduring power of the natural world.",
        image: "/uploads/great_wave.webp",
        type: "other",
        artist: "Katsushika Hokusai",
        year: 1831
    },
];


Artwork.collection
    .drop()
    .then(() => {
        console.log("Art collection dropped");
        return Artwork.insertMany(artData);
    })
    .then(() => console.log("Art collection seeded"))
    .catch((err) => console.error(err));

// Initialize Algolia with some art data
// deleteArtworks().then(r => console.log(r));
// saveArtworks().then(r => console.log(r));

