export async function FetchSingleProject(id: string) {
  try {
    const res = await fetch(`https://apex.artspace.support/building/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching single projects:", error);
    throw error;
  }
}
