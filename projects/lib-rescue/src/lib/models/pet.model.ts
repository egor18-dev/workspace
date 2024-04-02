export interface PetModel {
  id ?: string;
  name: string;
  type: string;
  main_image: string;
  carousel_imgs: string[];
  biography: string[];
  sex: string;
  birthdate: string;
  age: number;
  chip: string;
  vaccines: string[];
  diseases: string[];
  observations: string[];
}
