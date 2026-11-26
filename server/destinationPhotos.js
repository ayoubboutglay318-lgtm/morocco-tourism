// Real photos of each destination from Wikimedia Commons (free licences).
// Every file below was checked on commons.wikimedia.org: it shows the named place,
// and the author is the one credited on the file page. Credits are shown on the site.

const filePath = (file, width) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`
const filePage = file => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

const photo = (file, author) => ({
  image: filePath(file, 900),
  heroImage: filePath(file, 1800),
  imageCredit: { author, url: filePage(file) },
})

export const DESTINATION_PHOTOS = {
  // Existing destinations
  tangier: photo('Kasbah, Tánger, Marruecos, 2015-12-11, DD 27.JPG', 'Diego Delso'),
  marrakech: photo('Jamaa El Fna square Morocco 2018 1.jpg', 'Steven Lek'),
  fes: photo('Chouara Tannery, Fes (8947682350).jpg', 'just_a_cheeseburger'),
  chefchaouen: photo('Chefchaouen Street B.jpg', 'Mark Fischer'),
  merzouga: photo('Merzouga Dunes 2011.jpg', 'Bjørn Christian Tørrissen'),
  essaouira: photo('Essaouira-port.JPG', 'Rienna'),
  'atlas-mountains': photo("Village d'Imlil.JPG", 'Fabrice Cadou'),
  agadir: photo('Kasbah Agadir.jpg', 'Haakon S. Krohn'),
  casablanca: photo('Place Mohammed V - Casablanca - 2022.jpg', 'Hamza Izourane'),

  // New destinations
  rabat: photo('Rabat - Hassan Tower - 20170909103739.jpg', 'OHamama'),
  meknes: photo('Bab Mansour gate.jpg', 'Jerzy Strzelecki'),
  volubilis: photo('Volubilis-basilica.jpg', 'Jerzy Strzelecki'),
  tetouan: photo('Médina de Tétouan.jpg', 'Walid El Ammouri'),
  asilah: photo('Asilah (36750513531).jpg', 'Rodrigo Silva'),
  'al-hoceima': photo('Al Hoceima Quemado.jpg', 'Abdel Jalil Bouhaj'),
  akchour: photo("Cascade d'Akchour.jpg", 'Houssain tork'),
  ifrane: photo('Ifrane City Morocco.jpg', 'Akaki98'),
  'ait-benhaddou': photo('Aït Benhaddou view from above.jpg', 'Elena Tatiana Chis'),
  ouarzazate: photo('Kasbah Taourirt in Ouarzazate 2011.jpg', 'Bjørn Christian Tørrissen'),
  'dades-gorges': photo('The zigzagging road of the Dades Gorge in southern Morocco.jpg', 'Nawfal Kharbach'),
  'todra-gorge': photo('The Todgha Gorges, southern Morocco.jpg', 'Nawfal Kharbach'),
  zagora: photo('Date palms in the desert outside Zagora, Morocco (5491995474).jpg', 'Richard Allaway'),
  'ouzoud-falls': photo('Ouzoud waterfalls In spring-Morocco.jpg', 'Kasmii'),
  'el-jadida': photo('El Jadida cistern.jpg', 'Axel Rouvin'),
  taghazout: photo('Panorama beach at Taghazout.jpg', 'Heather Cowper'),
  legzira: photo('MA.GN.Sidi-Ifni Legzira-Beach Stone-Arch 756 16x9-R 5120x2880.jpg', 'Roy Egloff'),
  dakhla: photo('Kitesurf-Dakhla-Morocco (4).JPG', 'Nomadz'),
}
