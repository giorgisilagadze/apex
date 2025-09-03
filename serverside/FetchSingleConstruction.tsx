export async function FetchSingleConstruction(id: string) {
  try {
    const res = await fetch(
      `https://apex.artspace.support/construction/${id}?relation=1`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching single construction:", error);
    throw error;
  }
}
