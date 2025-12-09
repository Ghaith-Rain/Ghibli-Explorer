// Species model based on Ghibli API
export interface Species {
  id: string;
  name: string;
  classification: string;
  eye_color: string;
  hair_color: string;
  people: string[];
  films: string[];
  url: string;
}
