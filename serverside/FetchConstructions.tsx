export async function FetchConstructions() {
  try {
    const res = await fetch(`https://apex.artspace.support/construction`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching Constructions:", error);
    throw error;
  }
}
