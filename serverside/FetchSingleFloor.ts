export async function FetchSingleFloor(floorId: string) {
  try {
    const res = await fetch(`https://apex.artspace.support/floor/${floorId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching single floor:", error);
    throw error;
  }
}
