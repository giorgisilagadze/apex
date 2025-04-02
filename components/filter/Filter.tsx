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
  const [aparts, setAparts] = useState<Apartment[]>();
  const [isApartsLoading, setIsApartsLoading] = useState(false);
  const [floor, setFloor] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const status = ["ყველა", "მშენებარე", "დასრულებული"];

  const dimension = ScreenSize();

  // const parseFilters = (filterString: string) => {
  //   const params = new URLSearchParams(filterString);
  //   const parsedFilters = {
  //     building: params.get("building") || "",
  //     type: params.get("type") || "",
  //     status: params.get("status") || "",
  //     areaFrom: params.get("areaFrom") || "",
  //     areaTo: params.get("areaTo") || "",
  //     priceFrom: params.get("priceFrom") || "",
  //     priceTo: params.get("priceTo") || "",
  //   };
  //   const projectId = params.get("project") || "";
  //   setSelectedProjectId(parseInt(projectId));
  //   const floorId = params.get("floor") || "";
  //   setFloor(floorId);

  //   return parsedFilters;
  // };

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
    const projectId =
      params.get("project") ||
      (page !== "project" && page !== "floor" ? "1" : "");
    const floorId = params.get("floor") || "";

    return { parsedFilters, projectId, floorId };
  };

  // useEffect(() => {
  //   // get params
  //   const parsedFilters = parseFilters(searchParams.toString());
  //   const isEmpty = Object.values(parsedFilters).every((value) => value == "");
  //   if (!isEmpty) {
  //     setSelectedValues(() => {
  //       const newValues = parsedFilters;
  //       handleSearch(newValues, floor);
  //       return newValues;
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     setIsFilterLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/apartment/getFilters`
  //       );
  //       const data = response.data;
  //       setFilterValues(data);

  //       // get building id
  //       if (page === "project" || page === "floor") {
  //         let lastElement: string | undefined;
  //         let floor: string | undefined;
  //         if (page === "project")
  //           lastElement = pathname.split("/").filter(Boolean).pop();
  //         else {
  //           const pathParts = pathname.split("/").filter(Boolean);
  //           lastElement = pathParts.at(-2);
  //           floor = pathParts.at(-1);
  //           setFloor(floor ?? "");
  //         }
  //         console.log(lastElement);

  //         if (lastElement) {
  //           const selectedBuilding = data.projectBuilding
  //             .flatMap((project: ProjectBuilding) => project.buildings)
  //             .find(
  //               (building: Building) =>
  //                 building.id === parseInt(lastElement as string)
  //             );

  //           if (selectedBuilding) {
  //             setSelectedValues({
  //               ...selectedValues,
  //               building: selectedBuilding.name,
  //             });
  //             setSelectedProjectId(selectedBuilding.project_id);
  //             handleSearch(
  //               {
  //                 ...selectedValues,
  //                 building: selectedBuilding.name,
  //               },
  //               floor
  //             );
  //           }
  //         }
  //       }
  //     } catch (err) {
  //     } finally {
  //       setIsFilterLoading(false);
  //     }
  //   })();
  // }, []);

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
            const selectedBuilding = data.projectBuilding
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
          handleSearch(newValues, floorId || floor, parseInt(projectId));
        } else {
          handleSearch(newValues, floorId || floor, parseInt(projectId));
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
        params.push(`floor=${encodeURIComponent(floor)}`);
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
          `${process.env.NEXT_PUBLIC_API_URL}/apartment?${queryString}`
        );
        let data = response.data;
        data = data.sort((a: { price2: number }, b: { price2: number }) =>
          selectedPrice === "დაბლიდან მაღლა"
            ? a.price2 - b.price2
            : b.price2 - a.price2
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
          ? Number(a.price2) - Number(b.price2)
          : Number(b.price2) - Number(a.price2)
      );
      setAparts(sortedData);
    }
  }, [selectedPrice]);

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
      <div className={`w-full rounded-[16px] shadow-dropDown bg-white z-[1]`}>
        <div
          className={`flex items-center gap-5 shadow-topShadow lg:px-12 px-6 pt-5 pb-3 whitespace-nowrap topFilter ${
            page !== "project" &&
            page !== "floor" &&
            "overflow-x-auto overflow-y-hidden"
          }`}
        >
          {page !== "project" && page !== "floor" ? (
            !isFilerLoading ? (
              filterValues?.projectBuilding.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 cursor-pointer"
                  onClick={() => {
                    setSelectedProjectId(item.id);
                    handleClear();
                  }}
                >
                  <p
                    className={`${
                      selectedProjectId == item.id
                        ? "text-blue font-medium"
                        : "text-black font-light"
                    } text-[14px]`}
                  >
                    {item.name}
                  </p>
                  <div
                    className={`w-full h-[2px] ${
                      selectedProjectId == item.id ? "bg-blue" : "bg-trasparent"
                    }`}
                  ></div>
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
                <h1 className={`text-[14px] text-blue`}>თავისუფალია:</h1>
                <p className="text-[14px] text-blue">{aparts?.length} ბინა</p>
              </div>
              <SortSelect
                title="ვალუტა"
                data={currency}
                selected={selectedCurr}
                setSelected={setSelectedCurr}
              />
              <SortSelect
                title="ფასი"
                data={price}
                selected={selectedPrice}
                setSelected={setSelectedPrice}
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col ">
          {!isFilerLoading ? (
            <div
              className={`w-full lg:px-12 px-6 py-7 grid lg:grid-cols-6 md600:grid-cols-3 md500:grid-cols-2 gap-4 items-center rounded-bl-[16px] rounded-br-[16px] `}
            >
              {(page == "project" || page == "floor") && (
                <div className="w-full flex flex-col gap-[6px]">
                  <p className="text-[14px] font-medium">პროექტი</p>
                  <Input
                    placeholder={""}
                    inputKey=""
                    onChange={() => {}}
                    value={
                      filterValues?.projectBuilding.find(
                        (item) => item.id == selectedProjectId
                      )?.name ?? ""
                    }
                    readonly={true}
                  />
                </div>
              )}
              {page !== "project" && page !== "floor" ? (
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
              )}
              <SelectComp
                title="კატეგორია"
                placeholder="აირჩიეთ"
                data={filterValues?.type}
                onClick={handleSelect}
                filterKey="type"
                selectedValues={selectedValues}
              />
              {page !== "project" && page !== "floor" && (
                <SelectComp
                  title="სტატუსი"
                  placeholder="აირჩიეთ"
                  data={status}
                  onClick={handleSelect}
                  filterKey="status"
                  selectedValues={selectedValues}
                />
              )}

              <div className="w-full flex flex-col gap-[6px]">
                <p className="text-[14px] font-medium">
                  მ<sup>2</sup>
                </p>
                <div className="w-full grid grid-cols-2 gap-1">
                  <Input
                    placeholder={"დან"}
                    inputKey="areaFrom"
                    onChange={handleSelect}
                    value={selectedValues["areaFrom"]}
                    type="number"
                  />
                  <Input
                    placeholder={"მდე"}
                    inputKey="areaTo"
                    onChange={handleSelect}
                    value={selectedValues["areaTo"]}
                    type="number"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-[6px]">
                <p className="text-[14px] font-medium">ფასი</p>
                <div className="w-full grid grid-cols-2 gap-1">
                  <Input
                    placeholder={"დან"}
                    inputKey="priceFrom"
                    onChange={handleSelect}
                    value={selectedValues["priceFrom"]}
                  />
                  <Input
                    placeholder={"მდე"}
                    inputKey="priceTo"
                    onChange={handleSelect}
                    value={selectedValues["priceTo"]}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-end gap-4 flex-col md500:flex-row z-[1]">
                {dimension[0] !== 0 && dimension[0] < 500 ? (
                  <div className="w-full rounded-[16px] bg-[#eee] py-[11px] flex items-center justify-center gap-2">
                    <VscSettings className="text-[28px]" />
                    <p className="text-[14px] font-medium">ფილტრი</p>
                  </div>
                ) : (
                  <VscSettings className="text-[28px]" />
                )}
                <Button
                  title={"ძებნა"}
                  onClick={() =>
                    handleSearch(selectedValues, floor, selectedProjectId)
                  }
                  width={"md500:w-[110px] w-full"}
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
              className={`w-full lg:px-12 px-6 py-7 grid lg:grid-cols-6 md600:grid-cols-3 md500:grid-cols-2 gap-4 items-center rounded-bl-[16px] rounded-br-[16px] `}
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
              <div className="w-full flex items-center justify-end gap-4 flex-col md500:flex-row">
                <Shimmer
                  width={"w-full md500:w-[50px]"}
                  height="h-[50px]"
                  rounded="rounded-[16px]"
                />
                <Shimmer
                  width={"md500:w-[110px] w-full"}
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
                    <p>ჩანაწერი ვერ მოიძებნა</p>
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
