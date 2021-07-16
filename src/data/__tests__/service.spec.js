import { Service } from "../service";

describe("service", () => {
  let service;

  const testMap = [
    [{
      name: "Aged Brie",
      sellIn: 8,
      quality: 5,
    }, {0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 9: 13, 10: 13, 11: 13, 12: 13, 13: 13}],
    [{
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 8,
      quality: 5,
    }, {0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 9: 13, 10: 13, 11: 13, 12: 13, 13: 13}],
    [{
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 8,
      quality: 5,
    }, {0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 9: 13, 10: 13, 11: 13, 12: 13, 13: 13}],
    [{
      name: "Conjured",
      sellIn: 8,
      quality: 5,
    }, {0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 9: 13, 10: 13, 11: 13, 12: 13, 13: 13}],
  ]

  beforeEach(() => {
    service = new Service(testMap.map(([m]) => m));
  });

  it("returns its effective date range for products", () => {});

  it("returns quality for day", () => {

    const qualityForDay1 = service.getQualityForDay('Aged Brie', 3)
    const qualityForDay2 = service.getQualityForDay('Backstage passes to a TAFKAL80ETC concert', 3)
    const qualityForDay3 = service.getQualityForDay('Sulfuras, Hand of Ragnaros', 3)
    const qualityForDay4 = service.getQualityForDay('Conjured', 3)

    testMap.forEach(([product, expectations]) => {
      for (const [day, expectedQuality] of Object.entries(expectations)) {
        const quality = service.getQualityForDay(product.name, day)

        if (quality !== expectedQuality) {
          console.log(quality, product, day, expectedQuality)
        }
        expect(quality).toEqual(expectedQuality)
      }
    })
  });
});
