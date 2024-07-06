export interface RawBird {
  "Name": string;
  "Scientific Name": string;
  "Expansion": string;
  "Forest": string;
  "Grassland": string;
  "Wetland": string;
  "Eggy Nest": string;
  "Nesty Nest": string;
  "Holey Nest": string;
  "Sticky Nest": string;
  "Star Nest": string;
  "Feathers": number;
  "Eggs": string;
  "Wingspan": string;
  "Worm": string;
  "Wheat": string;
  "Cherry": string;
  "Fish": string;
  "Rat": string;
  "Nectar": string;
  "Any Food": string;
  "/": string;
  "*": string;
  "Total": string;
  "Color": string;
  "Pink Condition": string;
  "Death": string;
  "Tuck": string;
  "Bonus Card": string;
  "Ability": string;
  "Anatomist (Body Parts)": string;
  "Cartographer (Geography)": string;
  "Historian ('s)": string;
  "Photographer (Colors)": string;
  "Forester                (Only Live in Forest)": string;
  "Prairie Manager (Only Live in Grass)": string;
  "Wetland Scientist (Only Live in Water)": string;
  "Bird Bander (Multiple habitats)": string;
  "Food Web Expert (Only Eat Worms)": string;
  "Bird Feeder (Eats Wheat)": string;
  "Viticulturalist (Eats Cherries)": string;
  "Fishery Manager (Eats Fish)": string;
  "Rodentologist (Eats Rats)": string;
  "Omnivore Expert      (Eats Any-Food Symbol)": string;
  "Diet Specialist        (3 food in cost)": string;
  "Pellet Dissector (Fish and Rats Cached)": string;
  "Enclosure Builder (Eggy Nests)": string;
  "Wildlife Gardener (Nesty Nests)": string;
  "Nest Box Builder (Holey Nests)": string;
  "Platform Builder (Sticky Nests)": string;
  "Passerine Specialist (30cm or less)": string;
  "Large Bird Specialist (over 65cm)": string;
  "Backyard Birder (less than 4 points)": string;
  "Small Clutch Specialist             (Egg Limit of 2 or less)": string;
  "Endangered Species Protector (Bonus Cards)": string;
  "Beak Direction": string;
  "Trivia": string;
  "Has an Art Card": string;
  "Art Card Beak Direction": string;
  "Direction Discrepancy": string;
}

export interface Bird {
  name: string;
  scientificName: string;
  expansion: Expansion;
  habitats: Habitat[];
  nest: Nest;
  feathers: number;
  eggCapacity: number;
  wingspan: string;
  food: FoodSet;
  slashed: boolean;
  alternateCost: boolean;
  totalFoodCost: number;
  powerColor: Color;
  pinkCondition: string;
  symbol: Symbol;
  ability: string;
  bonusCards: BonusCard[];
  beakDirection: BeakDir;
  trivia: string;
  artCard: boolean;
  artCardBeakDirection: BeakDir;
  directionDiscrepancy: boolean;  
}

export enum Symbol {
  Death = "Death",
  Tuck = "Tuck",
  Bonus = "Bonus",
  None = "None",
}

export enum Habitat {
  Forest,
  Grassland,
  Wetland,
}

export enum Expansion {
  NorthAmerica = "North America",
  European = "European",
  Oceania = "Oceania",
  Asia = "Asia",
  Swift = "Swift Start",
  DuetSwift = "Duet Swift Start"
}

export enum Nest {
  Eggy,
  Nesty,
  Holey,
  Sticky,
  Star,
  None
}

export enum Food {
  Worm = "Worm",
  Wheat = "Wheat",
  Cherry = "Cherry",
  Fish = "Fish",
  Rat = "Rat",
  Nectar = "Nectar",
  Any = "Any"
}

export interface FoodSet {
  [Food.Worm]: number,
  [Food.Wheat]: number,
  [Food.Cherry]: number,
  [Food.Fish]: number,
  [Food.Rat]: number,
  [Food.Nectar]: number,
  [Food.Any]: number
}

export enum Color {
  White = "White",
  Brown = "Brown",
  Pink = "Pink",
  Teal = "Teal",
  Yellow = "Yellow"
}

export enum BonusCard {
  Anatomist,
  Cartographer,
  Historian,
  Photographer,
  Forester,
  PrairieManager,
  WetlandScientist,
  BirdBander,
  FoodWebExpert,
  BirdFeeder,
  Viticulturalist,
  FisheryManager,
  Rodentologist,
  OmnivoreExpert,
  DietSpecialist,
  PelletDissector,
  EnclosureBuilder,
  WildlifeGardener,
  NestBoxBuilder,
  PlatformBuilder,
  PasserineSpecialist,
  LargeBirdSpecialist,
  BackyardBirder,
  SmallClutchSpecialist,
  EndangeredSpeciesProtector
}

export enum BeakDir {
  Left = "Left",
  Right = "Right",
  Neither = "Neither",
  Both = "Both",
  None = "None"
}

export enum ButtonState {
  Off,
  Inclusive,
  Exclusive
}