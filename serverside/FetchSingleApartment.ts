export async function FetchSingleApartment(id: string) {
  try {
    const res = await fetch(`https://apex.artspace.support/apartment/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching single apartment:", error);
    throw error;
  }
}
