import { Dataset } from './dataset';

export async function getDataSet(level: number, requestURL: string, dataset: Dataset) {
  const request = new Request(requestURL);
  const response = await fetch(request);
  if (response.ok) {
    const data = await response.json();
    dataset.setDataset(level, data);
  } else {
    dataset.setDataset(level, undefined);
    console.log('Reload page please, somebody wrong: ' + response.status);
  }
}
