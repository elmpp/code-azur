export type ItemNameUnion = 'Aged Brie' | 'Backstage passes to a TAFKAL80ETC concert' | 'Sulfuras, Hand of Ragnaros' | 'Conjured'

export class Item {
  name: ItemNameUnion; // Bring it, Goblin boy
  sellIn: number;
  quality: number;

  constructor(name: ItemNameUnion, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export type ServiceResItem = {
  name: ItemNameUnion
  quality: number
  sellIn: number
}
export type ServiceRes = {
  day: number
  items: ServiceResItem[]
}

export class Service {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  /**
   @return number  Latest expiry (i.e. quality = 0) of all products
   */
  getMaxExpiryDay() {
    const qualityAtSellInBrie = this.getProductQualityForDay('Aged Brie', this.getProduct('Aged Brie')['sellIn'])
    const qualityAtSellInConjured = this.getProductQualityForDay('Conjured', this.getProduct('Conjured')['sellIn'])

    return Math.max(
      this.getProduct('Backstage passes to a TAFKAL80ETC concert')['sellIn'] + 1,
      this.getProduct('Aged Brie')['sellIn'] + Math.ceil(qualityAtSellInBrie / 2),
      this.getProduct('Conjured')['sellIn'] + Math.ceil(qualityAtSellInConjured / 4),
    )
  }

  getAllForDay(day: number): ServiceRes {
    return {
      day,
      items: [
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          quality: this.getProductQualityForDay('Backstage passes to a TAFKAL80ETC concert', day),
          sellIn: this.getProduct('Backstage passes to a TAFKAL80ETC concert').sellIn,
        },
        {
          name: 'Aged Brie',
          quality: this.getProductQualityForDay('Aged Brie', day),
          sellIn: this.getProduct('Aged Brie').sellIn,
        },
        {
          name: 'Sulfuras, Hand of Ragnaros',
          quality: this.getProductQualityForDay('Sulfuras, Hand of Ragnaros', day),
          sellIn: this.getProduct('Sulfuras, Hand of Ragnaros').sellIn,
        },
        {
          name: 'Conjured',
          quality: this.getProductQualityForDay('Conjured', day),
          sellIn: this.getProduct('Conjured').sellIn,
        },
      ],
    }
  }

  private getProductQualityForDay(name: ItemNameUnion, day: number): number {

    const product = this.getProduct(name)

    // if (product.name === 'Sulfuras, Hand of Ragnaros') return null

    const appreciatingQualityDeltaForDay = (product: Item, day: number): number => {
      const {name, sellIn} = product
      if (day > sellIn) throw new Error(`Cannot call appreciatingQualityDeltaForDay after sellIn`)
      const daysTillSellIn = sellIn - day
      let quality: number

      switch (name) {
        case 'Aged Brie':
          quality = 1
          break
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (daysTillSellIn <= 5) quality = 3
          else if (daysTillSellIn <= 10) quality = 2
          else quality = 1
          break
        default:
          quality = -1
      }
      return quality
    }

    const depreciatingQualityDeltaForDay = (product: Item, _day: number): number => {
      const {name} = product
      let quality: number

      switch (name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          throw new Error(`'Backstage passes to a TAFKAL80ETC concert' do not depreciate over time`)
        case 'Conjured':
          quality = -4
          break
        default:
          quality = -2
      }
      return quality
    }

    const appreciatingQualityForDay = (product: Item, day: number): number => {
      const {quality: startingQuality} = product
      return (new Array(day).fill('').reduce((currentQuality, _, currentDay) => {
        return Math.min(currentQuality + appreciatingQualityDeltaForDay(product, currentDay), 50)
      }, startingQuality))
    }

    const depreciatingQualityForDay = (product: Item, day: number): number => {
      const {sellIn} = product
      return (new Array(day).fill('').reduce((currentQuality, _, currentIdx) => {
        return currentQuality + depreciatingQualityDeltaForDay(product, (currentIdx + sellIn))
      }, 0))
    }

    const qualityForDay = (product: Item, day: number): number => {
      const {name, sellIn, quality: startingQuality} = product

      if (name === 'Sulfuras, Hand of Ragnaros') return startingQuality

      if (day <= sellIn) {
        return appreciatingQualityForDay(product, day)
      }
      else {
        const qualityAtSellIn: number = appreciatingQualityForDay(product, product.sellIn)
        if (product.name === 'Backstage passes to a TAFKAL80ETC concert') return 0
        const qualityDepreciated = depreciatingQualityForDay(product, day - sellIn)
        return Math.max(qualityAtSellIn + qualityDepreciated, 0)
      }
    }

    return qualityForDay(product, day)
  }

  private getProduct(name: ItemNameUnion): Item {
    const product = this.items.find(p => p.name === name)
    if (!product) {
      throw new Error(`Product ${name} has not been registered`)
    }
    return product
  }
}
