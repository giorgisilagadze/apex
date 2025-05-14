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
  oID: number;
  project_id: number;
  name: string;
  title: string;
  title_en: string;
  title_ru: string;
  address: string | null;
  address_en: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  deleted_at: string | null;
  finish_percent: string; // e.g., "95"
  sold_percent: string; // e.g., "100"
  image: string;
  img: string;
  google_map: string | null;
  maping: string | null;
  mapingJson: Maping[];
  max_floor: number;
  sort: number;
  status: string; // e.g., "დასრულებული"
  text: string; // HTML string
  text_en: string; // HTML string
  text_ru: string;
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

interface ApexAdmin {
  adminToken: string | null;
  setAdminToken: (value: string | null) => void;
  toast: {
    isVisible: boolean;
    text: string;
    type: string;
  };
  setToast: (isVisible: boolean, text: string, type: string) => void;
}

interface NewsItem {
  id: number;
  title: string;
  title_en: string;
  title_ru: string;
  text: string;
  text_en: string;
  text_ru: string;
  img: string;
  cover: string | null;
  sort: number | null;
  created_at: string;
  type: string;
}

interface Lead {
  id: number;
  name: string;
  mail: string;
  phone: string;
  project: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
interface Partner {
  id: number;
  title: string;
  title_en: string;
  title_ru: string;
  text: string;
  text_en: string;
  text_ru: string;
  img: string;
  cover: string | null;
  sort: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface GalleryItem {
  id: number;
  url: string;
  type: "photo" | "video";
  alt: string | null;
  sort: number | null;
}

interface Apartment {
  id: number;
  o_id: number | null;
  project_id: number;
  building_id: number;
  floor_id: number;
  status: string | null;
  address: string | null;
  area: number | null;
  bathroom: number | null;
  bathroom2: number | null;
  bedroom: number | null;
  bedroom2: number | null;
  bedroom3: number | null;
  building: string | null;
  coords: string | null;
  created_at: string;
  deleted_at: string | null;
  floor: number | null;
  floorID: number;
  hall: number | null;
  image: string;
  img: string;
  living_space: number | null;
  livingarea: number | null;
  maping: string | null;
  number: number | null;
  oID: number;
  otherarea: number | null;
  pdf: string | null;
  position: number | null;
  price: number | null;
  price2: number | null;
  project: string | null;
  projectID: number | null;
  ptype: string | null;
  sold: string | null;
  studio: number | null;
  summer_area: number | null;
  type: string | null;
  updated_at: string;
}

interface Floor {
  id: number;
  building_id: number;
  coords: string;
  created_at: string;
  deleted_at: string | null;
  image: string;
  img: string;
  maping: string | null;
  name: string | null;
  number: number;
  oID: number;
  projectID: number;
  project_id: number;
  sold: string | null;
  sort: number | null;
  status: string | null;
  title: string;
  updated_at: string;
  apartments: Apartment[];
}

interface Maping {
  coords: string;
  href: string;
  title: string;
  freeApartmentCount: string;
  id: string;
}
