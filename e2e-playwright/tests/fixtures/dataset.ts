const totalTitles = 16928;

export const DATASET = {
  totalTitles,
  totalTitlesFmt: totalTitles.toLocaleString('pt-BR'),
  catalogPages: Math.ceil(totalTitles / 48),
  wiiSports: {
    id: 1,
    name: 'Wii Sports',
    subtitle: 'Nintendo · Sports · 2006',
    sales: '82,53 M un.',
    metascore: '7,6 / 10,0',
  },
  marioKartWii: { id: 3, name: 'Mario Kart Wii' },
  gtaV: { ps3Id: 17, x360Id: 24 },
  nintendoTitles: 721,
  zeldaTitles: 28,
  topGenre: 'Action',
  topPublisher: 'Nintendo',
  regionsBySales: ['América do Norte', 'Europa', 'Japão', 'Outros'],
  yearBounds: [1980, 2020] as const,
};
