import * as dataset from './dataset';

export class CarDescriptionGenerator {
  static newDescription() {
    const numberCardBrands = dataset.brands.length - 1;
    const numberCardModels = dataset.models.length - 1;
    const newBrand = dataset.brands[Math.ceil(Math.random() * numberCardBrands)];
    const newModel = dataset.models[Math.ceil(Math.random() * numberCardModels)];
    const randomColor = () => (Math.ceil(Math.random() * 225) + 30).toString(16);

    const newColor = `#${randomColor()}${randomColor()}${randomColor()}`;
    return { name: `${newBrand} ${newModel}`, color: newColor };
  }
}

export default CarDescriptionGenerator;
