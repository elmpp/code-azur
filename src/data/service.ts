type ProductNameUnion = 'Aged Brie' | 'Backstage passes to a TAFKAL80ETC concert' | 'Sulfuras, Hand of Ragnaros' | 'Conjured'

export class Item {
  name: ProductNameUnion; // Bring it, Goblin boy
  sellIn: number;
  quality: number;

  constructor(name: ProductNameUnion, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Service {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
    console.log(`this.items :>> `, this.items)
  }

  /**
   @return number  Max days when quality will vary with advancing date for any product
   */
  getAllProductsExpiry() {

  }

  getQualityForDay(name: ProductNameUnion, day: number): number | null {

    const product = this.getProduct(name)

    if (product.name === 'Sulfuras, Hand of Ragnaros') return null

    const appreciatingQualityDeltaForDay = (product: Item, day: number): number => {
      const {name, sellIn, quality: startingQuality} = product
      if (day > sellIn) throw new Error(`Cannot call appreciatingQualityDeltaForDay after sellIn`)
      const daysTillSellIn = sellIn - day
      let quality: number

      switch (name) {
        case 'Aged Brie':
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

    const depreciatingQualityDeltaForDay = (product: Item, day: number): number => {
      const {name, sellIn, quality: startingQuality} = product
      if (day <= sellIn) throw new Error(`Cannot call depreciatingQualityDeltaForDay on or before sellIn`)
      let quality: number

      switch (name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          throw new Error(`'Backstage passes to a TAFKAL80ETC concert' do not depreciate over time`)
          break
        case 'Conjured':
          quality = -4
          break
        default:
          quality = -2
      }
      return quality
    }

    const appreciatingQualityForDay = (product: Item, day: number): number => {
      const {name, sellIn, quality: startingQuality} = product
      return (new Array(day).fill('').reduce((currentQuality, _, currentDay) => {
        return Math.min(currentQuality + appreciatingQualityDeltaForDay(product, currentDay), 50)
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
        return qualityAtSellIn + depreciatingQualityDeltaForDay(product, day)
      }
    }

    return qualityForDay(product, day)
  }

  private getProduct(name: ProductNameUnion): Item {
    const product = this.items.find(p => p.name === name)
    if (!product) {
      throw new Error(`Product ${name} has not been registered`)
    }
    return product
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
