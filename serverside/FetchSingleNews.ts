export async function FetchSingleNews(id: string) {
  try {
    const res = await fetch(`https://apex.artspace.support/news/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching single news:", error);
    throw error;
  }
}
