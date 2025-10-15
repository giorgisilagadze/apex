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

interface Gallery {
  building_id: number;
  created_at: string;
  deleted_at: null | string;
  id: number;
  updated_at: string;
  url: string;
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
  galery: Gallery[];
  ijara: string;
  fullSale: string;
  halfSale: string;
  arcikadi: null | string;
  arcikadi_en: null | string;
  arcikadi_ru: null | string;
  presentation: null | string;
  presentation_en: null | string;
  presentation_ru: null | string;
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

interface ProjectR {
  id: number;
  oID: number;
  name: string;
  title: string;
  title_en: string;
  title_ru: string;
  sub_text: string | null;
  sub_text_en: string | null;
  sub_text_ru: string | null;
  text: string;
  text_en: string;
  text_ru: string;
  address: string | null;
  address_en: string | null;
  google_map: string | null;
  maping: string | null;
  image: string;
  img: string;
  max_floor: number;
  finish_percent: string; // consider changing to number if always numeric
  sold_percent: string; // same here
  status: string;
  ijara: string; // also can be number
  fullSale: string;
  halfSale: string;
  sort: number | null;
  created_at: string; // ISO date string
  updated_at: string;
  deleted_at: string | null;
}

interface Apartment1 {
  id: number;
  oID: number;
  number: string;
  area: string;
  studio: string;
  summer_area: string;
  living_space: string;
  price: string;
  priceGEL: number;
  status: string;
  sold: string;
  image: string;
  img: string;
  pdf: string;
  coords: string;
  position: number;
  building: string;
  building_id: number;
  project: string;
  project_id: number;
  floorID: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  // Nullable fields
  address: string | null;
  bathroom: string | null;
  bathroom2: string | null;
  bedroom: string | null;
  bedroom2: string | null;
  bedroom3: string | null;
  floor: string | null;
  floor_id: string | null;
  hall: string | null;
  livingarea: string | null;
  maping: string | null;
  o_id: string | null;
  otherarea: string | null;
  price2: string | null;
  projectID: string | null;
  ptype: string | null;
  type: string | null;
  projectR: ProjectR;
  buildingR: Building;
}

interface ConstructionNews {
  id: number;
  construction_id: number;
  created_at: string;
  updated_at: string;
  img: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string | null;
  sort: number | null;

  title: string;
  title_en: string;
  title_ru: string;

  text: string;
  text_en: string;
  text_ru: string;

  sub_text: string;
  sub_text_en: string | null;
  sub_text_ru: string | null;

  sub_text1: string;
  sub_text1_en: string;
  sub_text1_ru: string;

  sub_text2: string | null;
  sub_text2_en: string | null;
  sub_text2_ru: string | null;

  type: string | null;
}

interface Construction {
  id: number;
  created_at: string;
  updated_at: string;
  img: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string | null;
  sort: number | null;
  sub_text: string;
  sub_text_en: string;
  sub_text_ru: string;
  sub_text1: string;
  sub_text1_en: string;
  sub_text1_ru: string;
  sub_text2: string;
  sub_text2_en: string | null;
  sub_text2_ru: string | null;
  text: string;
  text_en: string;
  text_ru: string;
  title: string;
  title_en: string;
  title_ru: string;
  type: string | null;
  news: ConstructionNews[];
}

interface EmployeeProfile {
  id: number;
  img: string;
  name: string;
  name_en: string;
  name_ru: string;
  position: string;
  position_en: string;
  position_ru: string;
  sort: number | null;
}
