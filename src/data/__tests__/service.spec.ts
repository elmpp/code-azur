import { Service, ServiceRes, ServiceResItem, Item, ItemNameUnion } from "../service";

describe("service", () => {
  let service: Service;

  const testMap: [Item, number[]][] = [
    [{
      name: "Backstage passes to a TAFKAL80ETC concert",
      sellIn: 12,
      quality: 5,
    }, [5, 6, 7, 9, 11, 13, 15, 17, 20, 23, 26, 29, 32, 0, 0, 0]],
    [{
      name: "Aged Brie",
      sellIn: 8,
      quality: 5,
    }, [5, 6, 7, 8, 9, 10, 11, 12, 13, 11, 9, 7, 5, 3, 1, 0]],
    [{
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 8,
      quality: 5,
    }, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
    [{
      name: "Conjured",
      sellIn: 3,
      quality: 14,
    }, [14, 13, 12, 11, 7, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  ]

  beforeEach(() => {
    service = new Service(testMap.map(([m]) => m));
  });

  it("returns its effective date range for products", () => {

    expect(service.getMaxExpiryDay()).toEqual(15)  // Brie expires last for us
  })

  it("computes correctly for day", () => {

    ;(new Array(testMap[0][1].length).fill('')).forEach((_, day) => {
      const res: ServiceRes = service.getAllForDay(day)

      const mapForProduct = (name: ItemNameUnion): [Item, number[]] => testMap.find(([m]) => m.name === name)!
      const resForProduct = (name: ItemNameUnion): ServiceResItem => res.items.find(r => r.name === name)!
      const doExpects = (name: ItemNameUnion, day: number) => {
        const quality = resForProduct(name)['quality']
        const expectedQuality = mapForProduct(name)[1][day]

        if (quality !== expectedQuality) {
          console.log({
            day,
            quality,
            expectedQuality,
            name,
          })
        }
        expect(quality).toEqual(expectedQuality)
      }

      doExpects('Backstage passes to a TAFKAL80ETC concert', day)
      doExpects('Aged Brie', day)
      doExpects('Sulfuras, Hand of Ragnaros', day)
      doExpects('Conjured', day)
    })
    // testMap[0].forEach(([product, expectations]) => {
    //   // for (const [day, expectedQuality] of expectations) {
    //   expectations.forEach((expectedQuality, day) => {
    //     const quality = service.getQualityForDay(product.name, day)

    //     if (quality !== expectedQuality) {
    //       console.log({
    //         day,
    //         quality,
    //         expectedQuality,
    //         product,
    //       })
    //     }
    //     expect(quality).toEqual(expectedQuality)
    //   })
    // })
  });

  // it("returns quality for day", () => {

  //   // const qualityForDay1 = service.getQualityForDay('Aged Brie', 3)
  //   // const qualityForDay2 = service.getQualityForDay('Backstage passes to a TAFKAL80ETC concert', 3)
  //   // const qualityForDay3 = service.getQualityForDay('Sulfuras, Hand of Ragnaros', 3)
  //   // const qualityForDay4 = service.getQualityForDay('Conjured', 3)

  //   testMap.forEach(([product, expectations]) => {
  //     // for (const [day, expectedQuality] of expectations) {
  //     expectations.forEach((expectedQuality, day) => {
  //       const quality = service.getQualityForDay(product.name, day)

  //       if (quality !== expectedQuality) {
  //         console.log({
  //           day,
  //           quality,
  //           expectedQuality,
  //           product,
  //         })
  //       }
  //       expect(quality).toEqual(expectedQuality)
  //     })
  //   })
  // });
});
