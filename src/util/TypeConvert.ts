import { BeakDir, Bird, BonusCard, Color, Expansion, Food, Habitat, Nest, RawBird } from "./Types";

// Converts the RawBird type imported from the JSON into a more code-friendly Bird type
export function rawBirdToBird(raw : RawBird) : Bird {
  var bird : Bird = {
    name: raw["Name"],
    scientificName: raw["Scientific Name"],
    expansion: raw["Expansion"] as Expansion,
    habitats: [raw["Forest"] === "x" ? Habitat.Forest : null,
              raw["Grassland"] === "x" ? Habitat.Grassland : null,
              raw["Wetland"] === "x" ? Habitat.Wetland: null
              ].filter((value : Habitat | null) : value is Habitat => {
              return value !== null
              }),
    nest: raw["Eggy Nest"] === "x" ? Nest.Eggy
        : raw["Nesty Nest"] === "x" ? Nest.Nesty
        : raw["Holey Nest"] === "x" ? Nest.Holey
        : raw["Sticky Nest"] === "x" ? Nest.Sticky
        : raw["Star Nest"] === "x" ? Nest.Star
        : Nest.None,
    feathers: raw["Feathers"],
    eggCapacity: raw["Eggs"] === "-" ? 0 : +raw["Eggs"],
    wingspan: raw["Wingspan"],
    food: {[Food.Worm]: +raw["Worm"] || 0,
           [Food.Wheat]: +raw["Wheat"] || 0,
           [Food.Cherry]: +raw["Cherry"] || 0,
           [Food.Fish]: +raw["Fish"] || 0,
           [Food.Rat]: +raw["Rat"] || 0,
           [Food.Nectar]: +raw["Nectar"] || 0,
           [Food.Any]: +raw["Any Food"] || 0
          },
    slashed: raw["/"] === "/",
    alternateCost: raw["*"] === "*",
    totalFoodCost: +raw["Total"].replace(/[^0-9]/g, ''),
    powerColor: raw["Color"] as Color,
    pinkCondition: raw["Pink Condition"],
    death: raw["Death"] === "x",
    tuck: raw["Tuck"] === "x",
    givesBonusCard: raw["Bonus Card"] === "x",
    ability: raw["Ability"],
    bonusCards: [
                  raw["Anatomist (Body Parts)"] === "x" ? BonusCard.Anatomist : null,
                  raw["Cartographer (Geography)"] === "x" ? BonusCard.Cartographer : null,
                  raw["Historian ('s)"] === "x" ? BonusCard.Historian : null,
                  raw["Photographer (Colors)"] === "x" ? BonusCard.Photographer : null,
                  raw["Forester                (Only Live in Forest)"] === "x" ? BonusCard.Forester : null,
                  raw["Prairie Manager (Only Live in Grass)"] === "x" ? BonusCard.PrairieManager : null,
                  raw["Wetland Scientist (Only Live in Water)"] === "x" ? BonusCard.WetlandScientist : null,
                  raw["Bird Bander (Multiple habitats)"] === "x" ? BonusCard.BirdBander : null,
                  raw["Food Web Expert (Only Eat Worms)"] === "x" ? BonusCard.FoodWebExpert : null,
                  raw["Bird Feeder (Eats Wheat)"] === "x" ? BonusCard.BirdFeeder : null,
                  raw["Viticulturalist (Eats Cherries)"] === "x" ? BonusCard.Viticulturalist : null,
                  raw["Fishery Manager (Eats Fish)"] === "x" ? BonusCard.FisheryManager : null,
                  raw["Rodentologist (Eats Rats)"] === "x" ? BonusCard.Rodentologist : null,
                  raw["Omnivore Expert      (Eats Any-Food Symbol)"] === "x" ? BonusCard.OmnivoreExpert : null,
                  raw["Diet Specialist        (3 food in cost)"] === "x" ? BonusCard.DietSpecialist : null,
                  raw["Pellet Dissector (Fish and Rats Cached)"] === "x" ? BonusCard.PelletDissector : null,
                  raw["Enclosure Builder (Eggy Nests)"] === "x" ? BonusCard.EnclosureBuilder : null,
                  raw["Wildlife Gardener (Nesty Nests)"] === "x" ? BonusCard.WildlifeGardener : null,
                  raw["Nest Box Builder (Holey Nests)"] === "x" ? BonusCard.NestBoxBuilder : null,
                  raw["Platform Builder (Sticky Nests)"] === "x" ? BonusCard.PlatformBuilder : null,
                  raw["Passerine Specialist (30cm or less)"] === "x" ? BonusCard.PasserineSpecialist : null,
                  raw["Large Bird Specialist (over 65cm)"] === "x" ? BonusCard.LargeBirdSpecialist : null,
                  raw["Backyard Birder (less than 4 points)"] === "x" ? BonusCard.BackyardBirder : null,
                  raw["Small Clutch Specialist             (Egg Limit of 2 or less)"] === "x" ? BonusCard.SmallClutchSpecialist : null,
                  raw["Endangered Species Protector (Bonus Cards)"] === "x" ? BonusCard.EndangeredSpeciesProtector : null
               ].filter((value : BonusCard | null) : value is BonusCard => {return value !== null}),
    beakDirection: raw["Beak Direction"].replace('?', '') as BeakDir,
    trivia: raw["Trivia"],
    artCard: raw["Has an Art Card"] === "x",
    artCardBeakDirection: raw["Art Card Beak Direction"] ? raw["Art Card Beak Direction"].replace('?', '') as BeakDir : BeakDir.None,
    directionDiscrepancy: raw["Direction Discrepancy"] === "x"
  }
  return bird
}