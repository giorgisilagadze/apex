interface Apartment {
  id: number;
  o_id: number | null;
  project_id: number;
  building_id: number;
  floor_id: number;
  status: string;
  project: string;
  building: string;
  ptype: string;
  type: string;
  address: string;
  floor: number;
  number: string;
  area: string;
  livingarea: string;
  otherarea: string;
  price: string;
  price2: string;
  img: string | null;
  maping: string;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  deleted_at: string | null;
}

interface Building {
  id: number;
  project_id: number;
  name: string;
  sort: number | null;
  status: string;
  img: string;
  maping: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
}

interface ProjectBuilding {
  id: number;
  name: string;
  sort: number | null;
  status: string | null;
  img: string;
  maping: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  buildings: Building[];
}

interface Filter {
  area: {
    min: string;
    max: string;
  };
  price: {
    min: string;
    max: string;
  };
  projectBuilding: ProjectBuilding[];
  type: string[];
}

interface SelectedValues {
  building: string;
  type: string;
  status: string;
  areaFrom: string;
  areaTo: string;
  priceFrom: string;
  priceTo: string;
}
