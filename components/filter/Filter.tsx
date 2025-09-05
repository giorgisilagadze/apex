"use client";

import { useEffect, useRef, useState } from "react";
import SelectComp from "../input/SelectComp";
import Input from "../input/Input";
import Button from "../button/Button";

import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ScreenSize from "@/hooks/ScreenSize";
import SortSelect from "../input/SortSelect";
import FilterCard from "../card/FIlterCard";
import Image from "next/legacy/image";
import axios from "axios";
import Shimmer from "../shimmer/Shimmer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useClickOutside from "@/hooks/useClickOutside";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  page: string;
  isSingleProject?: boolean;
}

export default function Filter({ page, isSingleProject }: Props) {
  const [selectedCurr, setSelectedCurr] = useState("ლარი");
  const [selectedPrice, setSelectedPrice] = useState("დაბლიდან მაღლა");
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  const [filterValues, setFilterValues] = useState<Filter>();
  const [currentProject, setCurrentProject] = useState<string[]>();
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    building: "",
    type: "",
    status: "",
    areaFrom: "",
    areaTo: "",
    priceFrom: "",
    priceTo: "",
  });
  const [isFilerLoading, setIsFilterLoading] = useState(true);
  const [aparts, setAparts] = useState<Apartment1[]>();
  const [isApartsLoading, setIsApartsLoading] = useState(false);
  const [floor, setFloor] = useState<string>("");
  const [isAreaVisible, setIsAreaVisible] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);

  const areaRef = useRef(null);
  const priceRef = useRef(null);

  useClickOutside(areaRef, () => setIsAreaVisible(false));
  useClickOutside(priceRef, () => setIsPriceVisible(false));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("Filter");

  const currency = [
    {
      id: 1,
      value: "ლარი",
    },
    {
      id: 2,
      value: "დოლარი",
    },
  ];

  const price = [
    {
      id: 1,
      value: "დაბლიდან მაღლა",
    },
    {
      id: 2,
      value: "მაღლიდან დაბლა",
    },
  ];

  const status = ["ყველა", "მიმდინარე", "დასრულებული"];

  const minPrices = ["10 000", "20 000", "30 000", "75 000", "100 000"];
  const maxPrices = ["30 000", "50 000", "80 000", "150 000", "250 000"];
  const minAreas = ["32", "50", "70", "100", "120", "150"];
  const maxAreas = ["50", "70", "100", "120", "150", "200"];

  const dimension = ScreenSize();

  const parseFilters = (filterString: string) => {
    const params = new URLSearchParams(filterString);
    const parsedFilters = {
      building: params.get("building") || "",
      type: params.get("type") || "",
      status: params.get("status") || "",
      areaFrom: params.get("areaFrom") || "",
      areaTo: params.get("areaTo") || "",
      priceFrom: params.get("priceFrom") || "",
      priceTo: params.get("priceTo") || "",
    };
    const projectId = params.get("project") || "";
    // (page !== "project" && page !== "floor" ? "1" : "");
    const floorId = params.get("floor") || "";

    return { parsedFilters, projectId, floorId };
  };

  useEffect(() => {
    const fetchFilters = async () => {
      setIsFilterLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/apartment/getFilters`
        );
        const data = response.data;
        setFilterValues(data);

        // Parse filters
        const { parsedFilters, projectId, floorId } = parseFilters(
          searchParams.toString()
        );

        setFloor(floorId);
        if (projectId) {
          setSelectedProjectId(parseInt(projectId)); // Make sure projectId is set
        }

        let newValues = parsedFilters;
        let lastElement: string | undefined;
        let floor: string | undefined;
        let selectedBuilding;
        if (page === "project" || page === "floor") {
          const pathParts = pathname.split("/").filter(Boolean);
          if (page === "project") {
            lastElement = pathParts.at(-1);
          } else {
            lastElement = pathParts.at(-2);
            floor = pathParts.at(-1);
            setFloor(floor ?? "");
          }

          if (lastElement) {
            selectedBuilding = data.projectBuilding
              .flatMap((project: ProjectBuilding) => project.buildings)
              .find(
                (building: Building) =>
                  building.id === parseInt(lastElement as string)
              );

            if (selectedBuilding) {
              newValues = { ...newValues, building: selectedBuilding.name };
              setSelectedProjectId(selectedBuilding.project_id);
            }
          }
        }

        if (Object.values(newValues).some((value) => value !== "")) {
          setSelectedValues(newValues);
          const parsedProjectId = parseInt(projectId);
          handleSearch(
            newValues,
            floorId || floor,
            isNaN(parsedProjectId)
              ? selectedBuilding.project_id
              : parsedProjectId
          );
        } else {
          const parsedProjectId = parseInt(projectId);
          handleSearch(
            newValues,
            floorId || floor,
            isNaN(parsedProjectId)
              ? selectedBuilding.project_id
              : parsedProjectId
          );
        }
      } catch (err) {
      } finally {
        setIsFilterLoading(false);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (filterValues) {
      const currProject = filterValues?.projectBuilding.filter(
        (item) => item.id == selectedProjectId
      )[0];
      const buildings = currProject?.buildings.map((item) => item.name);
      setCurrentProject(buildings);
    }
  }, [selectedProjectId, filterValues]);

  const handleSelect = (key: string, value: string) => {
    setSelectedValues({ ...selectedValues, [key]: value });
    if (key == "building") {
      setSelectedProjectId(
        filterValues?.projectBuilding.find((item) => item.name == value)?.id
      );
    }
  };
  const handleClear = () => {
    setSelectedValues({
      building: "",
      type: "",
      status: "",
      areaFrom: "",
      areaTo: "",
      priceFrom: "",
      priceTo: "",
    });
    setAparts(undefined);
  };

  const handleSearch = async (
    filters: SelectedValues,
    floor: string | undefined,
    projectId: number | undefined
  ) => {
    const isEmpty =
      filters.areaFrom == "" &&
      filters.priceFrom == "" &&
      filters.areaTo == "" &&
      filters.priceTo == "" &&
      filters.building == "" &&
      filters.type == "" &&
      filters.status == "";
    if (!isEmpty) {
      const params: string[] = Object.entries(filters)
        .filter(([_, value]) => value !== "" && value !== null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

      if (floor !== undefined && floor !== "") {
        params.push(`floor_id=${encodeURIComponent(floor)}`);
      }

      const queryString = params.join("&");

      setTimeout(() => {
        replace(
          `${pathname}?${queryString}${
            projectId ? `&project=${projectId}` : ""
          }`,
          {
            scroll: false,
          }
        );
      }, 500);
      setIsApartsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/apartment?${queryString}${
            projectId ? `&building_id=${projectId}` : ""
          }`
        );
        let data = response.data;
        data = data.sort((a: { price: number }, b: { price: number }) =>
          selectedPrice === "დაბლიდან მაღლა"
            ? a.price - b.price
            : b.price - a.price
        );
        setAparts(data);
      } catch (err) {
      } finally {
        setIsApartsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (aparts) {
      const sortedData = [...aparts].sort((a, b) =>
        selectedPrice === "დაბლიდან მაღლა"
          ? Number(a.price) - Number(b.price)
          : Number(b.price) - Number(a.price)
      );
      setAparts(sortedData);
    }
  }, [selectedPrice]);

  console.log(filterValues);

  return (
    <div
      className={`w-full xl1600:px-[250px] lg:px-[80px] sm:px-[64px] px-6 relative ${
        (page == "project" || page == "floor") && "sm:py-[80px] py-[60px]"
      }`}
    >
      {(page == "project" || page == "floor") && (
        <Image
          src={"/images/pattern_bg.png"}
          alt="bg"
          layout="fill"
          objectFit="cover"
          className="z-[-1] pointer-events-none select-none"
        />
      )}
      <div className={`w-full rounded-[16px] shadow-dropDown z-[1]`}>
        <div
          className={`flex items-center gap-5 shadow-topShadow lg:px-12 px-6 pt-5 pb-3 whitespace-nowrap rounded-tl-[16px] rounded-tr-[16px] ${
            page !== "project" &&
            page !== "floor" &&
            "overflow-x-auto overflow-y-hidden"
          } ${
            page === "home" || page === "allProjects"
              ? "bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px]"
              : "bg-white"
          }`}
        >
          {page !== "project" && page !== "floor" ? (
            !isFilerLoading ? (
              // filterValues?.projectBuilding.map((item) => (
              //   <div
              //     key={item.id}
              //     className="flex flex-col gap-2 cursor-pointer"
              //     onClick={() => {
              //       setSelectedProjectId(item.id);
              //       handleClear();
              //     }}
              //   >
              //     <p
              //       className={`${
              //         selectedProjectId == item.id
              //           ? "text-blue font-medium"
              //           : "text-black font-light"
              //       } text-[14px]`}
              //     >
              //       {t(item.name)}
              //     </p>
              //     <div
              //       className={`w-full h-[2px] ${
              //         selectedProjectId == item.id ? "bg-blue" : "bg-trasparent"
              //       }`}
              //     ></div>
              //   </div>
              // ))
              status.map((item) => (
                <div
                  key={item}
                  className={`flex flex-col gap-1 cursor-pointer rounded-[30px] py-2 px-3 ${
                    selectedValues.status == item ? "bg-blue" : ""
                  }`}
                  onClick={() => {
                    handleSelect("status", item);
                    // handleClear();
                  }}
                >
                  <p className={`font-medium text-[14px] text-white`}>
                    {t(item)}
                  </p>
                </div>
              ))
            ) : (
              [1, 2, 3, 4, 5].map((item) => (
                <Shimmer
                  width="w-[100px]"
                  height="h-[31px]"
                  key={item}
                  rounded="rounded-[4px]"
                />
              ))
            )
          ) : (
            <div className="flex sm:items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1">
                <h1 className={`text-[14px] text-blue`}>{t("available")}:</h1>
                <p className="text-[14px] text-blue">{aparts?.length}</p>
              </div>
              <SortSelect
                title={t("price")}
                data={price}
                selected={selectedPrice}
                setSelected={setSelectedPrice}
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col bg-white rounded-bl-[16px] rounded-br-[16px] ">
          {!isFilerLoading ? (
            <div
              className={`w-full lg:px-12 px-6 py-7 md500:grid flex flex-col gap-4 ${
                page == "project" || page == "floor"
                  ? "lg:grid-cols-6"
                  : "lg:grid-cols-5"
              } md600:grid-cols-3 md500:grid-cols-2 gap-4 items-end rounded-bl-[16px] rounded-br-[16px] bg-white`}
            >
              {(page == "project" || page == "floor") && (
                <div className="w-full flex flex-col gap-[6px]">
                  <h1 className="text-[14px] font-medium text-blue">
                    {t("project")}
                  </h1>
                  <Input
                    placeholder={""}
                    inputKey=""
                    onChange={() => {}}
                    value={
                      filterValues?.projectBuilding.find(
                        (item) => item.id == selectedProjectId
                      )?.name
                        ? t(
                            filterValues?.projectBuilding.find(
                              (item) => item.id == selectedProjectId
                            )?.name
                          )
                        : ""
                    }
                    readonly={true}
                    color="text-blue"
                    bgColor="bg-white"
                    isFilter={true}
                  />
                </div>
              )}
              {/* {page !== "project" && page !== "floor" ? (
                <SelectComp
                  title="ბლოკი"
                  placeholder="აირჩიეთ"
                  data={currentProject}
                  onClick={handleSelect}
                  filterKey="building"
                  selectedValues={selectedValues}
                />
              ) : (
                <div className="w-full flex flex-col gap-[6px]">
                  <p className="text-[14px] font-medium">ბლოკი</p>
                  <Input
                    placeholder={""}
                    inputKey=""
                    onChange={() => {}}
                    value={selectedValues.building}
                    readonly={true}
                  />
                </div>
              )} */}
              {(page == "project" || page == "floor") && (
                <div className="w-full flex flex-col gap-[6px]">
                  <h1 className="text-[14px] font-medium text-blue">
                    {t("block")}
                  </h1>
                  <Input
                    placeholder={""}
                    inputKey=""
                    onChange={() => {}}
                    value={selectedValues.building}
                    readonly={true}
                    color="text-blue"
                    bgColor="bg-white"
                    isFilter={true}
                  />
                </div>
              )}
              <SelectComp
                title={t("category")}
                placeholder={t("choose")}
                data={filterValues?.type}
                onClick={handleSelect}
                filterKey="type"
                selectedValues={selectedValues}
                color="text-blue"
                bgColor="bg-white"
                isFilter={true}
              />
              {/* {page !== "project" && page !== "floor" && (
                <SelectComp
                  title={t("status")}
                  placeholder={t("choose")}
                  data={status}
                  onClick={handleSelect}
                  filterKey="status"
                  selectedValues={selectedValues}
                />
              )} */}

              {page !== "project" && page !== "floor" && (
                <SelectComp
                  title={t("project")}
                  placeholder={t("choose")}
                  data={
                    selectedValues.status && selectedValues.status !== "ყველა"
                      ? filterValues?.projectBuilding
                          .filter(
                            (item) => item.status == selectedValues.status
                          )
                          .map((item) => item.name)
                      : filterValues?.projectBuilding.map((item) => item.name)
                  }
                  onClick={handleSelect}
                  filterKey="building"
                  selectedValues={selectedValues}
                  color="text-blue"
                  bgColor="bg-white"
                  isFilter={true}
                />
              )}

              <div
                className="w-full flex flex-col gap-[6px] relative"
                ref={areaRef}
              >
                <h1 className="text-[14px] font-medium text-blue">
                  {t("areaTitle")}
                  <sup>2</sup>
                </h1>
                <div
                  className="w-full flex items-center gap-1 h-[44px] cursor-pointer"
                  onClick={() => setIsAreaVisible(!isAreaVisible)}
                >
                  <div>
                    <h1 className="text-blue text-[14px]">
                      {selectedValues["areaFrom"] ? (
                        <>
                          {selectedValues["areaFrom"]}
                          {t("area")}
                          <sup>2</sup>
                        </>
                      ) : (
                        t("from")
                      )}
                    </h1>
                  </div>
                  <div>-</div>
                  <div>
                    <h1 className="text-blue text-[14px]">
                      {selectedValues["areaTo"] ? (
                        <>
                          {selectedValues["areaTo"]}
                          {t("area")}
                          <sup>2</sup>
                        </>
                      ) : (
                        t("to")
                      )}
                    </h1>
                  </div>
                  <MdKeyboardArrowDown
                    className={`text-[18px] ${
                      isAreaVisible && "rotate-180"
                    } text-blue duration-300`}
                  />
                </div>
                <div
                  className={`${
                    isAreaVisible
                      ? "pointer-events-auto opacity-100 z-[2]"
                      : "pointer-events-none opacity-0 z-[-1]"
                  } duration-300 absolute top-[76px] left-0 w-full min-w-[201px] rounded-[10px] border border-blue bg-white px-3 py-4 grid grid-cols-2 gap-1`}
                >
                  <div className="w-full flex flex-col">
                    <p className="text-[12px] text-center">{t("min")}</p>
                    {minAreas.map((item) => (
                      <div
                        className=" border-b border-[#eee] flex justify-center cursor-pointer hover:bg-blue hover:text-white duration-300 py-2"
                        key={item}
                        onClick={() => {
                          if (selectedValues["areaTo"]) {
                            if (
                              parseInt(item) <
                              parseInt(selectedValues["areaTo"])
                            )
                              handleSelect("areaFrom", item);
                          } else handleSelect("areaFrom", item);
                        }}
                      >
                        <p className="text-[14px]">
                          {item} {t("area")}
                          <sup>2</sup>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-col">
                    <p className="text-[12px] text-center">{t("max")}</p>
                    {maxAreas.map((item) => (
                      <div
                        className=" border-b border-[#eee] flex justify-center cursor-pointer hover:bg-blue hover:text-white duration-300 py-2"
                        key={item}
                        onClick={() => {
                          if (selectedValues["areaFrom"]) {
                            if (
                              parseInt(item) >
                              parseInt(selectedValues["areaFrom"])
                            )
                              handleSelect("areaTo", item);
                          } else handleSelect("areaTo", item);
                        }}
                      >
                        <p className="text-[14px]">
                          {item} {t("area")}
                          <sup>2</sup>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="w-full flex flex-col gap-[6px] relative"
                ref={priceRef}
              >
                <h1 className="text-[14px] font-medium text-blue">
                  {t("price")}
                </h1>
                <div
                  className="w-full flex items-center gap-1 h-[44px] cursor-pointer"
                  onClick={() => setIsPriceVisible(true)}
                >
                  <div>
                    <h1 className="text-blue text-[14px]">
                      {selectedValues["priceFrom"] ? (
                        <>${selectedValues["priceFrom"]}</>
                      ) : (
                        t("from")
                      )}
                    </h1>
                  </div>
                  <div>-</div>
                  <div>
                    <h1 className="text-blue text-[14px]">
                      {selectedValues["priceTo"] ? (
                        <>${selectedValues["priceTo"]}</>
                      ) : (
                        t("to")
                      )}
                    </h1>
                  </div>
                  <MdKeyboardArrowDown
                    className={`text-[18px] ${
                      isPriceVisible && "rotate-180"
                    } text-blue duration-300`}
                  />
                </div>
                <div
                  className={`${
                    isPriceVisible
                      ? "pointer-events-auto opacity-100 z-[2]"
                      : "pointer-events-none opacity-0 z-[-1]"
                  } duration-300 absolute top-[76px] left-0 w-full min-w-[201px] rounded-[10px] border border-blue bg-white px-3 py-4 grid grid-cols-2 gap-1`}
                >
                  <div className="w-full flex flex-col">
                    <p className="text-[12px] text-center">{t("min")}</p>
                    {minPrices.map((item) => (
                      <div
                        className="border-b border-[#eee] flex justify-center cursor-pointer hover:bg-blue hover:text-white duration-300 py-2"
                        key={item}
                        onClick={() => {
                          if (selectedValues["priceTo"]) {
                            if (
                              parseInt(item) <
                              parseInt(selectedValues["priceTo"])
                            )
                              handleSelect("priceFrom", item);
                          } else handleSelect("priceFrom", item);
                        }}
                      >
                        <p className="text-[14px]">$ {item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-col">
                    <p className="text-[12px] text-center">{t("max")}</p>
                    {maxPrices.map((item) => (
                      <div
                        className="border-b border-[#eee] flex justify-center cursor-pointer hover:bg-blue hover:text-white duration-300 py-2"
                        key={item}
                        onClick={() => {
                          if (selectedValues["priceFrom"]) {
                            if (
                              parseInt(item) >
                              parseInt(selectedValues["priceFrom"])
                            )
                              handleSelect("priceTo", item);
                          } else handleSelect("priceTo", item);
                        }}
                      >
                        <p className="text-[14px]">$ {item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`${
                  page !== "project" && page !== "floor"
                    ? "col-span-2 lg:col-span-1"
                    : "col-span-1"
                } w-full flex items-end justify-end gap-4 flex-col md500:flex-row z-[1]`}
              >
                {/* {dimension[0] !== 0 && dimension[0] < 500 ? (
                  <div className="w-full rounded-[16px] bg-[#eee] py-[11px] flex items-center justify-center gap-2">
                    <VscSettings className="text-[28px]" />
                    <p className="text-[14px] font-medium">ფილტრი</p>
                  </div>
                ) : (
                  <VscSettings className="text-[28px]" />
                )} */}
                <Button
                  title={t("search")}
                  onClick={() =>
                    handleSearch(selectedValues, floor, selectedProjectId)
                  }
                  width={`${
                    page !== "project" && page !== "floor"
                      ? "md600:w-[110px] w-full"
                      : "md500:w-[110px] w-full"
                  }`}
                  height="h-[50px]"
                  bgColor="bg-blue"
                  color="text-white"
                  icon={CiSearch}
                  rounded="rounded-[16px]"
                />
              </div>
            </div>
          ) : (
            <div
              className={`w-full lg:px-12 px-6 py-7 grid ${
                page == "project" || page == "floor"
                  ? "lg:grid-cols-6"
                  : "lg:grid-cols-5"
              } md600:grid-cols-3 md500:grid-cols-2 gap-4 items-center rounded-bl-[16px] rounded-br-[16px] `}
            >
              <div className="flex flex-col gap-[6px] w-full">
                <Shimmer
                  width="w-[80px]"
                  height="h-[21px]"
                  rounded="rounded-[4px]"
                />
                <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
              </div>
              <div className="flex flex-col gap-[6px] w-full">
                <Shimmer
                  width="w-[80px]"
                  height="h-[21px]"
                  rounded="rounded-[4px]"
                />
                <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
              </div>
              {/* <div className="flex flex-col gap-[6px] w-full">
                <Shimmer
                  width="w-[80px]"
                  height="h-[21px]"
                  rounded="rounded-[4px]"
                />
                <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
              </div> */}
              <div className="flex flex-col gap-[6px] w-full">
                <Shimmer
                  width="w-[80px]"
                  height="h-[21px]"
                  rounded="rounded-[4px]"
                />
                <div className="grid grid-cols-2 gap-1 w-full">
                  <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
                  <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[6px] w-full">
                <Shimmer
                  width="w-[80px]"
                  height="h-[21px]"
                  rounded="rounded-[4px]"
                />
                <div className="grid grid-cols-2 gap-1 w-full">
                  <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
                  <Shimmer height="h-[44px]" rounded="rounded-[10px]" />
                </div>
              </div>
              <div
                className={`${
                  page !== "project" && page !== "floor"
                    ? "col-span-2 lg:col-span-1"
                    : "col-span-1"
                }  w-full flex items-center justify-end gap-4 flex-col md500:flex-row`}
              >
                {/* <Shimmer
                  width={"w-full md500:w-[50px]"}
                  height="h-[50px]"
                  rounded="rounded-[16px]"
                /> */}
                <Shimmer
                  width={`${
                    page !== "project" && page !== "floor"
                      ? "md600:w-[110px] w-full"
                      : "md500:w-[110px] w-full"
                  }`}
                  height="h-[50px]"
                  rounded="rounded-[16px]"
                />
              </div>
            </div>
          )}
          {aparts && (
            <div className="w-full flex flex-col gap-5 md600:max-h-[390px] max-h-[600px] overflow-y-auto filter lg:px-12 px-6 pb-5 relative">
              {!isApartsLoading ? (
                aparts.length !== 0 ? (
                  aparts.map((item) => (
                    <FilterCard
                      key={item.id}
                      item={item}
                      selectedCurr={selectedCurr}
                    />
                  ))
                ) : (
                  <div className="w-full h-[200px] flex items-center justify-center flex-col gap-3 text-[14px]">
                    <CiSearch className="text-[24px]" />
                    <p>{t("nodata")}</p>
                  </div>
                )
              ) : (
                [1, 2, 3, 4, 5].map((item) => (
                  <Shimmer
                    height="h-[112px] lg1110:min-h-[112px] sm:min-h-[152px] md500:min-h-[237px] min-h-[469px]"
                    rounded="rounded-[10px]"
                    key={item}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
